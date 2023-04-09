import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {LIGHT_GRAY_100} from '../../../styles';

const SmallLoader = ({style}) => (
  <View
    style={{
      height: 70,
      ...style,
    }}>
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={LIGHT_GRAY_100} />
    </View>
  </View>
);
const styles = StyleSheet.create({
  activityContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});
export default SmallLoader;
