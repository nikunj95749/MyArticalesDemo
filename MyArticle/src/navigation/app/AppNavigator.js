import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import HomeFeedScreen from '../../screens/auth/HomeFeedScreen';
import CommentsScreen from '../../screens/auth/CommentsScreen';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer
      headerMode="none"
      mode="modal"
      initialRouteName="HomeFeedScreen">
      <AppStack.Navigator
        initialRouteName="Login"
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          swipeEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <AppStack.Screen name="HomeFeedScreen" component={HomeFeedScreen} />
        <AppStack.Screen name="Comments" component={CommentsScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
