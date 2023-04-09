import AsyncStorage from '@react-native-community/async-storage';
import { logError } from './logging';

const CONNECTION_ONBOARDING_DAYS = '@connection_onboarding_days';
const MATCH_ONBOARDING_DAYS = '@connection_onboarding_days';
const CLOSED_GUIDELINE_TIME_CARD = '@closed_guideline_time_card';
const CLOSED_COMUNITY_CHAT_CARD = '@closed_comunity_chat_card';
const BUILD_PROFILE_STEPS = '@build_profile_steps';
export const TUTORIAL_DASHBOARD_FLAG = '@tutorial_dashboard_flag';
export const TUTORIAL_CHAT_FLAG = '@tutorial_chat_flag';
export const TUTORIAL_SEARCH_TAGS_FLAG = '@tutorial_search_tags_flag';
export const TUTORIAL_HEART_FLAG = '@tutorial_heart_flag';
export const TUTORIAL_MESSAGE_INBOX_FLAG = '@tutorial_message_inbox_flag';
export const TUTORIAL_SEARCH_RESULT_FLAG = '@tutorial_search_result_flag';
export const TRACKING_PERMISION_FLAG = '@tracking_permision_flag';

export const setTrackingPermisionFlag = async (value = '') => {
  try {
    await AsyncStorage.setItem(TRACKING_PERMISION_FLAG, value);
  } catch (err) {
    logError(err, '[setTrackingPermisionFlag] AsyncStorage Error');
  }
};

export const getTrackingPermisionFlag = async () => {
  try {
    return await AsyncStorage.getItem(TRACKING_PERMISION_FLAG);
  } catch (err) {
    logError(err, '[getTrackingPermisionFlag] AsyncStorage Error');

    return null;
  }
};

export const setConnectionOnboardingDays = async (value = '') => {
  try {
    await AsyncStorage.setItem(CONNECTION_ONBOARDING_DAYS, value);
  } catch (err) {
    logError(err, '[setConnectionOnboardingDays] AsyncStorage Error');
  }
};

export const getConnectionOnboardingDays = async () => {
  try {
    return await AsyncStorage.getItem(CONNECTION_ONBOARDING_DAYS);
  } catch (err) {
    logError(err, '[getConnectionOnboardingDays] AsyncStorage Error');

    return null;
  }
};

export const setMatchOnboardingDays = async (value = '') => {
  try {
    await AsyncStorage.setItem(MATCH_ONBOARDING_DAYS, value);
  } catch (err) {
    logError(err, '[setMatchOnboardingDays] AsyncStorage Error');
  }
};

export const getMatchOnboardingDays = async () => {
  try {
    return await AsyncStorage.getItem(MATCH_ONBOARDING_DAYS);
  } catch (err) {
    logError(err, '[getMatchOnboardingDays] AsyncStorage Error');

    return null;
  }
};

export const setComunityGuidelineCloseDate = async (value = '') => {
  try {
    await AsyncStorage.setItem(CLOSED_GUIDELINE_TIME_CARD, value);
  } catch (err) {
    logError(err, '[setComunityGuidelineCloseDate] AsyncStorage Error');
  }
};

export const getComunityGuidelineCloseDate = async () => {
  try {
    return await AsyncStorage.getItem(CLOSED_GUIDELINE_TIME_CARD);
  } catch (err) {
    logError(err, '[getComunityGuidelineCloseDate] AsyncStorage Error');

    return null;
  }
};

export const removeComunityGuidelineCloseDate = async () => {
  try {
    await AsyncStorage.removeItem(CLOSED_GUIDELINE_TIME_CARD);
  } catch (err) {
    logError(err, '[removeComunityGuidelineCloseDate] AsyncStorage Error');
  }
};

export const setComunityChatCardCloseDate = async (value = '') => {
  try {
    await AsyncStorage.setItem(CLOSED_COMUNITY_CHAT_CARD, value);
  } catch (err) {
    logError(err, '[setComunityChatCardCloseDate] AsyncStorage Error');
  }
};

export const getComunityChatCardCloseDate = async () => {
  try {
    return await AsyncStorage.getItem(CLOSED_COMUNITY_CHAT_CARD);
  } catch (err) {
    logError(err, '[getComunityChatCardCloseDate] AsyncStorage Error');

    return null;
  }
};

export const removeComunityChatCardCloseDate = async () => {
  try {
    await AsyncStorage.removeItem(CLOSED_COMUNITY_CHAT_CARD);
  } catch (err) {
    logError(err, '[removeComunityChatCardCloseDate] AsyncStorage Error');
  }
};

export const setTutorialFlag = async (flag, value = '') => {
  try {
    await AsyncStorage.setItem(flag, value);
  } catch (err) {
    logError(err, `[setTutorialFlag - ${flag}] AsyncStorage Error`);
  }
};

export const getTutorialFlag = async flag => {
  try {
    return await AsyncStorage.getItem(flag);
  } catch (err) {
    logError(err, `[getTutorialFlag - ${flag}] AsyncStorage Error`);

    return null;
  }
};

export const setBuildProfileSteps = async (value = '') => {
  try {
    const buildProfileSteps = JSON.parse(await getBuildProfileSteps());

    const valueInJson = JSON.parse(value);
    if (buildProfileSteps) {
      const foundObject = buildProfileSteps.find(obj => {
        return obj?.stepnumber === valueInJson?.stepnumber;
      });

      const updatedBuildProfilesSteps = buildProfileSteps.map((obj, index) => {
        return obj?.stepnumber === valueInJson?.stepnumber ? valueInJson : obj;
      });

      if (!foundObject) {
        updatedBuildProfilesSteps.push(valueInJson);
      }

      await AsyncStorage.setItem(
        BUILD_PROFILE_STEPS,
        JSON.stringify(updatedBuildProfilesSteps),
      );

      return;
    }

    await AsyncStorage.setItem(BUILD_PROFILE_STEPS, `[${value}]`);
  } catch (err) {
    logError(err, '[setComunityChatCardCloseDate] AsyncStorage Error');
  }
};

export const getBuildProfileSteps = async () => {
  try {
    return await AsyncStorage.getItem(BUILD_PROFILE_STEPS);
  } catch (err) {
    logError(err, '[getComunityChatCardCloseDate] AsyncStorage Error');

    return null;
  }
};
