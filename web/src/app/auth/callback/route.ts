import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = process.env.NEXT_PUBLIC_BASE_URL

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.log('Auth error:', error)
      return NextResponse.redirect(`${origin}/login`)
    }

    const user = data.user;
    if (!user) {
      return NextResponse.redirect(`${origin}/login`)
    }

    const tmpUsername = user.email?.substring(0, user.email.indexOf('@'))

    // create user profile
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: tmpUsername,
        avatar_url: null,
        created_at: new Date(),
      }, {
        onConflict: 'id',
      })
  }


  // Redirect to dashboard after successful authentication
  return NextResponse.redirect(`${origin}/profile`)
}
