import React, {useReducer} from 'react';
import {createClient, Provider as UrqlProvider} from 'urql';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import LessonVideoScreen from './src/Screens/LessonVideoScreen/LessonVideoScreen';
import LoginScreen from './src/Screens/LoginScreen/LoginScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {
  AuthContext,
  authReducer,
  InitialState,
} from './src/Context/AuthContext';
import ErrorScreen from './src/Screens/SplashScreens/ErrorScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigatorScreens from './src/Navigation/BottomNav';
import MeditationPlayer from './src/Screens/MeditationScreen/MeditationPlayer/MeditationPlayer';
import SelfGuidedVideoScreen from './src/Screens/SelfGuidedVideoScreen/SelfGuidedVideoScreen';
import LoadingScreen from './src/Screens/SplashScreens/Loading';

const subscriptionClient = new SubscriptionClient(
  'ws://localhost:4321/graphql',
  {
    // reconnect: true,
  },
);

const client = createClient({
  url: 'http://localhost:4321/graphql',
});

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

const Root = createStackNavigator<RootParams>();

function App() {
  const [state, dispatch] = useReducer(authReducer, InitialState);
  let authState = React.useMemo(() => ({state, dispatch}), [state, dispatch]);
  let {token, loading, membershipStatus} = state;
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <UrqlProvider value={client}>
      <AuthContext.Provider value={authState}>
        <NavigationContainer>
          <Root.Navigator mode="modal">
            {token && membershipStatus ? (
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
