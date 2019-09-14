import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {Icon, Switch, Button, Left} from 'native-base';
import mainColor from '../components/Constants';
class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.navigation.getParam('fullname'),
      telp: props.navigation.getParam('phonenumber'),
      photo: props.navigation.getParam('avatar'),
      status: props.navigation.getParam('status'),
    };
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    console.warn(this.state);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <ImageBackground
              resizeMode={'cover'}
              style={{flex: 1}}
              source={{
                uri: this.state.photo,
              }}>
              <Left style={styles.backButton}>
                <Button
                  rounded
                  dark
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon style={{color: 'white'}} name="arrow-back" />
                </Button>
              </Left>
              <View style={styles.headerContent}>
                <Text style={styles.name}>{this.state.name}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.card1}>
            <View style={styles.row1}>
              <Text style={styles.text}>Mute</Text>
              <Text style={styles.subText}>Tap to mute user</Text>
            </View>
            <View style={styles.number}>
              <View style={{paddingHorizontal: 5}}>
                <Text style={styles.text}>Custom Notification</Text>
                <Text style={styles.subText}>Tap to change</Text>
              </View>
              <Switch />
            </View>
            <View style={styles.encrypt}>
              <View>
                <Text style={styles.text}>Encryption</Text>
                <Text style={styles.subText}>
                  Messages you send to this chat and calls are secured with end
                  to end Encryption. Tap to verify
                </Text>
              </View>
              <Icon
                type="MaterialIcons"
                name="lock"
                style={{fontSize: 23, padding: 5, color: mainColor}}
              />
            </View>
          </View>

          <View style={styles.card1}>
            <View style={styles.row1}>
              <Text style={styles.green}>Status and Phone</Text>
              <Text style={styles.text}>{this.state.status}</Text>
              <Text style={styles.subText}>January 5</Text>
            </View>
            <View style={styles.number}>
              <View style={{paddingHorizontal: 5}}>
                <Text style={styles.text}>{this.state.telp}</Text>
                <Text style={styles.subText}>Mobile</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="MaterialIcons"
                  name="sms"
                  style={{fontSize: 25, padding: 5, color: mainColor}}
                />
                <Icon
                  type="MaterialIcons"
                  name="call"
                  style={{fontSize: 25, padding: 5, color: mainColor}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 19,
    top: 20,
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 280,
  },
  headerContent: {
    top: '70%',
    padding: 30,
    alignItems: 'flex-start',
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
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
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
  container: {
    flex: 1,

    backgroundColor: '#ebf0f7',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#546de5',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name1: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon1: {
    height: 28,
    width: 28,
    color: mainColor,
  },
  header1: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginTop: 270,
    padding: 20,
  },
  card1: {
    marginTop: 10,
  },
  row1: {
    height: 80,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  encrypt: {
    height: 90,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  number: {
    height: 80,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  subText: {
    fontSize: 14,
    color: '#555',
  },
  green: {
    color: mainColor,
    fontSize: 16,
  },
});

export default FriendProfile;
