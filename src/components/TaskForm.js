import React, { Component } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Picker, Text, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('tasks');
    this.state = {
      name: '',
      status: 'Todo',
      description: ''
    };
  }

  onSetTaskName = (taskName) => {
    this.setState({ name: taskName })
  }

  onSetTaskStatus = (taskStatus) => {
    this.setState({ status: taskStatus });
  }

  onSetTaskDescription = (taskDescription) => {
    this.setState({ description: taskDescription });
  }

  addTaskItem = () => {
    if (this.state.name && this.props.title === 'Update Task') {
      this.props.update();
      this.ref.add({
        name: this.state.name,
        status: this.state.status,
        description: this.state.description,
        projectId: this.props.projectId
      });
      this.setState({
        name: '',
        status: 'Todo',
        description: ''
      })
      Actions.push('taskListAll');
    }
    else if (this.state.name && this.props.title === 'Add Task') {
      this.ref.add({
        name: this.state.name,
        status: this.state.status,
        description: this.state.description,
        projectId: this.props.projectId
      });
      this.setState({
        name: '',
        status: 'Todo',
        description: ''
      })
      Actions.push('taskListAll');
    } else {
      Alert.alert('Warning', 'Task name can\'t be left empty!');
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
          placeholder='Enter new task name'
          placeholderTextColor='white'
          onChangeText={(value) => this.onSetTaskName(value)}
        />
        <Picker
          selectedValue={this.state.status}
          style={styles.picker}
          onValueChange={(value) => this.onSetTaskStatus(value)}
        >
          <Picker.Item color='black' label="Todo" value="Todo" />
          <Picker.Item color='black' label="Active" value="Active" />
          <Picker.Item color='black' label="Completed" value="Completed" />
        </ Picker>
        <TextInput
          style={styles.inputBoxText}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Enter new task description'
          placeholderTextColor='white'
          onChangeText={(value) => this.onSetTaskDescription(value)}
        />
        <View style={styles.buttonContainer}>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addTaskItem}>
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
  picker: {
    width: 300,
    marginBottom: 15
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
