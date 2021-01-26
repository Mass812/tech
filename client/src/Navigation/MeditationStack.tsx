import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Meditation from '../Screens/MeditationScreen/MeditationScreen';

type MeditationStackParams = {
  Meditation: undefined;
};

const MeditationStack = createStackNavigator<MeditationStackParams>();

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

export default MeditationStackRoutes;
