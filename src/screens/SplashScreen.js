import React from 'react';
import {View, Text, Image} from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 5000),
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('AuthLoading');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require('../assets/8.png')}
          style={{alignSelf: 'center'}}
        />
        <Text style={styles.textStyles}>MaCh4t</Text>
        <Image
          source={require('../assets/Google_Heroes.gif')}
          style={styles.icon}
        />
      </View>
    );
  }
}

const styles = {
  icon: {
    resizeMode: 'contain',
    height: 200,
    alignSelf: 'center',
  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyles: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
