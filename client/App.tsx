import React, {lazy, useState} from 'react';

import {createClient, Provider as UrqlProvider} from 'urql';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import Workouts from './Screens/Workouts/Workouts';
import SelfGuidedVideoScreen from './Screens/SelfGuidedVideoScreen/SelfGuidedVideoScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCalendar,
  faDumbbell,
  faBalanceScale,
  faUserCircle,
  faBackward,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import CategorySelfGuided from './Screens/Workouts/WorkoutComponents/CategorySelfGuided';
import CategoryLessons from './Screens/Workouts/WorkoutComponents/CategoryLessons';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  PauseOptionCard: {};
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
