import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Profile = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [areaLoaction, setAreaLocation] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <Text
          style={{
            color: '#2e509d',
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 15,
          }}>
          User Profile Details
        </Text>
        <View
          style={{
            backgroundColor: '#dfe7ed',
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 15,
          }}>
          {/* User Name */}
          <View style={styles.inputView}>
            <Entypo name="user" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="UserName"
              value={userName}
              keyboardType="name-phone-pad"
              returnKeyType="next"
              onChangeText={text => setUserName(text)}
            />
          </View>
          {/* Name */}
          <View style={styles.inputView}>
            <Entypo name="user" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Real Name"
              value={name}
              keyboardType="name-phone-pad"
              returnKeyType="next"
              onChangeText={text => setName(text)}
            />
          </View>
          {/* Email */}
          <View style={styles.inputView}>
            <Entypo name="mail" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Email ID"
              value={email}
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
          </View>
          {/* Phone */}
          <View style={styles.inputView}>
            <FontAwesome name="phone" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={phone}
              maxLength={10}
              keyboardType="number-pad"
              returnKeyType="next"
              onChangeText={text => setPhone(text)}
            />
          </View>
          {/*Address */}
          <View style={styles.inputView}>
            <Entypo name="home" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setAddress(text)}
            />
          </View>
          {/* Area Location */}
          <View style={styles.inputView}>
            <Entypo name="location-pin" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Area Location"
              value={areaLoaction}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setAreaLocation(text)}
            />
          </View>
          {/* Home Location */}
          <View style={styles.inputView}>
            <FontAwesome6 name="map-location-dot" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Home Location"
              value={homeLocation}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setHomeLocation(text)}
            />
          </View>
          {/* Designation */}
          <View style={styles.inputView}>
            <Entypo name="slideshare" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Designation"
              value={designation}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setDesignation(text)}
            />
          </View>
          {/* Status of Employement */}
          <View style={styles.inputView}>
            <MaterialCommunityIcons name="list-status" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Status of Employement"
              value={status}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setStatus(text)}
            />
          </View>
          {/* Password */}
          <View style={styles.inputView}>
            <Entypo name="lock" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setPassword(text)}
            />
          </View>
          {/* Button */}
          <TouchableOpacity
            onPress={() => navigation.replace('DrawerNavigation')}
            style={styles.touchableOpacitySignIn}>
            <Text style={styles.SignIn}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    // backgroundColor: 'white',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 25,
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
    marginVertical: 25,
  },
  SignIn: {
    marginTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
