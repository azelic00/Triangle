import React, { Component } from 'react';
import { Alert, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class TaskItem extends Component {
  onUpdateTask = () => {
    Actions.push('addTask', {projectId: this.props.projectId, title: 'Update Task', update: this.onDelete});
  }

  onDescription = () => {
    Alert.alert('Task description', this.props.description);
  }

  onDelete = () => {
    this.props.doc.ref.delete();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.commonView}>
          <TouchableOpacity onPress={this.onUpdateTask}>
            <Text style={styles.textItem}>
              {this.props.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commonView}>
          <Text style={styles.textItem}>
            {this.props.status}
          </Text>
        </View>
        <View style={styles.commonView}>
          <TouchableOpacity onPress={this.onDescription}>
            <Text style={styles.textItem}>
              <Icon type='MaterialCommunityIcons' name='dots-horizontal' />
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