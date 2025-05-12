import React, { useState } from 'react';
import './reset-password.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState({ text: 'Weak', color: 'red', value: 0 });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = (value) => {
        setNewPassword(value);

        let strengthValue = 0;
        if (value.length >= 8) strengthValue += 25;
        if (/[A-Z]/.test(value)) strengthValue += 25;
        if (/[0-9]/.test(value)) strengthValue += 25;
        if (/[^A-Za-z0-9]/.test(value)) strengthValue += 25;

        if (strengthValue < 50) {
            setStrength({ text: 'Weak', color: 'red', value: strengthValue });
        } else if (strengthValue < 75) {
            setStrength({ text: 'Moderate', color: 'orange', value: strengthValue });
        } else {
            setStrength({ text: 'Strong', color: 'green', value: strengthValue });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setSuccessMessage('');
        } else if (strength.value < 75) {
            setError('Password strength must be at least "Strong".');
            setSuccessMessage('');
        } else {
            setError('');
            setSuccessMessage('Password reset successfully.');
            // Add Firebase password reset logic here
            console.log('Password reset successfully.');
        }
    };

    return (
        <div className="reset-password-container">
            <h1>Reset Your Password</h1>
            <p>Please enter your new password below to reset your account password.</p>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="form-group">
                    <label htmlFor="new_password">New Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="new_password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirm_password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Password strength indicator */}
                <div className="password-strength">
                    <p>
                        Password strength: <span style={{ color: strength.color }}>{strength.text}</span>
                    </p>
                    <progress value={strength.value} max="100"></progress>
                </div>

                {/* Show/Hide password toggle */}
                <div className="toggle-password">
                    <input
                        type="checkbox"
                        id="show-password"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                    />
                    <label htmlFor="show-password">Show Password</label>
                </div>

                {/* Error and success messages */}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="btn">Reset Password</button>
            </form>
            <div className="link">
                <a href="/login">Back to Login</a>
            </div>
        </div>
    );
};

export default ResetPassword;
