import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import './terms.css';

const Terms = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to the login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="terms-page">
            <header className="terms-header">
                <div className="terms-container">
                    <h1>Terms of Service</h1>
                </div>
            </header>

            <main className="terms-content">
                <section>
                    <h2>Introduction</h2>
                    <p>Welcome to Careerlyl. These terms of service outline the rules and regulations for using our website and services.</p>
                </section>

                <section>
                    <h2>Acceptance of Terms</h2>
                    <p>By accessing our website, you agree to comply with and be bound by these terms. If you disagree with any part of the terms, you must not use our services.</p>
                </section>

                <section>
                    <h2>Use of Services</h2>
                    <p>You agree to use our services only for lawful purposes and in accordance with these terms.</p>
                </section>

                <section>
                    <h2>User Accounts</h2>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                </section>

                <section>
                    <h2>Prohibited Activities</h2>
                    <ul>
                        <li>Using the website for any unlawful purpose.</li>
                        <li>Engaging in any activity that disrupts or interferes with the website's functionality.</li>
                        <li>Uploading or transmitting harmful content, such as malware or viruses.</li>
                    </ul>
                </section>

                <section>
                    <h2>Intellectual Property</h2>
                    <p>All content, trademarks, and data on this website are the intellectual property of Careerlyl and are protected by applicable laws.</p>
                </section>

                <section>
                    <h2>Limitation of Liability</h2>
                    <p>Careerlyl is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.</p>
                </section>

                <section>
                    <h2>Termination</h2>
                    <p>We reserve the right to suspend or terminate your access to our services at any time without prior notice for conduct that violates these terms.</p>
                </section>

                <section>
                    <h2>Changes to the Terms</h2>
                    <p>We may update these terms from time to time. You are encouraged to review them periodically. Continued use of our services signifies your acceptance of the changes.</p>
                </section>

                <section>
                    <h2>Contact Information</h2>
                    <p>If you have any questions about these terms, please contact us at <a href="mailto:legal@careerlyl.com">legal@careerlyl.com</a>.</p>
                </section>
            </main>

            <footer className="terms-footer">
                <div className="terms-container">
                    <p>&copy; 2025 Careerlyl. All Rights Reserved.</p>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </footer>
        </div>
    );
};

export default Terms;