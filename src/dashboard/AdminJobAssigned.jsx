import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import axios from 'axios';

const AdminJobAssigned = ({navigation, userData}) => {
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 

  const fetchAssignedJobs = async () => {
    try {
      const response = await axios.get(
        `https://crm.aarogyaseva.co.in/api/readassignjob/${userData.id}/assaign`,
      );
      if (response.status === 200) {
        setAssignedJobs(response.data.data);
      }
    } catch (error) {
      console.log('Line 17', error);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAssignedJobs().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchAssignedJobs();
  }, []);

  

  const renderItem = ({item}) => (
    <View style={styles.view}>
      <View style={styles.textHolder}>
        <Text style={styles.text}>Job Description</Text>
        <Text style={styles.text}>{item.jobdescription}</Text>
      </View>
      <View style={styles.textHolder}>
        <Text style={styles.text}>Start Date</Text>
        <Text style={styles.text}>{item.startfrom}</Text>
      </View>
      <View style={styles.textHolder}>
        <Text style={styles.text}>Due Date</Text>
        <Text style={styles.text}>{item.closeby}</Text>
      </View>
      <View style={styles.textHolder}>
        <Text style={styles.text}>Closure Date</Text>
        <Text style={styles.text}>{item.actualclosure}</Text>
      </View>

      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate('ClouserDate', {item: item.id,userId:userData.id})}>
        <Text style={styles.button}>Add Closure Date</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={navigation} />
      <Text style={styles.title}>Admin Job Assigned</Text>
      <FlatList
        data={assignedJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default AdminJobAssigned;

const styles = StyleSheet.create({
  text: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '700',
  },
  view: {
    height: 'auto',
    padding: 16,
    borderWidth: 2,
    width: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 15,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  textHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 10,
  },
  title: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
    color: 'gray',
  },
  touch: {
    backgroundColor: 'green',
    width: '75%',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {color: 'white', fontSize: 18, fontWeight: '700'},
});
