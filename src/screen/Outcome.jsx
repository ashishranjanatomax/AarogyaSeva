import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Outcome = ({navigation, route}) => {
  const [outcome, setOutcome] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [note, setNotes] = useState('');
  const [positiveClosed, setPositiveClosed] = useState(false);
  const [negativeClosed, setNegativeClosed] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [amount, setAmount] = useState('0');
  Geolocation.getCurrentPosition(position => {
    const data = position;
    setLatitude(`${data.coords.latitude}`);
    setLongitude(`${data.coords.longitude}`);
  });
  const {joblistId, userId} = route.params;
  // console.log('Line 39', userId);
  const outComeName = [
    'Positive',
    'Negative',
    'Neutral',
    'Positive Closed',
    'Negative Closed',
  ];
  const followUpName = ['Call', 'Mail', 'Visit','None'];
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error Logging out:', error);
    }
  };
  const handleSubmit = async () => {
    const postData = {
      employeeId: userId.toString(),
      joblistId: joblistId.toString(),
      outcome: outcome,
      notes: note,
      followupmethods: followUp,
      visitdate: date.toISOString().split('T')[0],
      visittime: date.toLocaleTimeString('en-US', {hour12: false}),
      latitude: latitude,
      longitude: longitude,
      purposeamount: amount,
    };
    console.log(postData, 'Line 58');

    const response = await fetch('https://crm.aarogyaseva.co.in/api/followup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const responseData = await response.json();
    console.log(responseData, 'Line 72');
    if (responseData.status === 200) {
      console.log('Data Added Sucessfully:', responseData.message);
      navigation.goBack();
    } else {
      console.log('Error adding data line 76', responseData.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={50} color="#00bc4c" />
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
      <Text style={styles.title}>Lead Follow Up</Text>

      <ScrollView>
        <View style={styles.objectHolder}>
          {/* Select Outcome Like Positive, Negative,Neutral,Closed */}
          <View style={styles.inputView}>
            <Octicons name="workflow" size={24} color="gray" />
            <Picker
              style={styles.input}
              selectedValue={outcome}
              onValueChange={itemValue => setOutcome(itemValue)}>
              <Picker.Item label="Select Status" value="" />
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
              value={note}
              onChangeText={text => setNotes(text)}
              style={styles.input}
              multiline={true}
              placeholderTextColor={'black'}
              placeholder="Enter Notes"
            />
          </View>
          {/* Follow Up Picker */}
          {positiveClosed === false && (
            <View style={styles.inputView}>
              <Octicons name="workflow" size={24} color="gray" />
              <Picker
                style={styles.input}
                selectedValue={followUp}
                onValueChange={itemValue => setFollowUp(itemValue)}>
                <Picker.Item label="Next Follow Up Method" value="" />
                {followUpName.map((outComeName, index) => (
                  <Picker.Item
                    key={index}
                    label={outComeName}
                    value={outComeName}
                  />
                ))}
              </Picker>
            </View>
          )}

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
              onChangeText={text => setAmount(text)}
              placeholder="Purpose Amount"
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.TouchableOpacityStyle}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default Outcome;

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
  objectHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
    color:'black'
  },
  TouchableOpacityStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
    width: '80%',
    borderRadius: 25,
    height: 65,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container2: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2e509d',
  },
});
