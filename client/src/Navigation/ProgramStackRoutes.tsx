import React from 'react';
import Programs from '../Screens/AllPrograms/AllProgramsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LessonDetail from '../Screens/LessonDetailScreen/LessonDetail';
import ProgramDetail from '../Screens/ProgramDetailScreen/ProgramDetail';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

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

const ProgramStack = createStackNavigator<ProgramStackParams>();

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

export default ProgramStackRoutes;
