import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// Import Icons
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Import Location
import Geolocation from '@react-native-community/geolocation';

// Main Function
const Login = ({navigation}) => {
  // Varibale declaration
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // UseEffect for Checking for loging
  useEffect(() => {
    // Check if the location is enabled
    Geolocation.getCurrentPosition(
      position => {
        setLocationEnabled(true);
        console.log(position);
      },
      error => {
        setLocationEnabled(false);
      },
    );
  }, []);

  // Handle Login Function
  const handleLogin = () => {
    if (!locationEnabled) {
      Alert.alert('Location Alert', 'Please enable location services.');
      return;
    }

    // Condition for Mobile filed
    if (mobile.trim() === '') {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }
    // Condition for Password testing
    if (password.trim() === '') {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    // Perform your login logic here
    // Redirect to the next screen
    navigation.navigate('DrawerNavigation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aarogya Seva CRM</Text>
      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.inputView}>
        <Feather style={styles.icon} name="phone" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          value={mobile}
          maxLength={10}
          onChangeText={text => setMobile(text)}
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
        onPress={() => navigation.navigate('ForgetPassword')}
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
    fontSize: 20,
    color: 'red',
    textAlign: 'right',
    marginRight: 35,
    marginVertical: 15,
  },
});
