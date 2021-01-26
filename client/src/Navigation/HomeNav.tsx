import React from 'react';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/HomeScreen/Home';

type HomeStackParams = {
  Home: undefined;
};

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

const HomeStack = createStackNavigator<HomeStackParams>();

export const HomeStackRoutes = () => {
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
