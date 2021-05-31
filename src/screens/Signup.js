import React, { Component } from 'react';
import { Alert } from 'react-native';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import EntryForm from '../components/EntryForm';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeEmail = (inputEmail) => {
    this.setState({ email: inputEmail });
  }

  onChangePassword = (inputPassword) => {
    this.setState({ password: inputPassword });
  }

  handleSignUp = () => {
    const { email, password } = this.state;
    if (email && password) {
      firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => Actions.loading())
      .catch(error => {
        let errorMessage = error.message;
        alert(errorMessage);
      }); 
    } else {
      Alert.alert('Warning', 'You must enter email and/or password to sign up!');
    }
  }

  goBack() {
    Actions.pop();
  }

	render() {
		return(
			<EntryForm
        onChangeEmail={this.onChangeEmail}
        onChangePassword={this.onChangePassword}
        handleEntry={this.handleSignUp}
        entryFunction={this.goBack}
        entryLabel='Signup'
        exitLabel='Login'
      />	
		)
	}
}
