import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {TermsScreen}  from '../screens/TermsScreen';
import { MainScreen } from '../screens/MainScreen';
import DetailsScreen  from '../screens/DetailsScreen';
import {Routes} from './Routes';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Routes.MAIN_SCREEN} component={MainScreen} />
        <Stack.Screen name={Routes.DETAILS_SCREEN} component={DetailsScreen} />
        <Stack.Screen name={Routes.TERMS_SCREEN} component={TermsScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;