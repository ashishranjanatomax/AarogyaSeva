import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import Header from '../component/Header'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
const TimeSheet = ({navigation}) => {
    const [startDate,setStartDate] = React.useState(new Date());
  const [endDate,setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  return (
    <View style={styles.container}>
        <Header navigation={navigation}/>
      <Text style={styles.title}>Time Sheet Details</Text>

      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20,borderBottomWidth:2 }}>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Select Start Date</Text>
        <View style={{ flexDirection: 'row', gap: 15, }}>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setShowStartDatePicker(true)}>
            <AntDesign name="calendar" size={45} color="black" />
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput style={styles.input} value={startDate.toDateString()} editable={false} placeholder='Start Date' placeholderTextColor="black" />
          </View>
        </View>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Select End Date</Text>
        <View style={{ flexDirection: 'row', gap: 15, }}>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setShowEndDatePicker(true)}>
            <AntDesign name="calendar" size={45} color="black" />
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput value={endDate.toDateString()} editable={false} style={styles.input} placeholder='End Date' placeholderTextColor="black" />
          </View>
        </View>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}

{showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
    </View>
  )
}

export default TimeSheet

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
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
        color: 'gray'
      },
})