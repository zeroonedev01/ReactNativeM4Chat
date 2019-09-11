import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import User from '../../User';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  loginHandler = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <React.Fragment>
        <View style={style.center}>
          <Text style={style.header}>Here To Get Welcomed !</Text>
          <Image
            style={image.icon}
            source={require('../assets/dribbble-07_2x.png')}
          />

          <View style={style.viewInput}>
            <TextInput
              style={style.textInput}
              placeholder="Email"
              onChangeText={this.changeEmail}
              keyboardType={'email-address'}
            />
          </View>

          <View style={style.viewInput}>
            <TextInput
              secureTextEntry={true}
              style={style.textInput}
              placeholder="Password"
              onChangeText={this.changePassword}
            />
          </View>
          <TouchableOpacity style={style.login} onPress={this.loginHandler}>
            <Text style={{color: 'white', fontWeight: '500'}}>Log In</Text>
          </TouchableOpacity>
          <View style={style.bottom}>
            <Text>
              Don't have an account?
              <Text
                style={style.link}
                onPress={() => this.props.navigation.navigate('Register')}>
                {'  '}
                Sign Up!
              </Text>
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
const style = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    margin: 10,
  },
  header: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: 'bold',
    color: '#4B4C72',
  },
  title: {
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    width: '100%',
    textAlign: 'center',
    paddingBottom: 80,
  },
  login: {
    backgroundColor: '#5ba4e5',
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  bottom: {
    paddingTop: 10,
  },
  link: {
    color: '#5ba4e5',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#ECF0F9',
    padding: 5,
    paddingLeft: 20,
    borderRadius: 10,
  },
  viewInput: {
    width: '70%',
    paddingBottom: 10,
  },
});
const image = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    height: 200,
  },
});
