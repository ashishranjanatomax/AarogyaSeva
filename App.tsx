import {StyleSheet} from 'react-native';
import React from 'react';
import AuthNavigation from './src/navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
