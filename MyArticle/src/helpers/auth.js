import AsyncStorage from '@react-native-community/async-storage';
import {logError} from './logging';

const USER_DETAILS_KEY = '@user_token';

export const setUserDetails = async (value = '') => {
  try {
    await AsyncStorage.setItem(USER_DETAILS_KEY, value);
  } catch (err) {
    logError(err, '[setAuthToken] AsyncStorage Error');
  }
};

export const getUserDetails = async () => {
  try {
    return await AsyncStorage.getItem(USER_DETAILS_KEY);
  } catch (err) {
    logError(err, '[getAuthToken] AsyncStorage Error');

    return null;
  }
};

// eslint-disable-next-line require-await
export const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (err) {
    logError(err, '[clearStorage] AsyncStorage Error');
  }
};

export const authHeader = async () => {
  const userDetails = await getUserDetails();

  return userDetails
    ? {Authorization: `Bearer ${JSON.parse(userDetails)?.token}`}
    : {};
};
