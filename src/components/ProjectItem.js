import React, { Component } from 'react';
import { Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class ProjectItem extends Component {
  onName = () => {
    Actions.push('taskListCompleted', {projectId: this.props.doc.ref.id});
    Actions.push('taskListActive', {projectId: this.props.doc.ref.id});
    Actions.push('taskListTodo', {projectId: this.props.doc.ref.id});
    Actions.push('taskListAll', {projectId: this.props.doc.ref.id});
  }

  onDate = () => {
    let leftDays = 0;
    let dueDate = this.props.date.getDate() + this.props.date.getMonth() * 30 + this.props.date.getFullYear() * 365;
    let currentDate = new Date().getDate() + new Date().getMonth() * 30 + new Date().getFullYear() * 365;
    leftDays = dueDate - currentDate;
    if (leftDays >= 0) {
      Alert.alert('Project deadline', `Your project deadline is in ${leftDays} days!`);
    } else {
      leftDays = Math.abs(leftDays);
      Alert.alert('Project deadline', `Your project is ${leftDays} days over the deadline!`);
    }
  }

  onDelete = () => {
    this.props.doc.ref.delete();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.commonView}>
          <TouchableOpacity onPress={this.onName}>
            <Text style={styles.textItem}>
              {this.props.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commonView}>
          <TouchableOpacity onPress={this.onDate}>
            <Text style={styles.textItem}>
              {this.props.date.toString().slice(0, 15)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commonView}>
          <TouchableOpacity onPress={this.onDelete}>
            <Icon type='MaterialIcons' name='delete' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textItem: {
    color: 'black',
    fontSize: 16
  }
});