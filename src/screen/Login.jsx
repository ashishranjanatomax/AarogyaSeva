import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';
const Login = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

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

  const handleLogin = () => {
    navigation.navigate('DrawerNavigation');
    if (!locationEnabled) {
      Alert.alert('Location Alert', 'Please enable location services.');
      return;
    }

    // Perform your login logic here
    // Redirect to the next screen
    navigation.navigate('DrawerNavigation');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: 'red'}}>
        Aarogya Seva CRM
      </Text>
      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={{width: '75%', height: 150}}
      />
      {/* <FontAwesome
        name="user"
        size={150}
        color="green"
        style={{marginVertical: 25}}
      /> */}

      <View style={styles.inputView}>
        <Feather style={{marginTop: 10}} name="phone" size={24} color="gray" />
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
          style={{marginTop: 10}}
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
          style={{marginTop: 10}}
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
        style={{
          fontSize: 20,
          color: 'red',
          textAlign: 'right',
          marginRight: 35,
          marginVertical: 15,
        }}>
        Forget Password ?
      </Text>
      <TouchableOpacity
        onPress={handleLogin}
        disabled={!locationEnabled}
        style={styles.touchableOpacitySignIn}>
        <Text style={styles.SignIn}>Log in</Text>
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
  touchableOpacitySignIn: {
    backgroundColor: 'green',
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginTop: 15,
  },
  SignIn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});
