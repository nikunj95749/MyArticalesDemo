import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import useConnectionInfo from '../hooks/useConnectionInfo';
import useAuthorizedSession from '../hooks/useAuthorizedSession';
import AuthNavigator from './auth/AuthNavigator';
import AppNavigator from './app/AppNavigator';
import {PRIMARY_PINK} from '../styles';

const Navigation = () => {
  const [authToken, isInitializing] = useAuthorizedSession();
  useConnectionInfo();

  if (isInitializing) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={PRIMARY_PINK} />
      </View>
    );
  }

  return authToken ? <AppNavigator /> : <AuthNavigator />;
};

export default Navigation;

const styles = StyleSheet.create({
  loaderWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
