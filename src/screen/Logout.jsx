import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../component/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Axios from 'axios';
const Logout = ({ navigation, userData }) => {
  const [loginTime, setLoginTime] = useState(new Date());
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLogout = async () => {
    try {
      try {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position, "Line 17");
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log(longitude, "Line 22");
            console.log(latitude, "Line 23");
          }
        );
        console.log("Line 26",userData.id,latitude,longitude)
        const loginTimeResponse = await Axios.post(
          'https://crm.aarogyaseva.co.in/api/logouttime',
          {
            
            employeeid: userData.id,
            latitude: latitude,
            longitude: longitude,
          },
        );
       
        // await AsyncStorage.removeItem('userData');
        navigation.replace('Login');
        console.log(loginTimeResponse.data, "Line 39");
      } catch (error) {
        console.log(
          'Error sending employeeId to logout Time to API Line 31',
          error.message,
        );
      }

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

  const autologout = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position, "Line 68");
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(longitude, "Line 54");
        console.log(latitude, "Line 55");
      }
    );
    try {
      console.log("LIne 59",userData.id,latitude,longitude)
      const loginTimeResponse = await Axios.post(
        'https://crm.aarogyaseva.co.in/api/logouttime',
        {
          
          employeeid: userData.id,
          latitude: latitude,
          longitude: longitude,
        },
      );
     
      // await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
      console.log(loginTimeResponse.data, "Line 109");
    } catch (error) {
      console.log(
        'Error sending employeeId to logout Time to API Line 112',
        error.message,
      );
    }
  }

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

  // console.log(latitude, "Line 94");
  // console.log(longitude, "Line 95");
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

  const delayInMilliseconds = 1 * 60 * 1000; // 3 minutes in milliseconds
  setTimeout(autologout, delayInMilliseconds);
  return (
    <View>
      <Header navigation={navigation} />
      <Button title="Logout" onPress={showLogoutConfirmation} />
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})