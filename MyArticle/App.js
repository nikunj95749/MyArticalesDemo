import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar, StyleSheet, View} from 'react-native';
import configureStore from './src/store/configureStore';
import Navigation from './src/navigation';
import {WHITE} from './src/styles';
import FlashMessage from 'react-native-flash-message';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Navigation />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    position: 'relative',
  },
});
