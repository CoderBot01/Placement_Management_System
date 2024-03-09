import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'DNT': '1',
    'Origin': 'http://localhost:3001',
    'Referer': 'http://localhost:3001/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

json_data = {
    'email': 'admin@gmail.com',
    'password': 'admin',
}

r = requests.post('http://localhost:3000/auth/adminlogin', headers=headers, json=json_data)
print(r.json())

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{"email":"admin@gmail.com","password":"admin"}'
#response = requests.post('http://localhost:3000/auth/adminlogin', headers=headers, data=data)