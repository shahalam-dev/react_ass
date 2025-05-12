import axios from 'axios';

export const getJobs = async (keyword, location) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);

    try {
        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/sg/search/1?app_id=541a76b5&app_key=3e93faf1e091679e8c9572e151bce23e&what=${keyword}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};