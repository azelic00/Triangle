import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TasksHeader extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.commonView}>
          <Text style={styles.textItem}>
            NAME
          </Text>
        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.commonView}>
          <Text style={styles.textItem}>
            STATUS
          </Text>
        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.commonView}>
          <Text style={styles.textItem}>
            INFO
          </Text>
        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.commonView}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#455a64',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalSeparator: {
    backgroundColor: 'white',
    width: 2,
    height: 23
  },
  textItem: {
    color: 'white',
    fontSize: 15
  }
});