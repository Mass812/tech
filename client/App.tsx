import React, {lazy, useEffect, useReducer, useState} from 'react';

import {createClient, Provider as UrqlProvider} from 'urql';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './src/Screens/HomeScreen/Home';
import LessonDetail from './src/Screens/LessonDetailScreen/LessonDetail';
import LessonVideoScreen from './src/Screens/LessonVideoScreen/LessonVideoScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import Meditation from './src/Screens/MeditationScreen/MeditationScreen';
import Profile from './src/Screens/ProfileScreen/Profile';
import Programs from './src/Screens/AllPrograms/AllProgramsScreen';
import ProgramDetail from './src/Screens/ProgramDetailScreen/ProgramDetail';
import MeditationPlayer from './src/Screens/MeditationScreen/MeditationPlayer/MeditationPlayer';
import Workouts from './src/Screens/Workouts/Workouts';
import SelfGuidedVideoScreen from './src/Screens/SelfGuidedVideoScreen/SelfGuidedVideoScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
  faBackward,
  faChevronLeft,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import CategorySelfGuided from './src/Screens/Workouts/WorkoutComponents/CategorySelfGuided';
import CategoryLessons from './src/Screens/Workouts/WorkoutComponents/CategoryLessons';
import LoadingScreen from './src/Screens/SplashScreens/Loading';

import {
  AuthContext,
  authReducer,
  InitialState,
} from './src/Context/AuthContext';
import ErrorScreen from './src/Screens/SplashScreens/ErrorScreen';
const client = createClient({
  url: 'http://localhost:4321/graphql',
});

const minimalistHeader = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTitle: '',
  headerBackTitleStyle: {color: 'white'},
  headerLeftContainerStyle: {
    // backgroundColor: 'red',
    marginLeft: 20,
    marginTop: 20,
  },
  headerBackImage: () => (
    <FontAwesomeIcon icon={faChevronLeft} color={'white'} size={30} />
  ),
};
const minimalistMeditationsHeader = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTitle: '',
  headerBackTitleStyle: {color: 'white'},
  headerLeftContainerStyle: {
    // backgroundColor: 'red',
    marginLeft: 20,
    marginTop: 20,
  },
  headerBackImage: () => (
    <FontAwesomeIcon icon={faArrowCircleLeft} color={'white'} size={30} />
  ),
};

const minimalistHeaderButtonBlack = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTransparent: false,
  headerTitle: '',
  headerBackTitleStyle: {color: 'white'},
  headerLeftContainerStyle: {
    // backgroundColor: 'red',
    marginLeft: 20,
    marginTop: 0,
  },
  headerBackImage: () => (
    <FontAwesomeIcon icon={faChevronLeft} color={'black'} size={20} />
  ),
};

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
  LessonVideoScreen: {
    contentUrl: string;
    weekNumber: string;
    lessonNumber: string;
    courseName: string;
    instructor: string;
    title: string;
  };
  SelfGuidedVideoScreen: {};
  RootHome: {};
  MeditationPlayer: {
    courseName: string;
    instructor: string;
    lessonNumber: string;
    weekNumber: string;
  };
  ErrorScreen: {};
  PauseOptionCard: {};
  Login: {};
};

const HomeStack = createStackNavigator<HomeStackParams>();
const ProgramStack = createStackNavigator<ProgramStackParams>();
const CategoryStackRoutes = createStackNavigator();
const WorkoutsTabRoutes = createMaterialTopTabNavigator();
const MeditationStack = createStackNavigator<MeditationStackParams>();
const Bottom = createBottomTabNavigator();
const Root = createStackNavigator<RootParams>();

const HomeStackRoutes = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={minimalistHeader}
      />
    </HomeStack.Navigator>
  );
};

const CategoryStack = () => {
  return (
    <CategoryStackRoutes.Navigator>
      <CategoryStackRoutes.Screen
        name="WorkoutCategories"
        component={WorkoutTabs}
        options={minimalistHeader}
      />
      <CategoryStackRoutes.Screen
        name="CategoryLessons"
        component={CategoryLessons}
        options={minimalistHeaderButtonBlack}
      />
    </CategoryStackRoutes.Navigator>
  );
};

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
        options={minimalistHeader}
      />
      <ProgramStack.Screen
        name="LessonDetail"
        component={LessonDetail}
        options={minimalistHeader}
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

function App() {
  const [state, dispatch] = useReducer(authReducer, InitialState);
  let authState = React.useMemo(() => ({state, dispatch}), [state, dispatch]);
  let {token, loading} = state;
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UrqlProvider value={client}>
      <AuthContext.Provider value={authState}>
        <NavigationContainer>
          <Root.Navigator mode="modal">
            {token ? (
              <>
                <Root.Screen
                  name="RootHome"
                  component={BottomNavigatorScreens}
                  options={{headerShown: false}}
                />
                <Root.Screen
                  name="MeditationPlayer"
                  component={MeditationPlayer}
                  options={minimalistMeditationsHeader}
                />
                <Root.Screen
                  name="LessonVideoScreen"
                  component={LessonVideoScreen}
                  options={{headerShown: false}}
                />
                <Root.Screen
                  name="SelfGuidedVideoScreen"
                  component={SelfGuidedVideoScreen}
                  options={{headerShown: false}}
                />
                <Root.Screen
                  name="ErrorScreen"
                  component={ErrorScreen}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <Root.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            )}
          </Root.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </UrqlProvider>
  );
}

export default App;
