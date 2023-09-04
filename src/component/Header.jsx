import {StyleSheet, View, Image, TouchableOpacity,AppState} from 'react-native';
import React,{useState,useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({navigation}) => {
  const Drawer = () => {
    navigation.openDrawer();
  };

  const [logoutTimer,setLogoutTimer] = useState(null);
  const startLogoutTimer = () => {
    const timerId = setTimeout(handleLogout,10800*1000);
    setLogoutTimer(timerId);
  }

  const handleUserActivity = () => {
    if(logoutTimer) {
      clearTimeout(logoutTimer);
    }
    startLogoutTimer();
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error Logging out:', error);
    }
  };

  useEffect (() => {
    const activityEvents = ['mousedown','keydown','touchstart'];

    const attachActivityListeners = () => {
      activityEvents.forEach((event) => {
        document.addEventListener(event,handleUserActivity);
      });
    };
    attachActivityListeners();
    startLogoutTimer();

    //AppState change listener
    AppState.addEventListener('change',(newState) => {
      if(newState ==='background' && logoutTimer) {
        clearTimeout(logoutTimer);
      }
    });

    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event,handleUserActivity);
      });
      // Remove AppState change listener when component unmount
      AppState.removeEventListener('change');
    }
  },[]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Drawer}>
        <FontAwesome name="bars" size={50} color="#00bc4c" />
      </TouchableOpacity>

      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={{width: '50%', height: 100}}
      />
      <TouchableOpacity onPress={handleLogout}>
        <Entypo name="log-out" size={50} color="#f08518" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
});
