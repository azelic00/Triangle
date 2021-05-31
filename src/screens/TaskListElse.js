import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '../components/CustomHeader';
import TasksHeader from '../components/TasksHeader';
import TaskItem from '../components/TaskItem';

export default class TaskListElse extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('tasks');
    this.unsubscribe = null;
    this.state = {
      title: 'Tasks',
      loading: true,
      tasks: [],
      projectId: null
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      const { name, status, description, projectId } = doc.data();
      if (Actions.currentScene.toString().slice(8) === status && projectId === this.props.projectId) {
        tasks.push({
          key: doc.id,
          doc,
          name,
          status,
          description,
          projectId
        }); 
      }
    });
    this.setState({ 
      tasks,
      loading: false
    });
  }

  horizontalSeparator = () => {
    return (
      <View style={styles.horizontalSeparator}/>
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          title={this.state.title}
        />
        <TasksHeader />
        <FlatList
          data={this.state.tasks}
          renderItem={({ item }) => <TaskItem {...item} />}
          ItemSeparatorComponent={this.horizontalSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  horizontalSeparator: {
    backgroundColor: 'black',
    height: 1,
    margin: 5
  }
});
