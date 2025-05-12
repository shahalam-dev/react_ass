import React, { useState } from 'react';
import './SalaryCalculator.css';

const SalaryCalculator = () => {
    const [hourlyRate, setHourlyRate] = useState('');
    const [hoursPerWeek, setHoursPerWeek] = useState('');
    const [annualSalary, setAnnualSalary] = useState(null);

    const calculateSalary = (e) => {
        e.preventDefault();
        if (hourlyRate && hoursPerWeek) {
            const weeklySalary = hourlyRate * hoursPerWeek;
            const yearlySalary = weeklySalary * 52; // 52 weeks in a year
            setAnnualSalary(yearlySalary.toFixed(2));
        } else {
            alert('Please fill in both fields!');
        }
    };

    return (
        <div className="salary-calculator-container">
            <h1>Salary Calculator</h1>
            <form onSubmit={calculateSalary}>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                    <input
                        type="number"
                        id="hourlyRate"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="Enter your hourly rate"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hoursPerWeek">Hours Per Week</label>
                    <input
                        type="number"
                        id="hoursPerWeek"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="Enter hours worked per week"
                        required
                    />
                </div>
                <button type="submit" className="calculate-button">Calculate</button>
            </form>
            {annualSalary && (
                <div className="result">
                    <h2>Annual Salary: ${annualSalary}</h2>
                </div>
            )}
        </div>
    );
};

export default SalaryCalculator;
