import AsyncStorage from '@react-native-community/async-storage';
import { logError } from './logging';

const TOKEN_KEY = '@auth_token';

export const setAuthToken = async (value = '') => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, value);
  } catch (err) {
    logError(err, '[setAuthToken] AsyncStorage Error');
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    logError(err, '[getAuthToken] AsyncStorage Error');

    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    logError(err, '[removeAuthToken] AsyncStorage Error');
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
  const token = await getAuthToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};
