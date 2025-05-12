const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Job titles to search for
const jobTitles = [
  '"Software Engineer"',
  '"Doctor"',
  '"IT Specialist"',
  '"Data Engineer"',
  '"Data Analyst"',
  '"Network Engineer"',
  '"Production manager"',
  '"IT Consultant"',
    '"IT Support"',
'" cybersecurity specialist"',

  
].join(' OR ');

// Locations to search in
const locations = [
  '"Malaysia"',
  '"Selangor"',
  '"Puchong"',
  '"Cyberjaya"',
  '"Shah Alam"',
  '"Putrajaya"',
  '"Kuala Lumpur"',
  '"Singapore"',
].join(' OR ');

// Encode for use in URL
const url = `https://linkedin-job-search-api.p.rapidapi.com/active-jb-1h?offset=0&title_filter=${encodeURIComponent(jobTitles)}&location_filter=${encodeURIComponent(locations)}`;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '9af15c0e0dmshb83ac8a121e6ca1p105ba7jsna6d61657aa73',
    'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
  }
};

async function fetchJobs() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (Array.isArray(data.jobs)) {
      data.jobs.forEach((job, index) => {
        console.log(`\n🔹 Job #${index + 1}`);
        console.log(`Title      : ${job.title || 'N/A'}`);
        console.log(`Company    : ${job.company || 'N/A'}`);
        console.log(`Location   : ${job.location || 'N/A'}`);
        console.log(`Posted On  : ${job.date || 'N/A'}`);
        console.log(`URL        : ${job.url || 'N/A'}`);
      });
    } else {
      console.log("No job data found or unexpected response format.");
    }

  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
  }
}

fetchJobs();


