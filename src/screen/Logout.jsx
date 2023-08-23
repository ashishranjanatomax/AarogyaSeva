// Logout.js

import React, {useEffect, useState} from 'react';
import {View, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const Logout = ({navigation}) => {
  const [loginTime, setLoginTime] = useState(new Date());
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  useEffect(() => {
    const locationWatcher = Geolocation.watchPosition(
      position => {
        // Handle location updates
      },
      error => {
        // Handle location permission being turned off
        Alert.alert(
          'Location Permission Turned Off',
          'You are being logged out because location permission is turned off.',
          [
            {
              text: 'OK',
              onPress: handleLogout,
            },
          ],
        );
      },
    );

    return () => {
      Geolocation.clearWatch(locationWatcher);
    };
  }, []);

  useEffect(() => {
    const logoutTimeout = setTimeout(() => {
      const currentTime = new Date();
      const timeDifference = currentTime - loginTime;
      const millisecondsIn9Hours = 9 * 60 * 60 * 1000;

      if (timeDifference >= millisecondsIn9Hours) {
        handleLogout();
      }
    }, 1000);

    return () => {
      clearTimeout(logoutTimeout);
    };
  }, [loginTime]);

  const showLogoutConfirmation = () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: handleLogout,
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Logout" onPress={showLogoutConfirmation} />
    </View>
  );
};

export default Logout;
