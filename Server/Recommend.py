import requests
import json

url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=java%20(Programming%20Language)&location=tiruchengode&geoId=1215229671&currentJobId=3415227738&position=1&pageNum=0&start=25"

response = requests.get(url)
print(response.text)  # Print out the response text

if response.status_code == 200:
    try:
        job_data = response.json()
        jobs = job_data.get("data", {}).get("elements", [])

        json_info = []
        for job in jobs:
            title = job.get("title")
            company = job.get("companyName")
            location = job.get("locationName")
            job_url = job.get("jobPostingUrl")

            job_info = {
                "title": title,
                "company": company,
                "location": location,
                "url": job_url
            }

            json_info.append(job_info)

        with open("jobs.json", "w") as file:
            json.dump(json_info, file, indent=4)

        print("Job information saved to jobs.json")
    except json.JSONDecodeError:
        print("Failed to parse JSON response.")
else:
    print("Failed to fetch job information. Status code:", response.status_code)
