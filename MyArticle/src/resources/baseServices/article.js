import {callApiGet, callApiPost, callApiDelete} from './baseApi';
import API from '../../constants/baseApi';

export const Article = (data = {}, url) =>
  callApiGet({url: API.GET_ARTICLE + url, data});
export const getComment = (data = {}, url) =>
  callApiGet({url: API.ARTICLE + url, data});
export const postComment = (data = {}, url) =>
  callApiPost({url: API.ARTICLE + url, data});
export const deleteComment = (data = {}, url) =>
  callApiDelete({url: API.ARTICLE + url, data});
