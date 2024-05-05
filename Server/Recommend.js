import axios from 'axios';

const searchJobs = async (keyword, location) => {
  

  const options = {
    method: 'GET',
    url: 'https://linkedin-api8.p.rapidapi.com/search-jobs',
    params: {
      keywords: keyword,
      location: location,
      datePosted: 'anyTime',
      sort: 'mostRelevant',
      remote: 'false'
   
    },
    headers: {
      'X-RapidAPI-Key': '1368737352mshcdb226e6cce563fp16b3fcjsnab74d043c9f6',
      'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
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
