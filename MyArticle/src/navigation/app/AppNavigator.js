import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import HomeFeedScreen from '../../screens/home/HomeFeedScreen';
import CommentsScreen from '../../screens/comment/CommentsScreen';
import LoginScreen from '../../screens/auth/LoginScreen';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer
      headerMode="none"
      mode="modal"
      >
      <AppStack.Navigator
        initialRouteName="HomeFeedScreen"
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          swipeEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <AppStack.Screen name="HomeFeedScreen" component={HomeFeedScreen} />
        <AppStack.Screen name="Comments" component={CommentsScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />   
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
