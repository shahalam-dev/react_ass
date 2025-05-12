import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './profile.css';

const Profile =({ isInitialSetup = false, onComplete }) => {
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        education: '',
        skills: '',
        experience: '',
        resume: '',
        location: '',
        preferredJobType: '',
        expectedSalary: '',
        linkedinProfile: ''
    });

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/');
            return;
        }

        if (!isInitialSetup) {
            // Load existing profile data
            const loadProfile = async () => {
                try {
                    const userId = auth.currentUser.uid;
                    const userDoc = await getDoc(doc(db, "users", userId));
                    if (userDoc.exists()) {
                        setFormData(userDoc.data());
                        setIsEditMode(false); // Existing profile, start in view mode
                    } else {
                        setIsEditMode(true); // No profile, start in edit mode
                    }
                } catch (error) {
                    console.error("Error loading profile:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadProfile();
        }
    }, [isInitialSetup, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userId = auth.currentUser.uid;
            await setDoc(doc(db, "users", userId), {
                ...formData,
                email: auth.currentUser.email,
                profileCompleted: true,
                updatedAt: new Date().toISOString()
            });
            if (isInitialSetup && onComplete) {
                onComplete();
            } else {
                // Show success message or handle update completion
                console.log("Profile updated successfully");
            }
            setIsEditMode(false);
            navigate('/');
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (isLoading) {
        return <div className="profile-container">
            <h1>Loading profile...</h1>
        </div>;
    }

    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <h1>{isEditMode ? 'Edit Profile' : 'Profile Details'}</h1>
                    {!isEditMode && (
                        <button 
                            onClick={() => setIsEditMode(true)} 
                            className="edit-btn"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {isEditMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="education"
                                placeholder="Education (Highest Degree)"
                                value={formData.education}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="skills"
                                placeholder="Skills (comma separated)"
                                value={formData.skills}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="experience"
                                placeholder="Work Experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="location"
                                placeholder="Current Location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="preferredJobType"
                                placeholder="Preferred Job Type"
                                value={formData.preferredJobType}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="expectedSalary"
                                placeholder="Expected Salary"
                                value={formData.expectedSalary}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="url"
                                name="linkedinProfile"
                                placeholder="LinkedIn Profile URL"
                                value={formData.linkedinProfile}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="button-group">
                            {formData.profileCompleted && (
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setIsEditMode(false)}
                                >
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-view">
                        <div className="profile-section">
                            <h3>Personal Information</h3>
                            <p><strong>Name:</strong> {formData.fullName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                            <p><strong>Location:</strong> {formData.location}</p>
                        </div>

                        <div className="profile-section">
                            <h3>Professional Details</h3>
                            <p><strong>Education:</strong> {formData.education}</p>
                            <p><strong>Skills:</strong> {formData.skills}</p>
                            <p><strong>Experience:</strong> {formData.experience}</p>
                        </div>

                        <div className="profile-section">
                            <h3>Preferences</h3>
                            <p><strong>Preferred Job Type:</strong> {formData.preferredJobType}</p>
                            <p><strong>Expected Salary:</strong> {formData.expectedSalary}</p>
                            {formData.linkedinProfile && (
                                <p><strong>LinkedIn:</strong> 
                                    <a href={formData.linkedinProfile} target="_blank" rel="noopener noreferrer">
                                        View Profile
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                )}
            <div className="profile-footer">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
            </div>
        </>
    );
};

export default Profile;
