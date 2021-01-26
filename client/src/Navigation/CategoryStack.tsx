import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryLessons from '../Screens/Workouts/WorkoutComponents/CategoryLessons';
import WorkoutTabs from './WorkoutsStack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const CategoryStackRoutes = createStackNavigator();

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

export default CategoryStack;
