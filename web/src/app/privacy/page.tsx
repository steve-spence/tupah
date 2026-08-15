import { Header } from '@/components/Header/Header'

export default function PrivacyPage() {
    return (
        <div className="w-full bg-white dark:bg-[#212121]">
            <Header data={{ title: "Privacy", subtext: "Privacy", skinny: true }} />
            <div className="px-6 py-12 max-w-3xl mx-auto text-base leading-relaxed text-black dark:text-white">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <section id="policy" className="mb-12">
                    <p className="text-sm italic mb-4">Last updated: August 14, 2026</p>
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information
                        when you use our website.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
                    <p>
                        When you create an account, we collect your email address and a username of your choosing. If you use the
                        site, we also store the content you create — posts, comments, likes, and any images you upload — along
                        with an optional avatar. We use Google Analytics to understand how the site is used, which collects
                        information such as cookies, device and browser type, approximate location, and pages visited. We may also
                        temporarily process technical information such as request metadata for security and rate limiting.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
                    <p>
                        We use this information only to operate the site: to authenticate your account, display your content,
                        protect the service from abuse, and understand overall site usage. We do not sell your personal
                        information, and we do not share it with third parties for their own marketing purposes.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
                    <p>
                        We rely on third-party services to run the site: Supabase provides our authentication, database, and
                        image storage, and Google Analytics provides usage analytics. These providers process data on our behalf
                        and may collect information independently under their own privacy policies.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
                    <p>
                        We keep your information only as long as reasonably necessary to provide the service. Your account
                        information and content are retained while your account is active. If you delete your content or request
                        deletion of your account, we will remove the associated personal information from our systems.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Children&apos;s Privacy</h2>
                    <p>
                        This site is not directed at children, and we do not knowingly collect personal information from children
                        under the age of 13. You must be at least 13 years old to create an account. If we learn that we have
                        collected personal information from a child under 13, we will delete that information promptly, as
                        required by the Children&apos;s Online Privacy Protection Act (COPPA). If you are a parent or guardian and
                        believe your child under 13 has provided us with personal information, please contact us at{' '}
                        <a
                            href={`mailto:${process.env.PERSONAL_EMAIL}`}
                            className="text-[#1272CC] dark:text-purple-400 hover:underline"
                        >
                            tupahhelp@gmail.com
                        </a>{' '}
                        and we will delete it.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information. Depending on where you live,
                        you may have additional rights over your data, such as the right to know what we have collected or to
                        request its deletion. To exercise any of these rights, contact us at{' '}
                        <a
                            href={`mailto:${process.env.PERSONAL_EMAIL}`}
                            className="text-[#1272CC] dark:text-purple-400 hover:underline"
                        >
                            tupahhelp@gmail.com
                        </a>
                        .
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. When we do, we will post the updated policy on this
                        page and revise the &quot;Last updated&quot; date above.
                    </p>
                </section>

                <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
                <section id="terms">
                    <p>
                        By using this website, you agree to the following terms and conditions. If you do not agree with any part of
                        these terms, please do not use our site.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Site</h2>
                    <p>
                        You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or
                        restrict their use of the site. You must be at least 13 years old to create an account or submit any
                        personal information to the site.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
                    <p>
                        All content on this site, including text, and code, is the property of the site owner unless otherwise
                        stated. You may not directly copy, reproduce, or distribute content without permission. You may modify
                        the content to a resonable extent and redistrubute. If you are interested please reach out to me at{' '}
                        <a
                            href={`mailto:${process.env.PERSONAL_EMAIL}`}
                            className="text-[#1272CC] dark:text-purple-400 hover:underline"
                        >
                            tupahhelp@gmail.com
                        </a>

                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
                    <p>
                        We are not responsible for any damages resulting from your use of the site. All content is provided "as is"
                        without warranties of any kind.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
                    <p>
                        We reserve the right to update these terms at any time. Continued use of the site after changes implies
                        acceptance of the updated terms.
                    </p>
                </section>
            </div>
        </div>
    )
}
