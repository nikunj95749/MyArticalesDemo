import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar, StyleSheet, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import configureStore from './src/store/configureStore';
import Navigation from './src/navigation';
import {WHITE} from './src/styles';

const store = configureStore();


enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Navigation />
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
