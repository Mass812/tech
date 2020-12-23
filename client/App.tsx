// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createClient, Provider } from 'urql';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'





const client = createClient({
  url: 'http://localhost:4321/graphql',
});

const Stack = createStackNavigator();

function App() {
  return (
    <Provider value={client}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;