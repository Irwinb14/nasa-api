import axios from 'axios';

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

export async function getNASAData(date) {
  try {
    const response = await axios.get(NASA_API_URL, {
      params: {
        api_key: NASA_API_KEY,
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
