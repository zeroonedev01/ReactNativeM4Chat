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
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';
import User from '../../User';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      phonenumber: '',
      avatar: '',
      email: '',
      password: '',
      long: '',
      lat: '',
    };
  }
  async componentDidMount() {
    console.log('ads');
    await Geolocation.getCurrentPosition(
      async response => {
        console.log('Current Location:', response);
        this.setState({
          lat: response.coords.latitude,
          long: response.coords.longitude,
        });
      },
      error => {
        return {error};
      },
    );
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };
  validateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  };

  registerHandler = () => {
    if (
      this.state.fullname === '' ||
      this.state.phonenumber === '' ||
      this.state.avatar === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      ToastAndroid.show('Please FIll all field', ToastAndroid.LONG);
    } else if (
      this.state.phonenumber.length < 10 ||
      this.state.phonenumber.length > 13
    ) {
      ToastAndroid.show(
        'Phone Number minimum 10 character and maximum 13 character',
        ToastAndroid.LONG,
      );
    } else if (!this.validateEmail()) {
      ToastAndroid.show('Email Not Valid', ToastAndroid.LONG);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async response => {
          await AsyncStorage.setItem('uid', response.user.uid);
          User.id = await AsyncStorage.getItem('uid');
          User.avatar = this.state.avatar;
          User.password = this.state.password
            ? this.state.avatar
            : 'https://i.pinimg.com/originals/ba/ab/e2/baabe2988b391efe1ada78bac4699f04.png';
          await AsyncStorage.setItem('uavatar', User.avatar);
          let curUser = firebase.auth().currentUser;
          curUser.updateProfile({
            displayName: this.state.fullname,
            phoneNumber: this.state.phonenumber,
            photoURL: this.state.avatar
              ? this.state.avatar
              : 'https://i.pinimg.com/originals/ba/ab/e2/baabe2988b391efe1ada78bac4699f04.png',
          });
          firebase
            .database()
            .ref('users/' + response.user.uid)
            .set({
              fullname: this.state.fullname,
              phonenumber: this.state.phonenumber,
              avatar: this.state.avatar,
              long: this.state.long,
              lat: this.state.lat,
            });

          User.lat = this.state.lat;
          User.long = this.state.long;
          User.email = this.state.email;
          User.fullname = this.state.fullname;
          User.phonenumber = this.state.phonenumber;

          ToastAndroid.show(
            'Welcome ' + this.state.fullname,
            ToastAndroid.LONG,
          );
          this.props.navigation.navigate('App');
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              ToastAndroid.show(
                'This email is already in use..',
                ToastAndroid.LONG,
              );
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('This email is invalid', ToastAndroid.LONG);
              break;
            case 'auth/weak-password':
              ToastAndroid.show(
                'password must contain at least 6 characters',
                ToastAndroid.LONG,
              );
              break;
            default:
              ToastAndroid.show('Error', err, ToastAndroid.LONG);
          }
        });
    }
    // console.log(this.validateEmail());
    // console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <View style={style.center}>
          <Text style={style.header}>Let's get Started !</Text>
          <Image
            style={image.icon}
            source={require('../assets/dribbble-07_2x.png')}
          />
          <View style={style.viewInput}>
            <TextInput
              style={style.textInput}
              placeholder="Fullname"
              value={this.state.fullname}
              onChangeText={this.handleChange('fullname')}
            />
          </View>
          <View style={style.viewInput}>
            <TextInput
              style={style.textInput}
              placeholder="Phone Number"
              keyboardType={'numeric'}
              value={this.state.phonenumber}
              onChangeText={this.handleChange('phonenumber')}
            />
          </View>
          <View style={style.viewInput}>
            <TextInput
              style={style.textInput}
              placeholder="Avatar Url"
              value={this.state.avatar}
              onChangeText={this.handleChange('avatar')}
            />
          </View>
          <View style={style.viewInput}>
            <TextInput
              style={style.textInput}
              placeholder="Email"
              keyboardType={'email-address'}
              value={this.state.email}
              onChangeText={this.handleChange('email')}
            />
          </View>

          <View style={style.viewInput}>
            <TextInput
              secureTextEntry={true}
              style={style.textInput}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.handleChange('password')}
            />
          </View>
          <TouchableOpacity style={style.login} onPress={this.registerHandler}>
            <Text style={{color: 'white', fontWeight: '500'}}>Register</Text>
          </TouchableOpacity>
          <View style={style.bottom}>
            <Text>
              Already have an account?
              <Text
                style={style.link}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                {'  '}
                Sign In!
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
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
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
