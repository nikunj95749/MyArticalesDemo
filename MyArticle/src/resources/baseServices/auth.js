import { callApiPost } from './baseApi';
import API from '../../constants/baseApi';

export const logIn = (data = {}) => callApiPost({ url: API.LOG_IN, data });

