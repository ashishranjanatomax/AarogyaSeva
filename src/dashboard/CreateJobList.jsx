import React, {useState, useEffect, createRef} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../component/Header';
// import Vector Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import geolocation
import Geolocation from '@react-native-community/geolocation';
import DatePicker from 'react-native-date-picker';

// Main Function
const CreateJobList = ({navigation, userData}) => {
  // State varibale declararation
  // console.log(userData.name, 'Line 32');
  const [showReferenceInput, setShowReferenceInput] = useState(false);
  const [refernceText, setReferenceText] = useState('');
  const [source, setSource] = useState('');
  const [nameTitle, setNameTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSectorName, setSelectedSectorName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const device = useCameraDevices();
  const [image, setImage] = useState(
    'https://www.clipartkey.com/mpngs/m/82-824693_dummy-image-of-user.png',
  );
  const [geographicalLocation, setGeoGraphicalLocation] = useState('');
  const [outcome, setOutcome] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [descriptionDetails, setDescriptionDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [createdby, setCreatedBy] = useState(userData.id);
  const [district, setDistrict] = useState('');
  const [assignedto, setAssignedto] = useState('-');
  console.log(createdby, 'Line 62');
  const outComeName = [
    'Positve',
    'Negative',
    'Neutral',
    'Positve Closed',
    'Negative Closed',
  ];
  const followUpName = ['Call', 'Mail', 'Visit'];

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      const data = position;
      setGeoGraphicalLocation(
        `${data.coords.latitude},${data.coords.longitude}`,
      );
    });
  });
  bs = createRef();
  // Handle submit function. it control all the functionality related to submit
  const handleSubmit = async () => {
    try {
      if (nameTitle.trim() === '') {
        Alert.alert('Error', 'Please select the Salutation');
        return;
      }
      if (firstName.trim() === '') {
        Alert.alert('Error', 'Please enter the first Name');
        return;
      }
      if (lastName.trim() === '') {
        Alert.alert('Error', 'Please enter the last Name');
        return;
      }
      if (phone.trim() === '') {
        Alert.alert('Error', 'Please enter the phone number');
        return;
      }
      if (email.trim() === '') {
        Alert.alert('Error', 'Please enter the email');
        return;
      }
      if (address.trim() === '') {
        Alert.alert('Error', 'Please enter the permanent Address ');
        return;
      }
      if (landmark.trim() === '') {
        Alert.alert('Error', 'Please enter landmark location or name');
        return;
      }
      if (purpose.trim() === '') {
        Alert.alert('Error', 'Please select Purpose');
        return;
      }
      if (selectedSector.trim() === '') {
        Alert.alert('Error', 'Please select the sector');
        return;
      }
      if (selectedSectorName.trim() === '') {
        Alert.alert('Error', 'Please select the sector name');
        return;
      }
      if (image.trim() === '') {
        Alert.alert('Error', 'Please upload image');
        return;
      }
      if (image.trim() === '') {
        Alert.alert('Error', 'Please upload image');
        return;
      }
      if (district.trim() === '') {
        Alert.alert('Error', 'Please enter District Name');
        return;
      }

      const formData = {
        source: source,
        title: nameTitle,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        mobile: phone,
        email: email,
        address: address,
        landmark: landmark,
        prospect: purpose,
        backgroundsector: selectedSector,
        background: selectedSectorName,
        image: 'image',
        discussion: descriptionDetails,
        note: descriptionDetails,
        followup: followUp,
        outcome: outcome,
        geographicallocation: geographicalLocation,
        purposeamount: amount,
        dateforfollowup: date.toDateString(),
        timeforfollowup: date.toTimeString(),
        // employeeid: '1',
        createdby: createdby.toString(),
        district,
        assignedto,
      };
      console.log(formData, 'line 127');
      const response = await fetch(
        'https://crm.aarogyaseva.co.in/api/joblist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      const responseData = await response.json();
      console.log(responseData, 'line 139');
      if (responseData.status === 200) {
        console.log('Data added Sucessfully:', responseData.message);
        navigation.navigate('JobList');
      } else {
        console.log('Error adding data:', responseData.message);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  // Const choose photo from Camera
  const takePhotoFromCamera = () => {
    setShowModal(false);
    ImagePicker.openCamera({
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  // Choose Photo from Galary
  const choosePhotoFromLibrary = () => {
    setShowModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  useEffect(() => {
    checkPermission();
  }, []);

  // Check permission for Camera and Microphone
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicroPhonePermission = await Camera.requestMicrophonePermission();

    console.log(newCameraPermission, 'and', newMicroPhonePermission);
  };
  if (device == null) {
    return <ActivityIndicator />;
  }

  const purposeName = [
    'SPOKE',
    'SUBHUB',
    'HUB',
    'SUPER HUB',
    'OUT REACH',
    'OTHER',
  ];
  const sourceOfLeed = ['Website', 'TeleCall', 'Reference', 'Direct'];
  const PersonBackground = [
    {
      id: 1,
      sector: 'Health Care Worker',
      sectorName: [
        {
          id: 1,
          name: 'RMP/QUCAK',
        },
        {
          id: 2,
          name: 'Mediacal Store',
        },
        {
          id: 3,
          name: 'Flabo/Lab Tech',
        },
        {
          id: 4,
          name: 'Pharma',
        },
        {
          id: 5,
          name: 'Poly Clinc',
        },
        {
          id: 6,
          name: 'Digonostic Center',
        },
        {
          id: 7,
          name: 'Nursing Home',
        },
        {
          id: 8,
          name: 'Health Care Insulate',
        },
        {
          id: 9,
          name: 'Akash Worker',
        },
      ],
    },
    {
      id: 2,
      sector: 'Non Helth Care Worker',
      sectorName: [
        {
          id: 1,
          name: 'Ashish',
        },
      ],
    },
    {
      id: 3,
      sector: 'Other',
    },
  ];

  const renderInner = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose Photo From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => setShowModal(false)}>
          <Text style={styles.panelButtonTitle}>Cancle</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <Text style={styles.heading}>Create Job List</Text>

        <View style={styles.textInput}>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.inputView}>
              <MaterialIcons name="source" size={24} color="gray" />
              <Picker
                style={styles.input}
                selectedValue={source}
                onValueChange={itemValue => {
                  setSource(itemValue);
                  setShowReferenceInput(itemValue === 'Reference');
                }}>
                <Picker.Item label="Select Source" value="" />
                {sourceOfLeed.map((purposeName, index) => (
                  <Picker.Item
                    key={index}
                    label={purposeName}
                    value={purposeName}
                  />
                ))}
              </Picker>
            </View>
            {showReferenceInput && (
              <View style={styles.inputView}>
                <TextInput
                  value={refernceText}
                  style={styles.input}
                  placeholder="Enter Refernce"
                  onChangeText={text => {
                    setReferenceText(text);
                  }}
                />
              </View>
            )}
          </View>
          {/* Created By */}
          <View style={styles.inputView}>
            <TextInput
              editable={false}
              value={createdby}
              style={styles.input}
              placeholder={`${userData.name}`}
            />
          </View>
          {/* Name Title Picker */}
          <View style={styles.inputView}>
            <MaterialCommunityIcons
              name="human-male-female"
              size={24}
              color="gray"
            />
            <Picker
              style={styles.input}
              selectedValue={nameTitle}
              onValueChange={setNameTitle}>
              <Picker.Item label="Select Title" value="" />
              <Picker.Item label="Mr" value="Mr" />
              <Picker.Item label="Mrs" value="Mrs" />
              <Picker.Item label="Dr" value="Dr" />
            </Picker>
          </View>
          {/* First, Middle and Last name TextInput */}
          <View style={styles.nameSection}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                keyboardType="name-phone-pad"
                returnKeyType="next"
                onChangeText={text => setFirstName(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Middle Name"
                value={middleName}
                keyboardType="name-phone-pad"
                returnKeyType="next"
                onChangeText={text => setMiddleName(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                keyboardType="name-phone-pad"
                returnKeyType="next"
                onChangeText={text => setLastName(text)}
              />
            </View>
          </View>
          {/* Mobile Number */}
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
          {/* Email Id */}
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
          {/* User Geographical Location */}
          <View style={styles.inputView}>
            <Entypo name="home" size={24} color="gray" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="GeoGraphical Location"
              value={geographicalLocation}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setGeoGraphicalLocation(text)}
            />
          </View>
          {/* User Address */}
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
          {/* User District */}
          <View style={styles.inputView}>
            <Entypo name="home" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="District"
              value={district}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setDistrict(text)}
            />
          </View>
          {/* Landmark */}
          <View style={styles.inputView}>
            <FontAwesome5 name="landmark" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={text => setLandmark(text)}
            />
          </View>
          {/* Porpouse Picker */}
          <View style={styles.inputView}>
            <Octicons name="workflow" size={24} color="gray" />
            <Picker
              style={styles.input}
              selectedValue={purpose}
              onValueChange={itemValue => setPurpose(itemValue)}>
              <Picker.Item label="Select Purpose" value="" />
              {purposeName.map((purposeName, index) => (
                <Picker.Item
                  key={index}
                  label={purposeName}
                  value={purposeName}
                />
              ))}
            </Picker>
          </View>

          {/* Background */}
          {/* Picker for Sector */}
          <View style={styles.inputView}>
            <Octicons name="workflow" size={24} color="gray" />
            <Picker
              style={styles.input}
              selectedValue={selectedSector}
              onValueChange={itemValue => {
                setSelectedSector(itemValue);
                setSelectedSectorName('');
              }}>
              <Picker.Item label="Select Sector" value="" />
              {PersonBackground.map(sector => (
                <Picker.Item
                  key={sector.id}
                  label={sector.sector}
                  value={sector.id.toString()}
                />
              ))}
            </Picker>
          </View>
          {/* Picker for Sector Name */}
          {selectedSector !== '' && selectedSector !== '3' ? (
            <View style={styles.inputView}>
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color="gray"
              />
              <Picker
                style={styles.input}
                selectedValue={selectedSectorName}
                onValueChange={itemValue => setSelectedSectorName(itemValue)}>
                <Picker.Item label="Select Sector Name" value="" />
                {PersonBackground.find(
                  sector => sector.id.toString() === selectedSector,
                )?.sectorName.map(subsector => (
                  <Picker.Item
                    key={subsector.id}
                    label={subsector.name}
                    value={subsector.name}
                  />
                ))}
              </Picker>
            </View>
          ) : null}
          {/* TextInput for Other Sector Name */}
          {selectedSector === '3' ? (
            <View style={styles.inputView}>
              <AntDesign name="profile" size={24} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Enter Other Sector Name"
                value={selectedSectorName}
                onChangeText={text => setSelectedSectorName(text)}
              />
            </View>
          ) : null}

          {/* Upload Image */}
          <TouchableOpacity
            style={{backgroundColor: '#f08518', padding: 15, borderRadius: 10}}
            onPress={() => setShowModal(true)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '700',
                color: '#2e509d',
              }}>
              Upload Image
            </Text>
          </TouchableOpacity>
          <View style={styles.inputView}>
            <Image
              source={{uri: image}}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}
            />
          </View>

          <Text style={styles.heading}>Out Come for Follow Up</Text>
          <View>
            <View style={styles.inputView}>
              <Octicons name="workflow" size={24} color="gray" />
              <Picker
                style={styles.input}
                selectedValue={outcome}
                onValueChange={itemValue => setOutcome(itemValue)}>
                <Picker.Item label="Select OutCome" value="" />
                {outComeName.map((outComeName, index) => (
                  <Picker.Item
                    key={index}
                    label={outComeName}
                    value={outComeName}
                  />
                ))}
              </Picker>
            </View>
            {/* Description or notes */}
            <View style={styles.inputView}>
              <TextInput
                value={descriptionDetails}
                style={styles.input}
                multiline={true}
                placeholder="Enter Notes"
                onChangeText={text => setDescriptionDetails(text)}
              />
            </View>
            {/* Follow up for Picker */}
            <View style={styles.inputView}>
              <Octicons name="workflow" size={24} color="gray" />
              <Picker
                style={styles.input}
                selectedValue={followUp}
                onValueChange={itemValue => setFollowUp(itemValue)}>
                <Picker.Item label="Select Follow Up Method" value="" />
                {followUpName.map((outComeName, index) => (
                  <Picker.Item
                    key={index}
                    label={outComeName}
                    value={outComeName}
                  />
                ))}
              </Picker>
            </View>
            {/* Date Picker */}
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.inputView}>
              <AntDesign name="calendar" size={24} color="gray" />
              <TextInput
                editable={false}
                value={date.toDateString()}
                style={styles.input}
                placeholder={`Please choose the Date `}
              />
            </TouchableOpacity>
            {/* Time Picker */}
            <TouchableOpacity
              style={styles.inputView}
              // onPress={() => setTimeOpen(true)}
            >
              <Entypo name="back-in-time" size={24} color="gray" />
              <TextInput
                editable={false}
                value={date.toTimeString()}
                style={styles.input}
                placeholder="choose time for fallow up"
              />
            </TouchableOpacity>
            {/* Pupose Amount */}
            <View style={styles.inputView}>
              <FontAwesome name="rupee" size={24} color="gray" />
              <TextInput
                style={styles.input}
                value={amount}
                placeholder="Purpose Amount"
                keyboardType="number-pad"
                onChangeText={text => setAmount(text)}
              />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.touchableOpacitySignIn}>
            <Text style={styles.SignIn}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showModal && renderInner()}
      {open === true && (
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </View>
  );
};

export default CreateJobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
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
  sectorList: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  sectorContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    marginBottom: 10,
  },
  sectorHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subsector: {
    fontSize: 14,
    color: 'gray',
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
  heading: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },

  nameSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  nameInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  capture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    // position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
  },
});
