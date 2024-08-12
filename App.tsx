import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Colors } from './src/constants/Colors';
import AppNavigator from './src/navigation/app-navigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.secondary} />
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
