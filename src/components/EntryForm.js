import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../assets/Styles';

import Logo from '../components/Logo';

export default class EntryForm extends Component {
	render() {
		return(
			<View style={styles.entryFormContainer}>
        <Logo />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Email'
          placeholderTextColor='white'
          keyboardType='email-address'
          value={this.props.email}
          onChangeText={this.props.onChangeEmail}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Password'
          placeholderTextColor='white'
          secureTextEntry={true}
          value={this.props.password}
          onChangeText={this.props.onChangePassword}
        />
        <TouchableOpacity style={styles.button} onPress={this.props.handleEntry}>
          <Text style={styles.buttonText}>{this.props.entryLabel}</Text>
        </TouchableOpacity>
        <View style={styles.entryFormTextContainer}>
          <Text style={styles.entryFormText}>Don't have an account yet?</Text>
          <TouchableOpacity transparent={true} onPress={this.props.entryFunction}>
            <Text style={styles.entryFormButton}> {this.props.exitLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>	
		)
	}
}
