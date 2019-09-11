import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  FlatList,
} from 'react-native';
import firebaseApp from '../configs/firebaseConfig';
import User from '../../User';
export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'MapChat',
  };
  state = {users: []};
  componentWillMount() {
    let dbRef = firebaseApp.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.email = val.key;
      if (person.email === User.email) {
        User.email = person.email;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }
  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Text style={{fontSize: 20}}>{item.email}1</Text>
      </TouchableOpacity>
    );
  };
  render() {
    if (!this.state.users.length > 0) {
      <Text>Lading</Text>;
    }
    console.log('User sekarnag', this.state.users[0]);
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.email}
        />
        <TouchableOpacity onPress={this.logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default HomeScreen;
