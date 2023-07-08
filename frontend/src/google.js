import axios from 'axios';

export async function searchGoogle(first_name, last_name) {
  const searchQuery = `${first_name} ${last_name}`;
  const apiUrl = 'https://www.googleapis.com/customsearch/v1';
  apiKey = 'AIzaSyDGrHzPznPzIkbgcNW7T1x1Dc6si47vaZ4'

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: searchQuery,
        key: apiKey,
        num: 1, // Number of results to retrieve (1 for the first URL)
      },
    });

    const firstResult = response.data.items[0];
    const firstUrl = firstResult.link;

    return firstUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}