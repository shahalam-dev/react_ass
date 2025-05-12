document.addEventListener('DOMContentLoaded', function() {
    // Create and append the CSS link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './jobsearch.css'; // Adjust the path if necessary
    document.head.appendChild(link);

    // Create the container and its elements
    const container = document.querySelector('.container');
    const jobSearchForm = document.getElementById('jobSearchForm');
    const resultsContainer = document.getElementById('results');
    const loadingMessage = document.getElementById('loading');

    // Event listener for form submission
    jobSearchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const jobTitle = document.getElementById('jobTitle').value.trim();
        const location = document.getElementById('location').value.trim();

        if (!jobTitle || !location) {
            alert('Please fill out both fields.');
            return;
        }

        // Show loading message
        loadingMessage.style.display = 'block';
        resultsContainer.innerHTML = '';  // Clear previous results

        // Simulating an API request (replace with real API later)
        setTimeout(() => {
            const jobResults = generateJobResults(jobTitle, location);
            displayResults(jobResults);
            loadingMessage.style.display = 'none'; // Hide loading message after results
        }, 1500); // Simulating a network delay (1.5 seconds)
    });

    // Function to generate fake job results (replace with actual API logic)
    function generateJobResults(jobTitle, location) {
        return [
            { title: `Senior ${jobTitle} at TechCorp`, location: `${location}, NY` },
            { title: `Junior ${jobTitle} at Innovate Ltd.`, location: `${location}, CA` },
            { title: `${jobTitle} - Remote Opportunity`, location: 'Remote' }
        ];
    }

    // Function to display job results
    function displayResults(jobResults) {
        if (jobResults.length === 0) {
            resultsContainer.innerHTML = '<p>No jobs found. Try different criteria.</p>';
        } else {
            jobResults.forEach(job => {
                const jobDiv = document.createElement('div');
                jobDiv.classList.add('job-result');

                const jobTitleElement = document.createElement('div');
                jobTitleElement.classList.add('job-title');
                jobTitleElement.textContent = job.title;

                const jobLocationElement = document.createElement('div');
                jobLocationElement.classList.add('job-location');
                jobLocationElement.textContent = job.location;

                jobDiv.appendChild(jobTitleElement);
                jobDiv.appendChild(jobLocationElement);

                resultsContainer.appendChild(jobDiv);
            });
        }
    }
});
