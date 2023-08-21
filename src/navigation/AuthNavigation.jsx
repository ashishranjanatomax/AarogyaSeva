import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Login';
import ForgetPassword from '../screen/ForgetPassword';
import ForgetPasswordOTP from '../screen/ForgetPasswordOTP';
import NewPassword from '../screen/NewPassword';
import DrawerNavigation from './DrawerNavigation';
import Outcome from '../screen/Outcome';
import Profile from '../dashboard/Profile';
import JobList from '../dashboard/JobList';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPasswordOTP"
        component={ForgetPasswordOTP}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordChange"
        component={NewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OutCome"
        component={Outcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Job List"
        component={JobList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
