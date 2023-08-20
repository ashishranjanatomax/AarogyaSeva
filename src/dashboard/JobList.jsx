import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import JobListData from '../../assests/JobList.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const JobList = ({navigation}) => {
  const [joblist, setJobList] = useState(JobListData);

  // const OpenDialer = phoneNumber => {
  //   Linking.openURL(`tel:${phoneNumber}`).catch(error => {
  //     console.log('Error While Opening Dialer', error);
  //   });
  // };
  const renderList = ({item}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainView}>
          <Text style={styles.text}>
            <Text>Name :- </Text>
            {item.Customer_Name}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              <Text>Mobile Number: - </Text>
              {item.Customer_MobileNumber}
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
          <Text style={styles.text}>Address : - {item.Address}</Text>
          <Text style={styles.text}>Purpose : - {item.Purpose}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              <Text>Required Action: - </Text>
              {item.RequiredAction}
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
        keyExtractor={item => item.Customer_ID}
      />
    </View>
  );
};

export default JobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
