import axios from "axios";
import fs from "fs";

async function scrapeJobs() {
    const url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=java%20(Programming%20Language)&location=tiruchengode&geoId=1215229671&currentJobId=3415227738&position=1&pageNum=0&start=25";

    try {
        const response = await axios.get(url);
        const jobs = response.data.data.elements;
        const json_info = [];

        jobs.forEach(job => {
            const title = job.title.text;
            const company = job.subtext.text;
            const location = job.locationText;
            const url = `https://www.linkedin.com/jobs/view/${job.jobPostingId}`;

            const job_info = {
                "title": title,
                "company": company,
                "location": location,
                "url": url
            };

            json_info.push(job_info);
        });

        fs.writeFileSync('jobs.json', JSON.stringify(json_info, null, 4));
        console.log('Jobs data has been scraped and saved to jobs.json.');
    } catch (error) {
        console.error('Error occurred while scraping jobs:', error);
    }
}

export default scrapeJobs;
