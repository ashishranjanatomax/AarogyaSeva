import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// Import Icons
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Location
import Geolocation from '@react-native-community/geolocation';
// import axios
import Axios from 'axios';

// Main Function
const Login = ({navigation}) => {
  const isDark = useColorScheme() === 'dark';
  // Varibale declaration
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [latitude,setlatitude] = useState();
  const [longitude,setLogitude] = useState();

  // UseEffect for Checking for loging
  useEffect(() => {
    // Check if the location is enabled
    Geolocation.getCurrentPosition(
      position => {
        setLocationEnabled(true);
        console.log(position);
        setlatitude(position.coords.latitude);
        setLogitude(position.coords.longitude);
      },
      error => {
        setLocationEnabled(false);
      },
    );

    AsyncStorage.getItem('userData')
      .then(userData => {
        if (userData) {
          navigation.replace('DrawerNavigation', {
            userData: JSON.parse(userData),
          });
        }
      })
      .catch(error => {
        console.log('Error reading user data from Async Storage', error);
      });
  }, []);

  // Handle Login Function
  const handleLogin = async () => {
    if (!locationEnabled) {
      Alert.alert('Location Alert', 'Please enable location services.');
      return;
    }

    // Condition for Mobile filed
    if (username.trim() === '') {
      Alert.alert('Error', 'Please enter your UserName number');
      return;
    }
    // Condition for Password testing
    if (password.trim() === '') {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    try {
      const response = await Axios.post(
        'https://crm.aarogyaseva.co.in/api/login',
        {
          username,
          password,
        },
      );
      console.log(response.data, 'Line 85');

      // Handle your response here
      if (response.data.status === 200) {
        const userData = response.data.data.employee;

        try {
          // console.log("Line 92",userData.id);
          const loginTimeResponse = await Axios.post(
            'https://crm.aarogyaseva.co.in/api/logintime',
            {
              employeeid: userData.id,
              latitude:latitude,
              longitude:longitude,
            },
          );

          console.log(loginTimeResponse.data,"Line 99");
        } catch (error) {
          console.log(
            'Error sending employeeId to logintime API',
            error.message,
          );
        }

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.replace('DrawerNavigation', {userData}); // Success: Navigate to next screen
      } else {
        Alert.alert('Login Failed', response.data.message); // Handle login failure
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Please check user id and Password');
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Aarogya Seva CRM</Text>
      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.inputView}>
        <Feather style={styles.icon} name="phone" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          keyboardType="number-pad"
          value={username}
          maxLength={10}
          placeholderTextColor={'gray'}
          onChangeText={text => setUserName(text)}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons
          style={styles.icon}
          name="lock-outline"
          size={24}
          color="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={showPassword === false ? true : false}
          value={password}
          placeholderTextColor={'gray'}
          onChangeText={text => setPassword(text)}
        />
        <Octicons
          style={styles.icon}
          name={showPassword == false ? 'eye-closed' : 'eye'}
          size={24}
          color="gray"
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        />
      </View>
      <Text
        // onPress={() => navigation.navigate('ForgetPassword')}
        style={styles.fpassword}>
        Forget Password ?
      </Text>
      <TouchableOpacity
        onPress={handleLogin}
        disabled={!locationEnabled}
        style={[
          styles.touchableOpacityContainer,
          !locationEnabled && {backgroundColor: 'gray'},
        ]}>
        <Text style={styles.LoginText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f08518',
  },
  image: {
    width: '75%',
    height: 150,
  },
  icon: {
    marginTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'gray',
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
    color: 'gray',
  },
  touchableOpacityContainer: {
    backgroundColor: 'green',
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginTop: 15,
  },
  LoginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  fpassword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'red',
    marginVertical: 15,
  },
});
