import React, {lazy, useState} from 'react';
import {createClient, Provider as UrqlProvider} from 'urql';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Screens/HomeScreen/Home';
import LessonDetail from './Screens/LessonDetailScreen/LessonDetail';
import Programs from './Screens/AllPrograms/AllProgramsScreen';
import ProgramDetail from './Screens/ProgramDetailScreen/ProgramDetail';
import Workouts from './Screens/Workouts/Workouts';
import Meditation from './Screens/MeditationScreen/MeditationScreen';
import Profile from './Screens/ProfileScreen/Profile';
import MeditationPlayer from './Screens/MeditationScreen/MeditationPlayer/MeditationPlayer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import VideoScreen from './Screens/VideoScreen/VideoScreen';

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
  LessonDetail: {
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
  VideoScreen: {
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
  PauseOptionCard: {};
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
        name="LessonDetail"
        component={LessonDetail}
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

const AuthContext = React.createContext({userEmail: 'matt@gmail.com'});

function App() {
  return (
    <UrqlProvider value={client}>
      <AuthContext.Provider value={{userEmail: 'Matt Wellman'}}>
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
              name="VideoScreen"
              component={VideoScreen}
              options={{headerShown: false}}
            />
          </Root.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </UrqlProvider>
  );
}

export default App;
