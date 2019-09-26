import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
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
import FriendScreen from './src/screens/FriendProfile';
import OneSignal from 'react-native-onesignal';
import {Icon} from 'native-base';
import audio from 'react-native-sound';
import DeviceId from './src/Publics/store/deviceId';
const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
});

const ChatStack = createStackNavigator({
  ListChat: ListChatScreen,
  Chat: ChatScreen,
  Friend: FriendScreen,
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
      screen: ChatStack,
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
  constructor(properties) {
    super(properties);
    OneSignal.init('d78bd285-678f-429b-9b7e-1a8588d4a279');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.enableSound(false);
    OneSignal.inFocusDisplaying(2);
    OneSignal.enableVibrate(true);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
    const notif = new audio('onichan.mp3', audio.MAIN_BUNDLE, err => {
      if (err) {
        return;
      }
      notif.play();
    });
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
    DeviceId.IDPonsel = device.userId;
    AsyncStorage.setItem('idponsel', device.userId);
    console.warn(DeviceId.IDPonsel);
  }
  render() {
    return <AppRoot />;
  }
}
