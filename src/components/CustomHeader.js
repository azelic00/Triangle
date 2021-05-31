import React, { Component } from 'react';
import { Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => Actions.loading())
      .catch(error => {
        let errorMessage = error.message;
        Alert.alert('Warning', errorMessage);
      });
  }

  userInfo = () => {
    if (this.state.currentUser) {
      Alert.alert('Current user', 'Currently logged user is ' + this.state.currentUser.email);
    }
  }

  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser });
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity style={styles.user} onPress={this.userInfo}>
          <Icon style={styles.icon} type='Entypo' name='user' />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleLogout}>
          <Icon style={styles.icon} type='MaterialCommunityIcons' name='logout' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1c313a',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    color:'white'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  user: {
    marginLeft: 125
  }
});
