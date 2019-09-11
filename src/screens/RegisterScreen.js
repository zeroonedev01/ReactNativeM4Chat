// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   AsyncStorage,
//   Alert,
// } from 'react-native';
// import User from '../../User';
// // import firebaseApp from '../configs/firebaseConfig';
// export class Login extends Component {
//   state = {
//     fullname: '',
//     email: '',
//     password: '',
//     photo: '',
//     phone: '',
//     address: '',
//   };
//   handleChange = key => val => {
//     this.setState({[key]: val});
//   };
//   componentWillMount() {
//     AsyncStorage.getItem('email').then(val => {
//       if (val) {
//         this.setState({email: val});
//       }
//     });
//   }
//   submitForm = async () => {
//     if (this.state.email.length < 5) {
//       Alert.alert('Error', 'Wrong phone number');
//     } else {
//       await AsyncStorage.setItem('email', this.state.email);
//       User.email = this.state.email;
//       await firebaseApp
//         .database()
//         .ref('users/' + User.email)
//         .set({
//           password: this.state.password,
//           photo: this.state.photo,
//           phone: this.state.phone,
//           address: this.state.address,
//         });
//       this.props.navigation.navigate('App');
//       // Alert.alert(
//       //   this.state.email +
//       //     '\n' +
//       //     this.state.fullname +
//       //     '\n' +
//       //     this.state.password +
//       //     '\n' +
//       //     this.state.photo,
//       // );
//     }
//   };
//   render() {
//     return (
//       <View style={style.container}>
//         <TextInput
//           placeholder="Fullname"
//           style={style.input}
//           value={this.state.fullname}
//           onChangeText={this.handleChange('fullname')}
//         />
//         <TextInput
//           placeholder="Email"
//           style={style.input}
//           value={this.state.email}
//           onChangeText={this.handleChange('email')}
//         />
//         <TextInput
//           secureTextEntry={true}
//           placeholder="Password"
//           style={style.input}
//           value={this.state.password}
//           onChangeText={this.handleChange('password')}
//         />
//         <TextInput
//           placeholder="Photo"
//           style={style.input}
//           value={this.state.photo}
//           onChangeText={this.handleChange('photo')}
//         />
//         <TextInput
//           placeholder="Phone Number"
//           style={style.input}
//           value={this.state.phone}
//           onChangeText={this.handleChange('phone')}
//         />
//         <TextInput
//           placeholder="Address"
//           style={style.input}
//           value={this.state.address}
//           onChangeText={this.handleChange('address')}
//         />
//         <TouchableOpacity onPress={this.submitForm}>
//           <Text style={style.btnText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCCF',
//   },
//   input: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     width: '90%',
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   btnText: {
//     color: 'darkblue',
//     fontSize: 20,
//   },
// });
// export default Login;
