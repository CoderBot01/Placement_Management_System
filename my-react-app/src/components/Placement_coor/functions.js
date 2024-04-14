// Import any required libraries or modules here

// Function for making a POST request
async function postData(baseUrl, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/';
            return;
        }
        
        const response = await fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function for making a GET request
async function getData(baseUrl, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/';
            return;
        }
        
        const response = await fetch(baseUrl, {
            method: 'GET',
            // Add any query parameters to the URL here
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.json());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function for making a PUT request
async function putData(baseUrl, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/login';
            return;
        }
        
        const response = await fetch(baseUrl, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function for making a DELETE request
async function deleteData(baseUrl, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/login';
            return;
        }
        
        const response = await fetch(baseUrl, {
            method: 'DELETE',
            // Add any query parameters to the URL here
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Export the functions for use in other files if needed
export { postData, getData, putData, deleteData };