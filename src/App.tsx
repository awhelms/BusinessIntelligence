/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import 'react-native-gesture-handler';
import {BusinessesProvider} from './context';
import {RootNav} from './navigation';

const App = () => {
  return (
    <BusinessesProvider>
      <RootNav />
    </BusinessesProvider>
  );
};

export default App;
