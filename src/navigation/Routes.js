import React, { Component } from 'react';
import { YellowBox, Text } from 'react-native';
import { ActionConst, Router, Stack, Scene, Actions } from 'react-native-router-flux';

import Loading from '../components/Loading';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ProjectList from '../screens/ProjectList';
import AddProject from '../screens/AddProject';
import TaskListAll from '../screens/TaskListAll';
import TaskListElse from '../screens/TaskListElse';
import AddTask from '../screens/AddTask';

const TabIcon = ({title}) => {
	return(
		<Text style={{color: 'black'}}>{title}</Text>
	);
}

export default class Routes extends Component {
	render() {
		YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
		
		return (
			<Router>
        <Stack key='root' hideNavBar={true}>
          <Scene key='login' component={Login} initial={true} type={ActionConst.RESET} />
          <Scene key='signup' component={Signup} />
					<Scene key='loading' component={Loading} />
					<Scene key='projectList' component={ProjectList} type={ActionConst.RESET} />
					<Scene key='addProject' component={AddProject} />
					<Scene
						key='tabBar'
						tabs={true}
						showLabel={false}
						activeBackgroundColor='yellow'
					>
						<Scene key='all' title='All' icon={TabIcon} hideNavBar={true}>
							<Scene key='taskListAll' component={TaskListAll} />
						</Scene>
						<Scene key='todo' title='Todo' icon={TabIcon} hideNavBar={true}>
							<Scene key='taskListTodo' component={TaskListElse} />
						</Scene>
						<Scene key='active' title='Active' icon={TabIcon} hideNavBar={true}>
							<Scene key='taskListActive' component={TaskListElse} />
						</Scene>
						<Scene key='completed' title='Completed' icon={TabIcon} hideNavBar={true}>
							<Scene key='taskListCompleted' component={TaskListElse} />
						</Scene>
					</Scene>
					<Scene key='addTask' component={AddTask} />
        </Stack>
			</Router>
		)
	}
}
