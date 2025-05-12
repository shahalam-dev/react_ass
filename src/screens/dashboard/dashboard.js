import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, sendVerificationEmail } from '../../firebaseconfig'; // Import sendVerificationEmail
import { doc, getDoc } from 'firebase/firestore';
import './dashboard.css';
import FindJobs from '../../components/find-jobs.js';

const Dashboard = () => {
    useEffect(() => {
        console.log("Dashboard component rendered"); // Debug log
    }, []);

    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false); // Loading state for email
    const [emailStatus, setEmailStatus] = useState(''); // Status message for email

    useEffect(() => {
        const checkEmailVerification = async () => {
            if (auth.currentUser) {
                setIsEmailVerified(auth.currentUser.emailVerified);
                if (!auth.currentUser.emailVerified) {
                    setEmailStatus('Verification email sent. Please check your inbox.');
                    await sendVerificationEmail(auth.currentUser);
                }
            }
        };

        checkEmailVerification();
    }, []);

    const handleResendEmail = async () => {
        setIsSendingEmail(true);
        setEmailStatus('');
        try {
            await sendVerificationEmail(auth.currentUser);
            setEmailStatus('Verification email resent. Please check your inbox.');
        } catch (error) {
            setEmailStatus('Failed to send verification email. Please try again.');
            console.error("Error resending verification email:", error);
        } finally {
            setIsSendingEmail(false);
        }
    };

    useEffect(() => {
        const checkProfile = async () => {
            if (!isEmailVerified) return; // Prevent profile check if email is not verified
            try {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (!userDoc.exists()) {
                    navigate('/profile');
                }
            } catch (error) {
                console.error("Error checking profile:", error);
                navigate('/profile');
            }
        };

        checkProfile();
    }, [navigate, isEmailVerified]);

    const goToProfile = () => {
        navigate('/profile');
    };

    if (!isEmailVerified) {
        return (
            <div className="email-verification">
                <h2>Email Verification Required</h2>
                <p>Please verify your email address to continue using the application.</p>
                {isSendingEmail ? (
                    <p>Sending verification email...</p>
                ) : (
                    <button onClick={handleResendEmail}>Resend Verification Email</button>
                )}
                {emailStatus && <p>{emailStatus}</p>}
            </div>
        );
    }

    const jobs = [
        { title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY' },
        { title: 'Data Analyst', company: 'Data Solutions', location: 'San Francisco, CA' },
        { title: 'Product Manager', company: 'Innovate Inc.', location: 'Remote' },
        { title: 'UX Designer', company: 'Creative Minds', location: 'Austin, TX' },
        { title: 'Marketing Specialist', company: 'MarketPro', location: 'Chicago, IL' },
    ];

    return (
        <div className="dashboard">
            {/* Navigation Bar */}
            <nav className="dashboard-nav">
                <h2>Careerlyl</h2>
                <button onClick={goToProfile} className="profile-btn">Profile</button>
            </nav>

            {/* Welcome Banner */}
            <section className="welcome-banner">
                <h1>Welcome to Careerlyl</h1>
                <p>Your journey to success starts here</p>
            </section>

            {/* Career Guidance Section */}
            <section className="career-guidance">
                <h2>Career Guidance Center</h2>
                <div className="guidance-grid">
                    <div className="guidance-card">
                        <h3>Resume Builder</h3>
                        <p>Create a professional resume with our easy-to-use builder</p>
                        <button onClick={() => navigate('/resume-builder')} className="guidance-btn">Build Resume</button>
                    </div>
                    <div className="guidance-card">
                        <h3>Career Assessment</h3>
                        <p>Discover your ideal career path with our assessment tool</p>
                        <button onClick={() => navigate('/career-assessment')} className="guidance-btn">Take Assessment</button>
                    </div>
                    <div className="guidance-card">
                        <h3>Interview Prep</h3>
                        <p>Practice with AI-powered mock interviews</p>
                        <button className="guidance-btn">Start Practice</button>
                    </div>
                    <div className="guidance-card">
                        <h3>Skill Development</h3>
                        <p>Access courses and resources to enhance your skills</p>
                        <button className="guidance-btn" onClick={() => window.open('https://www.udemy.com/', '_blank')}>
                            Explore Courses
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links">
                <h2>Quick Career Resources</h2>
                <div className="links-grid">
                    <a href="https://www.canva.com/resumes/templates/" target='_blank' className="quick-link">
                        <span>📝 Resume Templates</span>
                    </a>
                    <a href="https://eatyourcareer.com/blog/" target='_blank' className="quick-link">
                        <span>📚 Career Blog</span>
                    </a>
                    <a href="/Industry-Insights" className="quick-link">
                        <span>💡 Industry Insights</span>
                    </a>
                    <a href="/salary-calculator" className="quick-link">
                        <span>🎯 Salary Calculator</span>
                    </a>
                </div>
            </section>

            {/* Hero Section */}
            <FindJobs />

            {/* Job Categories Section */}
            <section className="job-categories">
                <h2>Popular Categories</h2>
                <div className="category-grid">
                    <div className="category-card">
                        <h3>Technology</h3>
                        <p>600 jobs</p>
                    </div>
                    <div className="category-card">
                        <h3>Healthcare</h3>
                        <p>900 jobs</p>
                    </div>
                    <div className="category-card">
                        <h3>Finance</h3>
                        <p>200jobs</p>
                    </div>
                    <div className="category-card">
                        <h3>Marketing</h3>
                        <p>650 jobs</p>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="featured-jobs">
                <h2>Featured Jobs</h2>
                <div className="job-list">
                    {jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.company} - {job.location}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Statistics Section */}
            <section className="statistics">
                <h2>Platform Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>2K+</h3>
                        <p>Active Jobs</p>
                    </div>
                    <div className="stat-card">
                        <h3>1K+</h3>
                        <p>Companies</p>
                    </div>
                    <div className="stat-card">
                        <h3>50K+</h3>
                        <p>Job Seekers</p>
                    </div>
                    <div className="stat-card">
                        <h3>700+</h3>
                        <p>Success Stories</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-list">
                    <div className="testimonial-card">
                        <p>"This platform helped me land my dream job!"</p>
                        <h4>- caroline </h4>
                    </div>
                    <div className="testimonial-card">
                        <p>"The job search process was so easy and efficient."</p>
                        <h4>- John mayer</h4>
                    </div>
                </div>

                <div className="resources">
                    <h3>Helpful Resources</h3>
                    <ul>
                        <li><a href="https://www.mind.org.uk/" target="_blank" rel="noopener noreferrer">Mind - Mental health support</a></li>
                        <li><a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer">SHRM - Professional development</a></li>
                        <li><a href="https://bambi.com.my/" target="_blank" rel="noopener noreferrer">Bambi - Counseling services</a></li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;