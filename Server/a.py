import requests
import json

# Define the URL for the POST request
url = "http://localhost:3000/students"

# Define the JSON data to be sent in the request body
data = {
    "name": "John Doe",
    "department": "Computer Science",
    "email": "john.doe@easdfasdfsdfxample.com",
    "password": "password123",
    "year_of_joining": 2020,
    "year_of_graduation": 2024,
    "phone_number": "123-456-7890",
    "address": "123 Main St, City, Country",
    "resume_url": "http://example.com/resume",
    "graduation_year": 2024,
    "gpa": 3.80
}

# Convert the data to JSON format
json_data = json.dumps(data)

# Set the headers for the request
headers = {
    "Content-Type": "application/json"
}

# Make the POST request
response = requests.post(url, data=json_data, headers=headers)

print(response.json())
# Check if the request was successful
if response.status_code == 201:
    print("Student added successfully")
else:
    print("Error:", response.status_code, response.text)
