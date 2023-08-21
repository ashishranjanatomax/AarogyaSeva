import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../component/Header';
import JobListData from '../../assests/JobList.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const JobList = ({navigation}) => {
  const [joblist, setJobList] = useState([]);

  useEffect(() => {
    // Fetch Data from the API
    fetch('https://crm.aarogyaseva.co.in/api/joblist')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setJobList(data.data);
        }
      })
      .catch(error => {
        console.log('Error Fetching Data:', error);
      });
  }, [joblist]);
  const renderList = ({item}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainView}>
          <Text style={styles.text}>
            <Text>Name :- </Text>
            {`${item.title} ${item.firstname} ${item.middlename} ${item.lastname}`}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              <Text>Mobile Number: - </Text>
              {item.mobile}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${item.Customer_MobileNumber}`).catch(
                  error => {
                    console.log('Error While Opening Dialer', error);
                  },
                )
              }>
              <FontAwesome name="phone" size={24} color="#2e509d" />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Address : - {item.address}</Text>
          <Text style={styles.text}>Purpose : - {item.purpose}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              <Text>Required Action: - </Text>
              {item.requiredAction}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('OutCome')}
              style={{
                backgroundColor: '#f08518',
                borderRadius: 15,
                height: 35,
                width: 100,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#2e509d', fontWeight: '500'}}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text
        style={{
          color: '#2e509d',
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 15,
        }}>
        Job List
      </Text>

      <FlatList
        data={joblist}
        renderItem={renderList}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: '85%',
    alignSelf: 'center',
    borderWidth: 5,
    borderRadius: 15,
    borderColor: 'white',
    marginVertical: 15,
    height: 'auto',
    shadowColor: 'black',
    elevation: 15,
    backgroundColor: 'white',
    marginBottom: 25,
    padding: 15,
  },
  text: {fontSize: 20, fontWeight: '600'},
});
