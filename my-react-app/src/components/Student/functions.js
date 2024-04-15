import BaseUrl from "./Constant";




async function postData(path, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/';
            return;
        }
        
        const response = await fetch(BaseUrl + path, {
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
async function getData(path, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/';
            return;
        }
        
        const response = await fetch(BaseUrl + path, {
            method: 'GET',
            // Add any query parameters to the URL here
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Function for making a PUT request
async function putData(path, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/login';
            return;
        }
        
        const response = await fetch(BaseUrl + path, {
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
async function deleteData(path, params) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page
            window.location.href = '/login';
            return;
        }
        
        const response = await fetch(BaseUrl + path, {
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