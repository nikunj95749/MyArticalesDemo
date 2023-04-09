import React from 'react';

import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors } from '#themes';

const Loader = ({ fullScreen }) => {
  return (
    <View style={{ ...styles.loader, ...(fullScreen && styles.fullScreen) }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    padding: 60,
    justifyContent: 'center',
    alignContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
});

export default Loader;
