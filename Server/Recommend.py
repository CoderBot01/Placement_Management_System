from requests import get
from bs4 import BeautifulSoup
import json
 
url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=java%20(Programming%20Language)&location=tiruchengode&geoId=1215229671&currentJobId=3415227738&position=1&pageNum=0&start=25"
 
soup = BeautifulSoup(get(url).text, "html.parser")
 
json_info = []
file = open("jobs.json", "w")
 
# Extracting job information
for i, job in enumerate(soup.find_all(attrs={"class":"job-search-card"})):
    title = job.find(attrs={"class": "sr-only"}).text.strip()
    company = job.find(attrs={"class": "hidden-nested-link"}).text.strip()
    location = job.find(attrs={"class": "job-search-card__location"}).text.strip()
    url = job.find(attrs={"class": "hidden-nested-link"}).get("href")
 
    job_info = {
        "title": title,
        "company": company,
        "location": location,
        "url": url
    }
 
    json_info.append(job_info)
 
# Output the JSON data
json.dump(json_info, file, indent=4)