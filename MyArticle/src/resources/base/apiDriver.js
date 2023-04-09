import axios from 'axios';
import { authHeader } from '../../helpers/auth';
import { configureAxiosParams } from '../../helpers/configureAxios';

// Format axios nested params correctly
configureAxiosParams(axios);

export const callApi = async (url, options = {}, customHeaders = {}) => {
  const headers = await authHeader();

  return axios.request({
    url,
    headers: {
      ...headers,
      ...customHeaders,
    },
    ...options,
  });
};
