import React, {lazy, useState} from 'react';

import {createClient, Provider as UrqlProvider} from 'urql';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackground,
  HeaderTitle,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Home from './Screens/HomeScreen/Home';
import LessonDetail from './Screens/LessonDetailScreen/LessonDetail';
import LessonVideoScreen from './Screens/LessonVideoScreen/LessonVideoScreen';
import Meditation from './Screens/MeditationScreen/MeditationScreen';
import Profile from './Screens/ProfileScreen/Profile';
import Programs from './Screens/AllPrograms/AllProgramsScreen';
import ProgramDetail from './Screens/ProgramDetailScreen/ProgramDetail';
import MeditationPlayer from './Screens/MeditationScreen/MeditationPlayer/MeditationPlayer';
import SelfGuidedVideoScreen from './Screens/SelfGuidedVideoScreen/SelfGuidedVideoScreen';
import Workouts from './Screens/Workouts/Workouts';
import WorkoutCards from './Screens/Workouts/WorkoutComponents/WorkoutCards';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import WorkoutCard from './Screens/Workouts/WorkoutComponents/WorkoutCards';

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
  PauseOptionCard: {};
};

const HomeStack = createStackNavigator<HomeStackParams>();
const ProgramStack = createStackNavigator<ProgramStackParams>();
const LessonByCategoryStack = createStackNavigator();
const WorkoutsTab = createMaterialTopTabNavigator();
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

const WorkoutLessonsByCategoryStack = () => {
  return (
    <LessonByCategoryStack.Navigator>
      <LessonByCategoryStack.Screen
        name="WorkoutCategories"
        component={Workouts}
        options={{headerShown: false}}
      />
      <LessonByCategoryStack.Screen
        name="CategoryLessons"
        component={WorkoutCard}
        options={{headerShown: true}}
      />
    </LessonByCategoryStack.Navigator>
  );
};

const WorkoutsStackRoutes = () => {
  return (
    <WorkoutsTab.Navigator
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
      <WorkoutsTab.Screen
        options={{title: 'Classes'}}
        name="Workouts"
        component={WorkoutLessonsByCategoryStack}
      />
      <WorkoutsTab.Screen
        options={{title: 'Self-Guided'}}
        name="CategorySelfGuided"
        component={WorkoutCards}
      />
    </WorkoutsTab.Navigator>
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
        component={WorkoutsStackRoutes}
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
              name="LessonVideoScreen"
              component={LessonVideoScreen}
              options={{headerShown: false}}
            />
            <Root.Screen
              name="SelfGuidedVideoScreen"
              component={SelfGuidedVideoScreen}
              options={{headerShown: false}}
            />
          </Root.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </UrqlProvider>
  );
}

export default App;
