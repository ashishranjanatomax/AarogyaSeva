import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../component/Header';
import {Picker} from '@react-native-picker/picker';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderInside from '../component/HeaderInside';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
const Outcome = ({navigation}) => {
  const [outcome, setOutcome] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [positiveClosed, setPositiveClosed] = useState(false);
  const [negativeClosed, setNegativeClosed] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const outComeName = [
    'Positve',
    'Negative',
    'Neutral',
    'Positve Closed',
    'Negative Closed',
  ];
  const followUpName = ['Call', 'Mail', 'Visit'];

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>Out Come for FollowUp</Text>
      <ScrollView>
        <View style={styles.objectHolder}>
          {/* Select Outcome Like Positive, Negative,Neutral,Closed */}
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
              style={styles.input}
              multiline={true}
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
              placeholder="Purpose Amount"
              keyboardType="number-pad"
            />
          </View>
          <Text>{Date.date}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Job List')}
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
});
