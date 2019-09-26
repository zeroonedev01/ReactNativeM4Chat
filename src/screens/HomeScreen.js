import React, {Component} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'firebase';
import User from '../../User';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 34.086231;
const LONGITUDE = -118.384939;
import haversine from 'haversine';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      users: [],
    };
  }
  componentDidMount() {
    // console.warn('sdsd', this.state);
    const {coordinate} = this.state;
    this.watchID = Geolocation.watchPosition(
      position => {
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
        firebase
          .database()
          .ref('users/' + User.id)
          .update({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 1500,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );

    //get Data
    let dbRef = firebase.database().ref('users');

    dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid === User.id) {
        User.fullname = person.fullname;
        User.phonenumber = person.phonenumber;
        User.avatar = person.avatar;
        User.email = person.email;
        User.password = person.password;
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
    let ref = firebase.database().ref('users/' + User.id);
    firebase
      .database()
      .ref('.info/connected')
      .on('value', snapshot => {
        if (snapshot.val() === false) {
          return;
        }
        ref
          .onDisconnect()
          .update({status: 'offline'})
          .then(() => {
            ref.update({status: 'online'});
          });
      });
  }

  componentWillUnmount() {
    console.warn('fgf', this.watchID);
    Geolocation.clearWatch(this.watchID);
    Geolocation.stopObserving();
  }
  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  static navigationOptions = {
    header: null,
  };
  render() {
    // console.log(this.watchID);
    // console.warn(this.state.users);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            // cluster={false}
            coordinate={this.state.coordinate}
            pinColor={'blue'}
            title="My Location"
          />
          {this.state.users.map((user, index) => {
            console.log(index, user.status);
            return (
              <Marker
                pinColor={user.status == 'online' ? 'green' : 'red'}
                key={`${index}-${user.status}`}
                title={user.fullname}
                description={user.phonenumber + '|' + user.status}
                coordinate={{
                  latitude: user.lat,
                  longitude: user.long,
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Chat', user);
                }}
              />
            );
          })}
        </MapView>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  viewMap: {
    width: 250,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMap: {
    width: 25,
    height: 25,
    flex: 1,
  },
  imgMaps: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
});
