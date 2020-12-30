// In App.js in a new project


import React, {useState} from 'react';

import { createClient, Provider as UrqlProvider} from 'urql';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Carousel from './Components/Carousel/Carousel';
import ClassDetail from './screens/ClassDetail';
import LoadingScreen from './screens/Loading';
import Programs from './screens/Programs';
import ProgramDetail from './screens/ProgramDetail'
import Workouts from './screens/Workouts'
import Meditation from './screens/Meditation';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn'
import {AuthContext} from './Context/authContext'
import MeditationPlayer from './screens/MeditationPlayer'





const client = createClient({
  url: 'http://localhost:4321/graphql',
});






type HomeStackParams = {
  Home: undefined
  ClassDetail: { courseId: string };

}

type ProgramStackParams ={
  Programs: undefined
  ProgramDetail: {courseName: string}
}

type MeditationStackParams = {
  Meditation: undefined
  MeditationPlayer: {contentUrl: string}
}

const HomeStack = createStackNavigator<HomeStackParams>();
const ProgramStack = createStackNavigator<ProgramStackParams>()
const MeditationStack = createStackNavigator<MeditationStackParams>()
const HomeAndTabStack = createStackNavigator()





const HomeStackRoutes =()=>{
  return(

    <HomeStack.Navigator >
      <HomeStack.Screen 
      name="Home" 
      component={Home} 
      options={{headerShown: false}}
     />
      <HomeStack.Screen 
      
      name="ClassDetail" 
      component={ClassDetail} 
      
      options= {
        ({navigation})=>({
          title: 'Lesson',
         
        })
      }/>
    </HomeStack.Navigator>
 
  )
}


const ProgramStackRoutes =()=>{
  return(

    <ProgramStack.Navigator >
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
    </ProgramStack.Navigator>
 
  )
}

const MeditationStackRoutes =()=>{
  return(

    <MeditationStack.Navigator >
      <MeditationStack.Screen 
      name="Meditation" 
      component={Meditation} 
      options={{headerShown: false}}
     />
      <MeditationStack.Screen 
      
      name="MeditationPlayer" 
      component={MeditationPlayer} 
     // options={{headerShown: false}}

      />
    </MeditationStack.Navigator>
 
  )
}







const Bottom = createBottomTabNavigator()

const BottomNavigatorScreens =()=>{
  return (      
      <Bottom.Navigator >
        <Bottom.Screen name='Home' component={HomeStackRoutes}/>
        <Bottom.Screen name='Programs' component={ProgramStackRoutes}/>
        <Bottom.Screen name='Workouts' component={Workouts}/>
        <Bottom.Screen name='Meditation' component={MeditationStackRoutes}/>
        <Bottom.Screen name='Profile' component={Profile}/>
      </Bottom.Navigator>

  )
}



function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userToken, setUserToken]= useState<string | null>('')
 
  const doThiis = React.useMemo(()=>{
    return {
      sigIn: ()=>{
        setUserToken('abcde')
      },
      signOut: ()=>{
        setUserToken(null)
      }

    }
  },[])




  return (
    <UrqlProvider value={client}>
     <AuthContext.Provider value={{userToken: 'Matt Wellman'}}>
    <NavigationContainer >
      {userToken !== '' ? (<HomeAndTabStack.Navigator headerMode="none">
        <HomeAndTabStack.Screen name="SignedOut" component={BottomNavigatorScreens} />
      </HomeAndTabStack.Navigator>) : (
      <HomeAndTabStack.Navigator headerMode="none">
        <HomeAndTabStack.Screen name="SignedIn" component={BottomNavigatorScreens} />
      </HomeAndTabStack.Navigator>)
}
    </NavigationContainer>

     </AuthContext.Provider>
    
    </UrqlProvider>
  );
}

export default App;