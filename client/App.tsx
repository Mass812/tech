import React, {lazy, useState} from 'react';

import {createClient, Provider as UrqlProvider} from 'urql';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import ClassDetail from './Screens/ClassDetail';
import Programs from './Screens/Programs';
import ProgramDetail from './Screens/ProgramDetail';
import Workouts from './Screens/Workouts';
import Meditation from './Screens/Meditation';
import Profile from './Screens/Profile';
import {AuthContext} from './Context/authContext';
import MeditationPlayer from './Screens/MeditationPlayer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import LessonPlayer from './Screens/LessonPlayer';

const client = createClient({
  url: 'http://localhost:4321/graphql',
});

type HomeStackParams = {
  Home: undefined;
};

type ProgramStackParams = {
  Programs: undefined;
  ProgramDetail: {
    courseName: string;
    instructor: string;
    lessonNumber: string;
    weekNumber: string;
  };
  ClassDetail: {
    courseName: string;
    instructor: string;
    lessonNumber: string;
    weekNumber: string;
  };
};

type MeditationStackParams = {
  Meditation: undefined;
};

type RootParams = {
  LessonPlayer: {
    contentUrl: string;
    weekNumber: string;
    lessonNumber: string;
    courseName: string;
    instructor: string;
    title: string;
  };
  RootHome: {};
  MeditationPlayer: {
    courseName: string;
    instructor: string;
    lessonNumber: string;
    weekNumber: string;
  };
};

const HomeStack = createStackNavigator<HomeStackParams>();
const ProgramStack = createStackNavigator<ProgramStackParams>();
const MeditationStack = createStackNavigator<MeditationStackParams>();
const Bottom = createBottomTabNavigator();
const Root = createStackNavigator<RootParams>();

const HomeStackRoutes = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
        name="ClassDetail"
        component={ClassDetail}
        options={({navigation}) => ({
          title: 'Class',
        })}
      /> */}
    </HomeStack.Navigator>
  );
};

const ProgramStackRoutes = () => {
  return (
    <ProgramStack.Navigator>
      <ProgramStack.Screen
        name="Programs"
        component={Programs}
        options={{headerShown: false}}
      />
      <ProgramStack.Screen
        name="ProgramDetail"
        component={ProgramDetail}
        // options={{headerShown: false}}
      />
      <ProgramStack.Screen
        name="ClassDetail"
        component={ClassDetail}
        options={({navigation}) => ({
          title: 'Class',
        })}
      />
    </ProgramStack.Navigator>
  );
};

const MeditationStackRoutes = () => {
  return (
    <MeditationStack.Navigator>
      <MeditationStack.Screen
        name="Meditation"
        component={Meditation}
        options={{headerShown: false}}
      />
    </MeditationStack.Navigator>
  );
};

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
        component={Workouts}
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

function App() {
  return (
    <UrqlProvider value={client}>
      <AuthContext.Provider value={{userToken: 'Matt Wellman'}}>
        <NavigationContainer>
          <Root.Navigator mode="modal">
            <Root.Screen
              name="RootHome"
              component={BottomNavigatorScreens}
              options={{headerShown: false}}
            />
            <Root.Screen
              name="MeditationPlayer"
              component={MeditationPlayer}
              options={{headerShown: false}}
            />
            <Root.Screen
              name="LessonPlayer"
              component={LessonPlayer}
              options={{headerShown: false}}
            />
          </Root.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </UrqlProvider>
  );
}

export default App;
