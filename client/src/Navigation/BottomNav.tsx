import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Screens/ProfileScreen/Profile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import ProgramStackRoutes from './ProgramStackRoutes';
import {HomeStackRoutes} from './HomeNav';
import CategoryStack from './CategoryStack';
import MeditationStackRoutes from './MeditationStack';

const Bottom = createBottomTabNavigator();

const BottomNavigatorScreens = () => {
  return (
    <Bottom.Navigator lazy={false}>
      <Bottom.Screen
        name="Home"
        component={HomeStackRoutes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faHome} size={26} color={'grey'} />
          ),
        }}
      />
      <Bottom.Screen
        name="Programs"
        component={ProgramStackRoutes}
        options={{
          tabBarLabel: 'Programs',
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faCalendar} size={26} color={'grey'} />
          ),
        }}
      />
      <Bottom.Screen
        name="Workouts"
        component={CategoryStack}
        options={{
          tabBarLabel: 'Workouts',
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faDumbbell} size={26} color={'grey'} />
          ),
        }}
      />
      <Bottom.Screen
        name="Meditation"
        component={MeditationStackRoutes}
        options={{
          tabBarLabel: 'Meditations',
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faBalanceScale} size={26} color={'grey'} />
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUserCircle} size={26} color={'grey'} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigatorScreens;
