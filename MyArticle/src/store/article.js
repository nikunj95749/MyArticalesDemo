import produce from 'immer';

const GET_ARTICLE = 'GET_ARTICLE';
const ARTICLE_TOTAL_DATA = 'ARTICLE_TOTAL_DATA';

const initialState = {
  article_data: [],
  article_total: {
    page: 0,
    totalData: 0,
  },
};

// reducer
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ARTICLE:
        draft.article_data = action.payload;
        break;
      case ARTICLE_TOTAL_DATA:
        draft.article_total = action.payload;
        break;
    }
  });

export const getArticle = (data = []) => ({
  type: GET_ARTICLE,
  payload: data,
});
export const getArticleTotal = (
  data = {
    page: 0,
    totalData: 0,
  },
) => ({
  type: ARTICLE_TOTAL_DATA,
  payload: data,
});
