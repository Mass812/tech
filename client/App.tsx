// In App.js in a new project

import * as React from 'react';

import { createClient, Provider } from 'urql';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Carousel from './components/Carousel/Carousel';
import Lessons from './screens/Lessons';

const client = createClient({
  url: 'http://localhost:4321/graphql',
});

const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Lessons: { courseId: string };
}


const HomeStack =()=>{
  return(

    <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={({ navigation }) => ({
    title: 'Fitness',
        
  })}/>
      <Stack.Screen name="Lessons" component={Lessons} 
      options= {
        ({navigation})=>({
          title: 'Lesson'
        })
      }/>
    </Stack.Navigator>
 
  )
}

const Bottom = createBottomTabNavigator()
const TabNavigator =()=>{
  return (

      
      <Bottom.Navigator>
        <Bottom.Screen name='Home' component={HomeStack}/>
        <Bottom.Screen name='Carousel' component={Carousel}/>
      </Bottom.Navigator>

  )
}



function App() {
  return (
    <Provider value={client}>
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Profile" component={TabNavigator} />
      
      </Stack.Navigator>
    </NavigationContainer>
    
    </Provider>
  );
}

export default App;