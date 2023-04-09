import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from '../../assets/images';

export const Header = ({navigation, title, backIcon}) => {
  return (
    <View
      style={[
        styles.headerView,
        {justifyContent: backIcon ? 'flex-start' : 'center'},
      ]}>
      {backIcon && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage
            style={styles.backArrowIcon}
            source={Images.backArrow}
            tintColor={'#c2c2c2'}
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.authorName, {marginLeft: backIcon ? '34%' : 0}]}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    backgroundColor: '#0c0f13',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backArrowIcon: {
    height: 20,
    width: 20,
  },
  authorName: {
    fontWeight: '600',
    color: '#c2c2c2',
    fontSize: 16,
  },
});
