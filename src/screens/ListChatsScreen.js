import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import {Icon} from 'native-base';

import firebase from 'firebase';
// import firebaseApp from '../configs/firebaseConfig';
import User from '../../User';
export class ListChatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Icon
          type="MaterialCommunityIcons"
          name="dots-vertical"
          style={{color: 'white'}}
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#2980b9',
      },
      title: 'M4Chat',
    };
  };
  componentDidMount() {
    const dbRef = firebase.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid === User.id) {
        User.fullname = person.fullname;
        User.phonenumber = person.phonenumber;
        User.avatar = person.avatar;
        User.email = person.email;
        User.password = person.password;
        User.lat = person.lat;
        User.long = person.long;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
    dbRef.on('child_changed', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid !== User.id) {
        this.setState(prevState => {
          return {
            users: prevState.users.map(user => {
              if (user.uid === person.uid) {
                user = person;
              }
              return user;
            }),
          };
        });
      }
    });
  }
  // componentWillUnmount() {}

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Chat', item)}
        onLongPress={() => this.props.navigation.navigate('Friend', item)}>
        <View style={styles.row}>
          <Image source={{uri: item.avatar}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.fullname}
              </Text>
              <Text style={styles.mblTxt}>Today</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // renderRow = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         padding: 10,
  //         borderBottomColor: '#ccc',
  //         borderBottomWidth: 1,
  //       }}>
  //       <Text style={{fontSize: 20}}>{item.email}1</Text>
  //     </TouchableOpacity>
  //   );
  // };
  render() {
    if (!this.state.users.length > 0) {
      <Text>Lading</Text>;
    }
    console.log('User sekarnag', this.state.users[0]);
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
export default ListChatsScreen;
