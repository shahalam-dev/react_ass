import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getJobs } from '../../services/jobService';
import { db } from '../../firebaseconfig'; // Import Firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import './search.css';
import FindJobs from '../../components/find-jobs';

const Search = () => {
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sanitizeData = (data) => {
            if (Array.isArray(data)) {
                return data.map(sanitizeData);
            } else if (typeof data === 'object' && data !== null) {
                const sanitized = {};
                for (const key in data) {
                    if (key !== '__CLASS__') { // Remove __CLASS__ key
                        sanitized[key] = sanitizeData(data[key]);
                    }
                }
                return sanitized;
            }
            return data;
        };

        const fetchJobs = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const keyword = params.get('keyword')?.toLowerCase(); // Use lowercase for the key
                const jobLocation = params.get('location');

                if (!keyword) {
                    setLoading(false);
                    return;
                }

                // Check Firestore cache
                const docRef = doc(db, 'jobs', keyword);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Use cached data
                    setJobs(docSnap.data().results);
                    console.log("Loaded from cache:", docSnap.data().results);
                } else {
                    // Fetch from API and cache the results
                    const response = await getJobs(keyword, jobLocation);
                    const sanitizedResults = sanitizeData(response.results);
                    setJobs(sanitizedResults);
                    console.log("Fetched from API:", sanitizedResults);

                    // Save to Firestore
                    await setDoc(docRef, { results: sanitizedResults });
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [location.search]);

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    return (
        <div className="search-results">
            <FindJobs />
            <h1>Job Search Results</h1>
            {jobs.length > 0 ? (
                <div className="job-list">
                    {jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company?.display_name}</p>
                            <p><strong>Location:</strong> {job.location?.display_name}</p>
                            <p><strong>Salary:</strong> ${job.salary_min} - ${job.salary_max}</p>
                            <p><strong>Description:</strong> {job.description.substring(0, 100)}...</p>
                            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">View Job</a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No jobs found matching your criteria.</p>
            )}
        </div>
    );
};

export default Search;
