import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyB626G5y_ETKX_LY3vOY9qaQU3kUxXqil8',
  authDomain: 'mapschat-zeref.firebaseapp.com',
  databaseURL: 'https://mapschat-zeref.firebaseio.com',
  projectId: 'mapschat-zeref',
  storageBucket: 'mapschat-zeref.appspot.com',
  messagingSenderId: '929773866731',
  appId: '1:929773866731:web:a92708b53f28399bc7f8ae',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log('Firebase APP Name ', firebaseApp.name);
// export const firebaseDb = firebaseApp.database();
// export const firebaseAuth = firebaseApp.auth();
export default firebaseApp;
