import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import ChatScreen from './src/screens/ChatScreen';
import SplashScreen from './src/screens/SplashScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ListChatScreen from './src/screens/ListChatsScreen';

import {Icon} from 'native-base';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
});
const HomeBottom = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="google-maps"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
    ListChat: {
      screen: ListChatScreen,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome"
            name="wechat"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="EvilIcons"
            name="user"
            style={{fontSize: 20, color: tintColor}}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#5ba4e5',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);
const AuthStack = createStackNavigator({
  SignIn: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({header: null}),
  },
  Register: {
    screen: SignUpScreen,
    navigationOptions: ({navigation}) => ({header: null}),
  },
  Home: {
    screen: HomeBottom,
  },
});

const AppRoot = createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: SplashScreen,
      AuthLoading: AuthLoadingScreen,
      App: HomeBottom,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'SplashScreen',
      headerMode: 'none',
    },
  ),
);
export default class App extends Component {
  render() {
    return <AppRoot />;
  }
}
