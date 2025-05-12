import React, { useState } from 'react';
import './recomendation.css';

const Recomendation = () => {
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (section) => {
        const sections = {
            careerAssessment: (
                <>
                    <h2>Career Assessment</h2>
                    <p>Answer a series of questions to discover careers that match your personality and interests.</p>
                    <button onClick={() => alert('Career Assessment feature coming soon!')}>Start Assessment</button>
                </>
            ),
            skillsMatch: (
                <>
                    <h2>Skills Matching</h2>
                    <p>Enter your skills and we'll find matching career opportunities.</p>
                    <input type="text" placeholder="Enter your skills (e.g., programming, communication)" />
                    <button onClick={() => alert('Searching for careers matching your skills!')}>Find Matches</button>
                </>
            ),
            exploreIndustries: (
                <>
                    <h2>Industry Exploration</h2>
                    <p>Select an industry to learn more about career paths, salaries, and growth potential.</p>
                    <select>
                        <option>Technology</option>
                        <option>Healthcare</option>
                        <option>Finance</option>
                        <option>Education</option>
                        <option>Creative Arts</option>
                    </select>
                    <button onClick={() => alert('Exploring selected industry!')}>Explore</button>
                </>
            ),
            resumeHelp: (
                <>
                    <h2>Resume Builder</h2>
                    <p>Get personalized tips and templates to create a professional resume.</p>
                    <button onClick={() => alert('Resume Builder feature coming soon!')}>Start Resume Builder</button>
                </>
            ),
            interviewPrep: (
                <>
                    <h2>Interview Preparation</h2>
                    <p>Practice interview questions and receive expert tips.</p>
                    <button onClick={() => alert('Interview Preparation module coming soon!')}>Begin Interview Prep</button>
                </>
            ),
            networkingTips: (
                <>
                    <h2>Networking Strategies</h2>
                    <p>Learn effective techniques to build professional connections.</p>
                    <button onClick={() => alert('Networking Tips feature coming soon!')}>View Tips</button>
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

    return (
        <div className="container">
            <header>
                <h1>Career Navigator</h1>
                <p>Discover your professional path with personalized guidance</p>
            </header>

            <main>
                <div className="options-grid">
                    <div className="option-card" onClick={() => openModal('careerAssessment')}>
                        <i className="icon">📋</i>
                        <h3>Career Assessment</h3>
                        <p>Discover careers aligned with your personality</p>
                    </div>

                    <div className="option-card" onClick={() => openModal('skillsMatch')}>
                        <i className="icon">🔍</i>
                        <h3>Skills Match</h3>
                        <p>Find careers that fit your unique skill set</p>
                    </div>

                    <div className="option-card" onClick={() => openModal('exploreIndustries')}>
                        <i className="icon">🏢</i>
                        <h3>Industry Exploration</h3>
                        <p>Learn about diverse career fields</p>
                    </div>

                    <div className="option-card" onClick={() => openModal('resumeHelp')}>
                        <i className="icon">📄</i>
                        <h3>Resume Builder</h3>
                        <p>Craft a standout professional resume</p>
                    </div>

                    <div className="option-card" onClick={() => openModal('interviewPrep')}>
                        <i className="icon">💬</i>
                        <h3>Interview Preparation</h3>
                        <p>Master interview techniques</p>
                    </div>

                    <div className="option-card" onClick={() => openModal('networkingTips')}>
                        <i className="icon">🤝</i>
                        <h3>Networking Strategies</h3>
                        <p>Build professional connections</p>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        {modalContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recomendation;
