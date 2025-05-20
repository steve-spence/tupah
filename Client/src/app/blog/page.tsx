// Blog Page
// Add some display page for the home page for blogs like these are all my blogs!

import Link from 'next/link'
import React from 'react'

export function BlogPage() {
    return (
        <React.Fragment>
            <h1>Blog</h1>
            <Link href='/'>Home</Link>
        </React.Fragment>
    )

}