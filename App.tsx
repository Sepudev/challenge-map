import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import MapView from './src/views/map-view';
import { Colors } from './src/constants/Colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.secondary} />
      <MapView />
    </SafeAreaView>
  );
}

export default App;
