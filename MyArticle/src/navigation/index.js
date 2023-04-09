import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import useConnectionInfo from '../hooks/useConnectionInfo';
import useAuthorizedSession from '../hooks/useAuthorizedSession';
import AppNavigator from './app/AppNavigator';
import {BLACK, WHITE} from '../styles';

const Navigation = () => {
  const [isInitializing] = useAuthorizedSession();
  useConnectionInfo();

  if (isInitializing) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={WHITE} />
      </View>
    );
  }

  return <AppNavigator /> ;
};

export default Navigation;

const styles = StyleSheet.create({
  loaderWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor:BLACK
  },
});
