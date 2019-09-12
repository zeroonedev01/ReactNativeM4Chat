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
// import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // lat: '',
      // long: '',
      isLoading: false,
    };
  }
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  // async componentDidMount() {
  //   console.log('ads');
  //   await Geolocation.getCurrentPosition(
  //     async response => {
  //       console.log('Current Location:', response);
  //       this.setState({
  //         lat: response.coords.latitude,
  //         long: response.coords.longitude,
  //       });
  //     },
  //     error => {
  //       return {error};
  //     },
  //   );
  // }

  loginHandler = () => {
    if (this.state.email === '' || this.state.password === '') {
      ToastAndroid.show('Please FIll all field', ToastAndroid.LONG);
    } else {
      this.setState({isLoading: true});
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async response => {
          let userf = firebase.auth().currentUser;
          await AsyncStorage.setItem('uavatar', userf.photoURL);
          await AsyncStorage.setItem('uid', response.user.uid);
          User.id = await AsyncStorage.getItem('uid');
          User.avatar = await AsyncStorage.getItem('uavatar');
          // User.lat = this.state.lat;
          // User.long = this.state.long;
          // let updates = {};
          // updates['users/' + userf.uid + '/lat'] = User.lat;
          // updates['users/' + userf.uid + '/long'] = User.long;
          // await firebase
          //   .database()
          //   .ref()
          //   .update(updates);

          ToastAndroid.show('Welcome back', ToastAndroid.LONG);
          this.setState({isLoading: false});
          this.props.navigation.navigate('App');
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/user-not-found':
              ToastAndroid.show('User Not Found ', ToastAndroid.LONG);
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('Wrong Password ', ToastAndroid.LONG);
              break;
            case 'auth/wrong-password':
              ToastAndroid.show('Wrong Password ', ToastAndroid.LONG);
              break;

            default:
              console.error(err);
              ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
          }
          this.setState({isLoading: false});
        });
    }
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
          <TouchableOpacity style={style.login} onPress={this.loginHandler}>
            {this.state.isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{color: 'white', fontWeight: '500'}}>Log In</Text>
            )}
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
