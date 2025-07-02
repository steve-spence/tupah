import React from 'react'

export default function PrivacyPage() {
    return (
        <div className="w-full bg-white dark:bg-[#212121]">
            <div className="px-6 py-12 max-w-3xl mx-auto text-base leading-relaxed text-black dark:text-white">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <section id="policy" className="mb-12">
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information
                        when you use our website.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
                    <p>
                        We do not collect any information about our users.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
                    <p>
                        We may use third-party services like analytics providers or embedded content. These services may collect
                        information independently.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information. Contact us if you have any concerns
                        about your data.
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
                        restrict their use of the site.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
                    <p>
                        All content on this site, including text, and code, is the property of the site owner unless otherwise
                        stated. You may not directly copy, reproduce, or distribute content without permission. You may modify
                        the content to a resonable extent and redistrubute. If you are interested please reach out to me at{' '}
                        <a
                            href="mailto:stevenallenspencer@gmail.com"
                            className="text-[#1272CC] dark:text-purple-400 hover:underline"
                        >
                            stevenallenspencer@gmail.com
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
