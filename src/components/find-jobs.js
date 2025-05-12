import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FindJobs = () => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialKeyword = params.get('keyword') || '';
        const initialLocation = params.get('location') || '';
        setKeyword(initialKeyword);
        setLocation(initialLocation);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (keyword) params.append('keyword', keyword);
        if (location) params.append('location', location);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <section className="hero">
            <h1>Find Your Dream Job</h1>
            <p>Explore thousands of job opportunities tailored for you.</p>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City, state, or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </section>
    );
}

export default FindJobs;