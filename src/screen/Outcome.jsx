import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import {Picker} from '@react-native-picker/picker';
import Octicons from 'react-native-vector-icons/Octicons';
import HeaderInside from '../component/HeaderInside';
const Outcome = ({navigation}) => {
  const [outcome, setOutcome] = useState('');
  const [followUp, setFollowUp] = useState('');

  const outComeName = ['Positve', 'Negative', 'Neutral'];
  const followUpName = ['Call', 'Mail', 'Visit'];
  return (
    <View style={styles.container}>
      <HeaderInside />
      <Text
        style={{
          color: '#2e509d',
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 15,
        }}>
        Discussion and Outcome
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
        {/* Outcome Picker */}
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
        <View style={[styles.inputView, {height: '35%'}]}>
          <TextInput
            style={{
              width: '85%',
              //   height: '50%',
            }}
            multiline={true}
            placeholder="Enter Description or Discussion Details"
          />
        </View>
        {/* FollowUp Picker */}
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Job List')}
          style={styles.touchableOpacitySignIn}>
          <Text style={styles.SignIn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Outcome;

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
