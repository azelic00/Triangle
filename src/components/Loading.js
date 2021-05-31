import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../assets/Styles';

import firebase from 'react-native-firebase';
import { Actions } from '../../node_modules/react-native-router-flux';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }
  componentDidMount() {
    this.unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        user ? Actions.projectList() : Actions.login();
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
