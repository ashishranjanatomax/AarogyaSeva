import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
const EmployeePerformance = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [revenu, setRevenu] = useState('');
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>Employee Performance </Text>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 50,
            marginHorizontal: 45,
            marginVertical: 25,
          }}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{marginTop: 10}}>
            <Feather name="calendar" size={50} color="orange" />
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput
            placeholderTextColor={'black'}
              editable={false}
              value={date.toDateString()}
              style={styles.input}
              placeholder="Selected Date"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 75,
            marginHorizontal: 45,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{marginTop: 10}}>
            <FontAwesome name="rupee" size={50} color="orange" />
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="number-pad"
              editable={true}
              value={revenu}
              placeholderTextColor={'black'}
              onChangeText={text => setRevenu(text)}
              style={styles.input}
              placeholder="Revenue"
            />
          </View>
        </View>
      </View>
      <ScrollView></ScrollView>
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

export default EmployeePerformance;

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
    fontWeight: 'bold',
    color:'black'
  },
});
