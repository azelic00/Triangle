import React, { Component } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ProjectForm from '../components/ProjectForm';

import { Actions } from 'react-native-router-flux';

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'AddProject'
    };
  }

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
          title={this.state.title}
        />
        <ProjectForm/>
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
