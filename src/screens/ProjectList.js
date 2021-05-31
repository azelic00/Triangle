import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '../components/CustomHeader';
import ProjectsHeader from '../components/ProjectsHeader';
import ProjectItem from '../components/ProjectItem';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
      title: 'Projects',
      loading: true,
      projects: [],
      userId: null
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  addProject = () => {
    Actions.push('addProject');
  }

  onCollectionUpdate = (querySnapshot) => {
    const projects = [];
    querySnapshot.forEach((doc) => {
      const { name, date, userId } = doc.data();
      if (userId === firebase.auth().currentUser.uid) {
        projects.push({
          key: doc.id,
          doc,
          name,
          date,
          userId
        }); 
      }
    });
    this.setState({ 
      projects,
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
      return null; // or render a loading icon
    }
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          title={this.state.title}
        />
        <ProjectsHeader />
        <FlatList
          data={this.state.projects}
          renderItem={({ item }) => <ProjectItem {...item} />}
          ItemSeparatorComponent={this.horizontalSeparator}
        />
        <Fab
          style={styles.addButton}
          active={false}
          position='bottomRight'
          onPress={this.addProject}
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
