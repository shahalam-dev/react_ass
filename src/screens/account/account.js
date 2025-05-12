import React, { useState } from 'react';
import './account.css';

const Account = () => {
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (section) => {
        const sections = {
            profileUpdate: (
                <>
                    <h2>Update Profile</h2>
                    <form id="profileForm">
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            required
                            pattern="[A-Za-z ]{3,50}"
                            title="Only letters and spaces, 3-50 characters."
                        />
                        <input type="email" id="email" placeholder="Email Address" required />
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Phone Number"
                            pattern="[0-9]{10,15}"
                            title="Only numbers, 10-15 digits."
                        />
                        <button type="submit" id="saveBtn">Save Changes</button>
                    </form>
                </>
            ),
            preferences: (
                <>
                    <h2>Account Preferences</h2>
                    <div className="preference-section">
                        <h3>Notification Settings</h3>
                        <label>
                            <input type="checkbox" /> Email Notifications
                        </label>
                        <label>
                            <input type="checkbox" /> SMS Alerts
                        </label>
                    </div>
                    <div className="preference-section">
                        <h3>Display Preferences</h3>
                        <label>
                            Dark Mode <input type="checkbox" id="darkModeToggle" />
                        </label>
                    </div>
                    <button onClick={savePreferences}>Save Preferences</button>
                </>
            ),
            activityLog: (
                <>
                    <h2>Recent Account Activity</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Action</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jan 20, 2024</td>
                                <td>Password Changed</td>
                                <td>Selangor, Malaysia</td>
                            </tr>
                            <tr>
                                <td>Jan 15, 2024</td>
                                <td>Login</td>
                                <td>Remote Access</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ),
        };

        setModalContent(sections[section] || 'Content not available');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const savePreferences = () => {
        alert('Preferences saved successfully!');
        closeModal();
    };

    return (
        <div className="container">
            <header>
                <h1>Account Management</h1>
                <p>Comprehensive control of your account settings and security</p>
            </header>

            <main>
                <div className="account-dashboard">
                    <div className="profile-summary">
                        <img src="/api/placeholder/100/100" alt="Profile" className="profile-image" />
                        <div className="profile-details">
                            <h2 id="userName">thuraisamy</h2>
                            <p id="userEmail">thuraisamy@gmail.com</p>
                            <span className="account-status active">Active Account</span>
                        </div>
                    </div>

                    <div className="account-actions">
                        <div className="action-card" onClick={() => openModal('profileUpdate')}>
                            <i className="icon">👤</i>
                            <h3>Update Profile</h3>
                            <p>Modify personal information</p>
                        </div>

                        <div className="action-card" onClick={() => openModal('preferences')}>
                            <i className="icon">⚙️</i>
                            <h3>Preferences</h3>
                            <p>Customize your experience</p>
                        </div>

                        <div className="action-card" onClick={() => openModal('activityLog')}>
                            <i className="icon">📋</i>
                            <h3>Activity Log</h3>
                            <p>Review recent account actions</p>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        <div id="modalContent">{modalContent}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;