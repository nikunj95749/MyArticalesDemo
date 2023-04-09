import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import HomeFeedScreen from '../../screens/auth/HomeFeedScreen';

const AuthStack = createStackNavigator();
const ModalStack = createStackNavigator();

const ModalStackNavigator = () => {

  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        swipeEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />   
      <AuthStack.Screen name="HomeFeedScreen" component={HomeFeedScreen} />  
    </AuthStack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <ModalStack.Navigator
        headerMode="none"
        mode="modal"
        initialRouteName="Main"
      >
        <ModalStack.Screen name="Main" component={ModalStackNavigator} />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
