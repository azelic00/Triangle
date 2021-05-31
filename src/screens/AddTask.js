import React, { Component } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import TaskForm from '../components/TaskForm';

import { Actions } from 'react-native-router-flux';

export default class AddTask extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.refresh();
    return true;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title={this.props.title}
        />
        <TaskForm
          title={this.props.title}
          projectId={this.props.projectId}
          update={this.props.update}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1
  }
});
