// App.tsx

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { TermsScreen } from './src/screens/TermsScreen';
import { StarshipFeedScreen } from './src/screens/StarshipFeedScreen';

const App = () => {
  return (
     //<LoginScreen />
     //<TermsScreen navigation={undefined} />
    <StarshipFeedScreen />
  );
};

export default App;