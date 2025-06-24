import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com/';

export const query = axios.create({
  baseURL,
});
 