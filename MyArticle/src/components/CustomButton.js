import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import SmallLoader from './Loader/SmallLoader';

const CustomButton = ({title = '', isLoading = false, onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 30,
    width: '100%',
    height: 45,
    backgroundColor: '#0c0f13',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
export default CustomButton;
