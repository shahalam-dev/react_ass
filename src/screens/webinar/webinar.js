import React, { useState } from 'react';
import './webinar.css';

const Webinar = () => {
    const [formData, setFormData] = useState({ name: '', email: '', date: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, date } = formData;

        if (name && email && date) {
            setIsLoading(true);
            setTimeout(() => {
                setSuccessMessage(`Thank you for registering, ${name}! We’ll send you the webinar details soon.`);
                setFormData({ name: '', email: '', date: '' });
                setErrorMessage('');
                setIsLoading(false);
            }, 1500); // Simulate a network request
        } else {
            setErrorMessage('Please fill in all fields before submitting!');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <h1>Webinar Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Preferred Webinar Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="button1" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register Now'}
                </button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
        </div>
    );
};

export default Webinar;