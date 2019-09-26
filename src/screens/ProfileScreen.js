import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {
  Icon,
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  Label,
} from 'native-base';
import mainColor from '../components/Constants';
import User from '../../User';
import firebase from 'firebase';
class UserProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: User.fullname,
      hp: User.phonenumber,
      avatar: User.avatar,
      // password: User.password,
      isloading: false,
    };
  }
  submit = () => {
    if (
      this.state.fullname === '' ||
      this.state.hp === '' ||
      this.state.avatar === ''
    ) {
      ToastAndroid.show('Please FIll all field', ToastAndroid.LONG);
    } else if (this.state.hp.length < 10 || this.state.hp.length > 13) {
      ToastAndroid.show(
        'Phone Number minimum 10 character and maximum 13 character',
        ToastAndroid.LONG,
      );
    } else {
      this.setState({isLoading: true});
      firebase
        .database()
        .ref('users/' + User.id)
        .update({
          fullname: this.state.fullname,
          phonenumber: this.state.hp,
          avatar: this.state.avatar,
          // password: this.state.password.trim(),
        });
      User.fullname = this.state.fullname;
      User.phonenumber = this.state.hp;
      User.avatar = this.state.avatar;
      // User.password = this.state.password.trim();
      this.setState({
        fullname: User.fullname,
        hp: User.phonenumber,
        avatar: User.avatar,
        // password: User.password,
        isLoading: false,
      });
      ToastAndroid.show('Data berhasil di update', ToastAndroid.LONG);
    }
  };
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  handleLogOut = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('uavatar');
    firebase
      .database()
      .ref('users/' + User.id)
      .update({status: 'offline'});
    this.props.navigation.navigate('Auth');
  };
  render() {
    // console.warn(this.state);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <ImageBackground
              blurRadius={3}
              resizeMode={'cover'}
              style={{flex: 1}}
              source={{
                uri: 'https://wallpapercave.com/wp/wp4190888.jpg',
              }}>
              <View style={styles.headerContent}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.state.avatar,
                  }}
                />

                <Text style={styles.name}>{this.state.fullname}</Text>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={this.handleLogOut}>
                  <Text style={styles.followButtonText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <Content style={{paddingHorizontal: 30, marginTop: 30}}>
            <Item floatingLabel style={[styles.itemset, {marginTop: 10}]}>
              <Label>Fullname</Label>
              <Icon
                type="FontAwesome5"
                name="user-edit"
                style={{color: mainColor}}
              />
              <Input
                placeholder="Fullname"
                value={this.state.fullname}
                onChangeText={this.handleChange('fullname')}
              />
            </Item>
            <Item floatingLabel style={styles.itemset}>
              <Label>Phone Number</Label>
              <Icon
                type="MaterialIcons"
                name="perm-phone-msg"
                style={{color: mainColor}}
              />
              <Input
                placeholder="Phone Number"
                value={this.state.hp}
                onChangeText={this.handleChange('hp')}
              />
            </Item>
            <Item floatingLabel style={styles.itemset}>
              <Label>Avatar</Label>
              <Icon
                type="MaterialCommunityIcons"
                name="face-profile"
                style={{color: mainColor}}
              />
              <Input
                placeholder="Url Avatar"
                value={this.state.avatar}
                onChangeText={this.handleChange('avatar')}
              />
            </Item>
            {/* <Item floatingLabel style={styles.itemset}>
              <Label>Password</Label>
              <Icon
                type="MaterialCommunityIcons"
                name="account-key"
                style={{color: mainColor}}
              />
              <Input
                placeholder="Password"
                value={this.state.password}
                onChangeText={this.handleChange('password')}
              />
            </Item> */}

            <Button block rounded onPress={this.submit}>
              {this.state.isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{color: 'white', fontWeight: '500'}}>Edit</Text>
              )}
            </Button>
          </Content>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 280,
  },
  itemset: {
    marginBottom: 10,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: mainColor,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: 'grey',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  container: {
    flex: 1,

    backgroundColor: '#ffffff',
  },
  login: {
    backgroundColor: '#5ba4e5',
    width: '70%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: mainColor,
  },
  followButtonText: {
    color: 'black',
    fontSize: 12,
  },
});

export default UserProfileView;
