export const BASE_URL = 'https://api.realworld.io/api/';

const API = {
  /** AUTH **/
  LOG_IN: BASE_URL + '/users/login',
  GET_ARTICLE: BASE_URL + '/articles?limit=50',
  ARTICLE: BASE_URL + '/articles',
};

export default API;
