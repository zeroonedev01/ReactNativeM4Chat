import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import User from '../../User';
import firebase from 'firebase';
import firebaseApp from '../configs/firebaseConfig';

const {width, height} = Dimensions.get('window');
export default class ChatScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('email'),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      person: {
        email: props.navigation.getParam('email'),
        photo: '',
      },
      txtMsg: '',
      messages: [],
    };
  }
  componentWillMount() {
    firebaseApp
      .database()
      .ref('messages')
      .child(User.email)
      .child(this.state.person.email)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messages: [...prevState.messages, value.val()],
          };
        });
      });
    firebaseApp
      .database()
      .ref('users/' + User.email)
      .once('value', snap => this.setState({photo: snap.val().photo}));
  }

  renderRow = ({item}) => {
    if (item.from !== User.email) {
      return (
        <View style={styles.eachMsg}>
          <Image
            source={{uri: this.props.navigation.getParam('photo')}}
            style={styles.userPic}
          />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.message}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.message}</Text>
          </View>
          <Image source={{uri: this.state.photo}} style={styles.userPic} />
        </View>
      );
    }
  };
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  sendMessage = async () => {
    if (this.state.txtMsg.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(User.email)
        .child(this.state.person.email)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.txtMsg,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.email,
      };
      updates[
        'messages/' + User.email + '/' + this.state.person.email + '/' + msgId
      ] = message;
      updates[
        'messages/' + this.state.person.email + '/' + User.email + '/' + msgId
      ] = message;
      firebaseApp
        .database()
        .ref()
        .update(updates);
      this.setState({txtMsg: ''});
    }
  };

  render() {
    console.log(this.state.messages);
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          // extraData={this.state}
          data={this.state.messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRow}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              value={this.state.txtMsg}
              onChangeText={this.handleChange('txtMsg')}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage}>
            <Image
              source={{
                uri: 'https://png.icons8.com/small/75/ffffff/filled-sent.png',
              }}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f39c12',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 10,
    backgroundColor: '#f39c12',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#f1c40f',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
});
