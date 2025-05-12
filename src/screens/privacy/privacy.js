import React from 'react';
import './privacy.css';

const Privacy = () => {
    return (
        <div>
            <header>
                <div className="">
                    <h1>Privacy Policy</h1>
                </div>
            </header>

            <main>
                <section>
                    <h2>Introduction</h2>
                    <p>We value your trust and are committed to safeguarding your privacy. This privacy policy explains how we collect, use, store, and protect your personal information when you interact with our services.</p>
                </section>

                <section>
                    <h2>Information We Collect</h2>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details when you register or interact with us.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website and services, including IP addresses, browser types, and operating systems.</li>
                        <li><strong>Cookies:</strong> Data collected through cookies and similar technologies to improve your user experience.</li>
                    </ul>
                </section>

                <section>
                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>To provide, operate, and improve our services.</li>
                        <li>To communicate with you, including responding to inquiries and sending updates.</li>
                        <li>To ensure security and prevent unauthorized access.</li>
                        <li>To comply with legal obligations and enforce our terms.</li>
                    </ul>
                </section>

                <section>
                    <h2>Data Sharing and Disclosure</h2>
                    <p>We do not sell your personal information. We may share your data with trusted third parties, such as service providers and legal authorities, only as necessary and in accordance with this policy.</p>
                </section>

                <section>
                    <h2>Data Retention</h2>
                    <p>We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
                </section>

                <section>
                    <h2>Your Rights</h2>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of the information we hold about you.</li>
                        <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete data.</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
                        <li><strong>Opt-Out:</strong> Withdraw consent or opt out of specific data uses.</li>
                    </ul>
                    <p>To exercise your rights, contact us at <a href="mailto:support@careerlyl.com">support@careerlyl.com</a>.</p>
                </section>

                <section>
                    <h2>Security Measures</h2>
                    <p>We implement robust security measures to protect your data, including encryption, secure servers, and regular security audits. However, no system can be completely secure, and we cannot guarantee absolute data security.</p>
                </section>

                <section>
                    <h2>Policy Updates</h2>
                    <p>We may update this policy periodically to reflect changes in laws, technologies, or practices. Any updates will be posted on this page, and we encourage you to review it regularly.</p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>If you have questions or concerns about this policy, please contact us at:</p>
                    <address>
                        Email: <a href="mailto:contact@careerlyl.com">contact@careerlyl.com</a><br />
                        Phone: 0385840904<br />
                        Address: no 55 JALAN TK 1/11ATAMAN KINRARA 47100 PUCHONG SELANGOR.
                    </address>
                </section>
            </main>

            <footer>
                <div className="">
                    <p>&copy; 2025 Career Counseling. All Rights Reserved.</p>

                </div>
            </footer>
        </div>
    );
};

export default Privacy;
