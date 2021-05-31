import React, { Component } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DatePicker } from 'native-base';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('projects');
    this.state = {
      name: '',
      date: null
    };
  }

  onSetProjectName = (projectName) => {
    this.setState({ name: projectName })
  }

  onSetProjectDate = (dueDate) => {
    this.setState({ date: dueDate });
  }

  addProjectItem = () => {
    if (this.state.name && this.state.date) {
      this.ref.add({
        name: this.state.name,
        date: this.state.date,
        userId: firebase.auth().currentUser.uid
      });
      this.setState({
        name: '',
        date: ''
      })
      Actions.push('projectList');
    } else {
      Alert.alert('Warning', 'Project name and/or due date can\'t be left empty!');
    }
  }

  onCancel = () => {
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.inputBoxText}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Enter new project name'
          placeholderTextColor='white'
          onChangeText={(value) => this.onSetProjectName(value)}
        />
        <View style={styles.dateBox}>
          <DatePicker
            minimumDate={new Date()}
            placeHolderText='Click to set project due date'
            placeHolderTextStyle={styles.datePicker}
            textStyle={styles.datePicker}
            onDateChange={(value) => this.onSetProjectDate(value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addProjectItem}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#455a64',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBoxText: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15
  },
  dateBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 16
  },
  datePicker: {
    color: 'white',
    alignSelf: 'center'
  },
  buttonContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  button: {
    width: 100,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});
