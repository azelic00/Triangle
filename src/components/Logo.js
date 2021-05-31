import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class Logo extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
          style={styles.image}
          source={require('../assets/logo.png')}/>
        <Text style={styles.logoText}>Welcome to FirebaseTriangle</Text>	
  		</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 70
  },
  logoText: {
  	marginVertical: 15,
  	fontSize: 18,
  	color: 'rgba(255, 255, 255, 0.7)'
  }
});
