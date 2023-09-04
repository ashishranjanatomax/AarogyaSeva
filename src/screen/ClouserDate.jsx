import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const ClouserDate = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {item, userId} = route.params;
  // console.log(item,"Line 11")

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formateDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error Logging out:', error);
    }
  };

  const handleSubmit = async jobId => {
    console.log(jobId, 'Line 23');
    console.log('Selected Date Line 41', formateDate(date));
    try {
      const response = await axios.put(
        `https://crm.aarogyaseva.co.in/api/assignjob/${jobId}/actualclosure`,
        {actualclosure:formateDate(date)},
      );
      if (response.status == 200) {
        console.log('Sent Sucessfully', 'Line 47', date);
        navigation.goBack();
        // setDate(date)
      }
    } catch (error) {
      console.log('Error submitting Clousure Date:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
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
      <Text style={styles.heading}>Closure Details Section</Text>

      <TouchableOpacity
        style={styles.inputView}
        onPress={() => setShowDatePicker(true)}>
        <TextInput
        value={formateDate(date)}
          onChangeText={text => setDate(text)}
          style={styles.input}
          placeholder="Enter Closure Date"
          placeholderTextColor="black"
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity
        style={styles.touchableOpacityContainer}
        onPress={() => handleSubmit(item)}>
        <Text style={styles.LoginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClouserDate;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2e509d',
    backgroundColor: 'white',
  },
  heading: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  inputView: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '65%',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'green',
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginVertical: 15,
  },
  LoginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
