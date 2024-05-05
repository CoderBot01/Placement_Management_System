import axios from 'axios';

const findLocationId = async (locationQuery) => {
  const apiUrl = `https://linkedin-api8.p.rapidapi.com/location/auto-complete?query=${encodeURIComponent(locationQuery)}`;

  const options = {
    method: 'GET',
    url: apiUrl,
    headers: {
        'X-RapidAPI-Key': '1368737352mshcdb226e6cce563fp16b3fcjsnab74d043c9f6',
        'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
      }
  };

  try {
    const response = await axios.request(options);
    if (response.data && response.data.length > 0) {
      // Return the locationId of the first result
      return response.data[0].locationId;
    } else {
      throw new Error('Location ID not found');
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`Error fetching location ID: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error: No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error: ${error.message}`);
    }
    throw error;
  }
};

// Example usage of findLocationId
(async () => {
  try {
    const locationQuery = "new york";
    const locationId = await findLocationId(locationQuery);
    console.log(`Location ID for "${locationQuery}": ${locationId}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
