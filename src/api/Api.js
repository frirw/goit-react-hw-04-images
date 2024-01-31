import axios from 'axios';

export const getSearchImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40511687-cbadb7257ae9d9e32908df6a3';

  const per_page = 12;
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page,
    page,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  response.data.perPage = per_page;
  return response.data;
};
