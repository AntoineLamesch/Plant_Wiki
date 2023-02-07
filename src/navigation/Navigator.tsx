import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {TermsScreen}  from '../screens/TermsScreen';
import { StarshipFeedScreen } from '../screens/StarshipFeedScreen';
import {Routes} from './Routes';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Routes.TERMS_SCREEN} component={TermsScreen} />
        <Stack.Screen name={Routes.STARSHIP_FEED_SCREEN} component={StarshipFeedScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;