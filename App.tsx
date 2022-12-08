import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './src/Navigation/RootNavigation';
import { store } from './src/Store/store';

const App = () => { 
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
