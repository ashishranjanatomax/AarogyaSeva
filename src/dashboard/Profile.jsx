import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//import OTP Modal for Email and Password
import OtpModal from '../component/OtpModal';
import OTPModalMobileChange from '../component/OTPModalMobileChange';
// import Header from component section
import Header from '../component/Header';
// import vector icon
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
//import Geolocation
import Geolocation from '@react-native-community/geolocation';
// Main Function
const Profile = ({navigation, userData}) => {
  // State varibale declaration
  console.log(userData.name, 'Line 27');
  const [userName, setUserName] = useState('ashishranjanmonal');
  const [name, setName] = useState('Ashish Ranjan');
  const [phone, setPhone] = useState('6206416452');
  const [email, setEmail] = useState('aviashishranjan@gmail.com');
  const [address, setAddress] = useState('Bairiya,Patna');
  const [businessLoaction, setBusinessLocation] = useState('Patna City');
  const [homeLocation, setHomeLocation] = useState('');
  const [designation, setDesignation] = useState('Sales Associative');
  const [status, setStatus] = useState('Permanent');
  const [accountStatus, setAccountStatus] = useState('Active');
  const [password, setPassword] = useState('Test@123');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showOtpModalPhone, setShowOtpModalPhone] = useState(false);
  const [landmark, setLandmark] = useState('Near by durga Mandir');

  const location = () => {
    Geolocation.getCurrentPosition(position => {
      const data = position;
      setHomeLocation(`${data.coords.latitude},${data.coords.longitude}`);
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const data = position;
      setHomeLocation(`${data.coords.latitude}, ${data.coords.longitude}`);
    });
    setUserName(userData.username);
    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.mobile);
    setAddress(userData.address);
    setBusinessLocation(userData.areacovered);
    setDesignation(userData.designation);
    setLandmark(userData.landmark);
    setPassword(userData.password);
  }, [userData]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <Text style={styles.title}>User Profile Details</Text>
        <View style={styles.textInputContainer}>
          {/* User Name */}
          <View style={styles.inputView}>
            <Entypo name="user" size={24} color="gray" />
            <TextInput
              editable={false}
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
              editable={false}
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
              editable={false}
              style={styles.input}
              placeholder="Email ID"
              value={email}
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
            {/* <TouchableOpacity onPress={() => setShowOtpModal(true)}>
              <FontAwesome name="edit" size={24} color="gray" />
            </TouchableOpacity> */}
          </View>
          {/* Phone */}
          <View style={styles.inputView}>
            <FontAwesome name="phone" size={24} color="gray" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Mobile Number"
              value={phone}
              maxLength={10}
              keyboardType="number-pad"
              returnKeyType="next"
              onChangeText={text => setPhone(text)}
            />
            {/* <TouchableOpacity onPress={() => setShowOtpModalPhone(true)}>
              <FontAwesome name="edit" size={24} color="gray" />
            </TouchableOpacity> */}
          </View>
          {/*Home Address */}
          <View style={styles.inputView}>
            <Entypo name="home" size={24} color="gray" />
            <TextInput
              editable={false}
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
              editable={false}
              style={styles.input}
              placeholder="Business Location"
              value={businessLoaction}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setBusinessLocation(text)}
            />
          </View>
          {/* Home Location */}
          <View style={styles.inputView}>
            <FontAwesome6 name="map-location-dot" size={24} color="gray" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Home Location"
              value={homeLocation}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setHomeLocation(text)}
            />
            <TouchableOpacity onPress={location}>
              <FontAwesome name="edit" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {/* Employee LandMark */}
          <View style={styles.inputView}>
            <Entypo name="location-pin" size={24} color="gray" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setLandmark(text)}
            />
          </View>
          {/* Designation */}
          <View style={styles.inputView}>
            <Entypo name="slideshare" size={24} color="gray" />
            <TextInput
              editable={false}
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
              editable={false}
              style={styles.input}
              placeholder="Status of Employement"
              value={status}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setStatus(text)}
            />
          </View>
          {/* Status of Account */}
          <View style={styles.inputView}>
            <Feather name="activity" size={24} color="gray" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Status Account"
              value={userData.accountstatus === 1 ? 'Active' : 'Suspended'}
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          {/* Password */}
          <View style={styles.inputView}>
            <Entypo name="lock" size={24} color="gray" />
            <TextInput
              secureTextEntry
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
            onPress={() => navigation.navigate('Job List')}
            style={styles.touchableOpacityUpdate}>
            <Text style={styles.update}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Email id Change */}
      {/* <Modal visible={showOtpModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <OtpModal
            navigation={navigation}
            onClose={() => setShowOtpModal(false)}
            onVerificationComplete={() => {
              setShowOtpModal(false);
            }}
          />
        </View>
      </Modal> */}
      {/* Mobile number change */}
      {/* <Modal
        visible={showOtpModalPhone}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <OTPModalMobileChange
            navigation={navigation}
            onClose={() => setShowOtpModalPhone(false)}
            onVerificationComplete={() => {
              setShowOtpModalPhone(false);
            }}
          />
        </View>
      </Modal> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
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
    fontWeight: 'bold',
    color: 'black',
  },
  touchableOpacityUpdate: {
    backgroundColor: 'green',
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginVertical: 25,
  },
  update: {
    marginTop: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    width: '75%',
    height: 150,
    marginVertical: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 45,
    borderColor: '#2e509d',
    borderWidth: 2,
    position: 'absolute',
  },
});
