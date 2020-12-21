import axios from '../utils/axios'

export function addFavorites(params) {
  return axios.post('/favorites', params);
}

export function getFavorites(params) {
  return axios.get('/favorites', { params });
}

