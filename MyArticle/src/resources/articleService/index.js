import AsyncStorage from '@react-native-community/async-storage';

import {MY_ARTICLE_DATA} from '../../constants/asyncStorageKeys';

export const setStorageArticle = async data => {
  try {
    await AsyncStorage.setItem(MY_ARTICLE_DATA, JSON.stringify(data));
  } catch (err) {
    console.warn(err);
  }
};
export const getArticles = () => AsyncStorage.getItem(MY_ARTICLE_DATA);
