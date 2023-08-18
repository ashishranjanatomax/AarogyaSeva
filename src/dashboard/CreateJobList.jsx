import React, {useState, useEffect, useRef, createRef} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
// import {useCameraDevices, Camera} from 'react-native-vision-camera';
// import {RNCamera} from 'react-native-camera';
import Header from '../component/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const CreateJobList = ({navigation}) => {
  const [nameTitle, setNameTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [purpose, setPurpose] = useState('');
  const [doc, setDoc] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSectorName, setSelectedSectorName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const device = useCameraDevices();

  const [image, setImage] = useState(
    'https://static.turbosquid.com/Preview/2019/02/18__04_59_25/Crash_Test_Dummy_Rigged_mb_00.jpg5B1ADE98-2892-494F-9EB2-F0B49A1BE375DefaultHQ.jpg',
  );
  bs = createRef();

  // Const choose photo from Camera
  const takePhotoFromCamera = () => {
    setShowModal(false);
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.7,
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
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  useEffect(() => {
    checkPermission();
  }, []);

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
    console.log('Ashish');
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
          {/* Name */}
          {/* <View style={styles.inputView}>
            <Entypo name="user" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Name as National ID"
              value={name}
              keyboardType="name-phone-pad"
              returnKeyType="next"
              onChangeText={text => setName(text)}
            />
          </View> */}
          {/* // Inside the return statement of CreateJobList component */}
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
            </Picker>
          </View>
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
          {/* Picker */}
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
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text>Upload Image </Text>
          </TouchableOpacity>
          <View style={styles.inputView}>
            <Image
              source={{uri: image}}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}
            />
          </View>

          {/* {takePhotoClicked && (
            <RNCamera
              style={{flex: 1, aspectRatio: 1}}
              ref={camera}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}>
              {({camera, status}) => {
                if (status === 'READY') {
                  return (
                    <View
                      style={{
                        borderWidth: 2,
                        width: 250,
                        height: 250,
                        flex: 1,
                        backgroundColor: 'trasnparent',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        style={styles.capture}
                        onPress={async () => {
                          const photo = await camera.takePictureAsync({
                            quality: 'high',
                          });
                          setCapturedImage(photo);
                          setTakePhotoClicked(false);
                        }}
                      />
                    </View>
                  );
                } else {
                  return <View />;
                }
              }}
            </RNCamera>
          )}

          {capturedImage && (
            <Image
              source={{uri: capturedImage.uri}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
          )} */}
          {/* Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('OutCome')}
            style={styles.touchableOpacitySignIn}>
            <Text style={styles.SignIn}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showModal && renderInner()}
    </View>
  );
};

export default CreateJobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  formContainer: {
    backgroundColor: '#dfe7ed',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
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
});
