import { StyleSheet, Text, View ,Button,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '../component/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Axios from 'axios';
const Logout = ({navigation,userData}) => {
  const [loginTime, setLoginTime] = useState(new Date());
  const handleLogout = async () => {
    try {
      try {
        // console.log("Line 92",userData.id);
        const loginTimeResponse = await Axios.post(
          'https://crm.aarogyaseva.co.in/api/logouttime',
          {
            employeeid: userData.id,
          },
        );

        console.log(loginTimeResponse.data,"Line 109");
      } catch (error) {
        console.log(
          'Error sending employeeId to logout Time to API Line 112',
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
    <View>
      <Header navigation={navigation}/>
      <Button title="Logout" onPress={showLogoutConfirmation} />
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})