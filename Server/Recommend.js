import axios from 'axios';

const searchJobs = async (keyword, location) => {
  

  const options = {
    method: 'GET',
    url: '',
    params: {
      keywords: keyword,
      location: location,
      datePosted: 'anyTime',
      sort: 'mostRelevant',
      remote: 'false'
   
    },
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': ''
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(`Error searching jobs: ${error}`);
  }
};

searchJobs('python', 'chennai')
  .then((jobs) => console.log(jobs))
  .catch((error) => console.error(error));

export default searchJobs;
