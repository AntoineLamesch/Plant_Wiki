// App.tsx

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { TermsScreen } from './src/screens/TermsScreen';
import { StarshipFeedScreen } from './src/screens/MainScreen';
import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
     //<LoginScreen />
     //<TermsScreen navigation={undefined} />
    //<StarshipFeedScreen />
    <Navigator/>
  );
};

export default App;