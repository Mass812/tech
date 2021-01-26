import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Workouts from '../Screens/Workouts/Workouts';
import CategorySelfGuided from '../Screens/Workouts/WorkoutComponents/CategorySelfGuided';

const WorkoutsTabRoutes = createMaterialTopTabNavigator();

const WorkoutTabs = () => {
  return (
    <WorkoutsTabRoutes.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 14, fontWeight: '500', letterSpacing: 3},
        tabStyle: {minWidth: 200},
        indicatorStyle: {
          backgroundColor: 'black',
        },
        style: {
          paddingTop: 50,
          alignContent: 'center',
        },
      }}>
      <WorkoutsTabRoutes.Screen
        options={{title: 'Classes'}}
        name="Workouts"
        component={Workouts}
      />
      <WorkoutsTabRoutes.Screen
        options={{title: 'Self-Guided'}}
        name="CategorySelfGuided"
        component={CategorySelfGuided}
      />
    </WorkoutsTabRoutes.Navigator>
  );
};

export default WorkoutTabs;
