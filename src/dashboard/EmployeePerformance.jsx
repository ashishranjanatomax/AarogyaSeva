import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React,{useState,useEffect} from 'react';
import Header from '../component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const EmployeePerformance = ({ navigation, userData }) => {
  const [startDate,setStartDate] = React.useState(new Date());
  const [endDate,setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
// console.log("Line 133",userData.id)
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

  useEffect(() => {
    // Fetch data from API when start date or end date changes
    const fetchPerformanceData = async () => {
      try {
        const formattedStartDate = startDate.toISOString().slice(0, 10);
        const formattedEndDate = endDate.toISOString().slice(0, 10);
        const apiUrl = `https://crm.aarogyaseva.co.in/api/performance/${userData.id}/${formattedStartDate}/${formattedEndDate}`;

        const response = await axios.get(apiUrl);
        setPerformanceData(response.data);
        console.log(response.data,"Line 39")
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, [startDate, endDate]);

  
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View>
        <Text style={styles.title}>Employee Performance</Text>
      </View>
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
      {performanceData && (
        <ScrollView style={{flexDirection:'column',gap:15}}>
          
          {/* Iterate over the rest of the data */}
          {Object.keys(performanceData).slice(0,-1).map((key) => (
            <View style={styles.dataContainer} key={key}>
              <View style={styles.textHolder}>
              <Text style={styles.text}>Prospect: </Text>
              <Text style={styles.text}>{performanceData[key].prospect}</Text>
              </View>

              <View style={styles.textHolder}>
              <Text style={styles.text}>Leads Created: </Text>
              <Text style={styles.text}>{performanceData[key].leads_created}</Text>
              </View>

              <View style={styles.textHolder}>
              <Text style={styles.text}>Leads Closed Negative:  </Text>
              <Text style={styles.text}>{performanceData[key].leads_closed_Negative}</Text>
              </View>

              <View style={styles.textHolder}>
              <Text style={styles.text}>Leads Closed Positive: </Text>
              <Text style={styles.text}>{performanceData[key].leads_closed_Positive}</Text>
              </View>

              <View style={styles.textHolder}>
              <Text style={styles.text}>Total Revenue: </Text>
              <Text style={styles.text}>{performanceData[key].total_revenue}</Text>
              </View>
               
            </View>
          ))}

<Text style={styles.total}>Total: {performanceData.Total}</Text>
        </ScrollView>
      )}
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
  total:{
    marginVertical:15,
    backgroundColor:'#f08518',
    padding:25,
    textAlign:'center',
    color:'white',
    fontSize:18,
    fontWeight:'700',
    borderRadius:25,
    width:'75%',
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center'
  },
  dataContainer:{
    marginTop:10,
    flexDirection:'column',
    justifyContent:'center',
    borderWidth:2,
    borderColor:'#2e509d',
    gap:5,
    padding:10,
    elevation:15,
    backgroundColor:'white',
    width:'75%',
    alignContent:'center',
    alignSelf:'center'
  },
  text:{
    color:'gray',
    fontSize:18,
    fontWeight:'700',
    // borderBottomWidth:2
  },
  textHolder:{flexDirection:'row',justifyContent:'space-between'}
});
