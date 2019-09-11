import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
class ListChatsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ListChatsScreen</Text>
        <Spinner color="red" />
      </View>
    );
  }
}
export default ListChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
