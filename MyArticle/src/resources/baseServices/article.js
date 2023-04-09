import {callApiGet, callApiPost, callApiDelete} from './baseApi';
import API from '../../constants/baseApi';

export const getArticles = pageNo =>
  callApiGet({url: API.GET_ARTICLE + `&offset=${pageNo}`});
export const getComment = (data = {}, url) =>
  callApiGet({url: API.ARTICLE + url, data});
export const postComment = (data = {}, slug = '') =>
  callApiPost({url: API.ARTICLE + `/${slug}/comments`, data});
export const deleteComment = (slug, commentId) =>
  callApiDelete({
    url: API.ARTICLE + `/${slug}/comments/${commentId}`,
  });
