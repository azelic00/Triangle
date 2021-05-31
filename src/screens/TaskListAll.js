import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '../components/CustomHeader';
import TasksHeader from '../components/TasksHeader';
import TaskItem from '../components/TaskItem';

export default class TaskListAll extends Component {
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

  addTask = () => {
    Actions.push('addTask', {projectId: this.props.projectId, title: 'Add Task'});
  }

  onCollectionUpdate = (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      const { name, status, description, projectId } = doc.data();
      if (projectId === this.props.projectId) {
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
        <Fab
          style={styles.addButton}
          active={false}
          position='bottomRight'
          onPress={this.addTask}
        >
          <Icon type='Ionicons' name='md-add' />
        </Fab>
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
  },
  addButton: {
    backgroundColor: '#1c313a'
  }
});
