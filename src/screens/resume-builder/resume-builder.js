import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { auth, db } from '../../firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import './resume-builder.css';

const ResumeBuilder = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        skills: '',
        experience: '',
        summary: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (!userId) return;

                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    const profileData = userDoc.data();
                    setFormData({
                        fullName: profileData.fullName || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        education: profileData.education || '',
                        skills: profileData.skills || '',
                        experience: profileData.experience || '',
                        summary: '', // Summary is not part of the profile, keep it empty
                    });
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDownload1 = () => {
        const doc = new jsPDF();
    
        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text(formData.fullName, 105, 20, { align: 'center' });
    
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`${formData.email} | ${formData.phone}`, 105, 30, { align: 'center' });
    
        // Line separator
        doc.setDrawColor(200);
        doc.line(10, 35, 200, 35);
    
        // Summary
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.setFont('helvetica', 'bold');
        doc.text('Professional Summary', 10, 45);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(formData.summary, 10, 52, { maxWidth: 190 });
    
        // Education
        let y = 70;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.setFont('helvetica', 'bold');
        doc.text('Education', 10, y);
    
        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(formData.education, 10, y);
    
        // Skills
        y += 12;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text('Skills', 10, y);
    
        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(formData.skills, 10, y);
    
        // Experience
        y += 12;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);
        doc.text('Experience', 10, y);
    
        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(50);
        doc.text(formData.experience, 10, y, { maxWidth: 190 });
    
        // Save PDF
        doc.save('resume.pdf');
    };
    

    const handleDownload2 = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Resume', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Name: ${formData.fullName}`, 10, 40);
        doc.text(`Email: ${formData.email}`, 10, 50);
        doc.text(`Phone: ${formData.phone}`, 10, 60);
        doc.text(`Education: ${formData.education}`, 10, 70);
        doc.text(`Skills: ${formData.skills}`, 10, 80);
        doc.text(`Experience: ${formData.experience}`, 10, 90);
        doc.text(`Summary: ${formData.summary}`, 10, 100, { maxWidth: 190 });
        doc.save('resume.pdf');
    };

    return (
        <div className="resume-builder-container">
            <h1>Resume Builder</h1>
            <form>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Education</label>
                    <textarea
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Skills</label>
                    <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Experience</label>
                    <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Summary</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className='button-resume' type="button" onClick={handleDownload1}>
                    Download PDF
                </button>
            </form>
        </div>
    );
};

export default ResumeBuilder;
