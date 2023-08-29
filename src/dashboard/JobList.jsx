import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../component/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const JobList = ({navigation, userData}) => {
  // console.log('Line 14', userData.id);
  const [joblist, setJobList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  
  console.log(userData, 'Line 16');

  const fetchData = () => {
    setIsLoading(true);
    fetch(
      `https://crm.aarogyaseva.co.in/api/followuplistbyemployeeid/${userData.id}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          const sortedJobList = data.joblist_and_followup_data.sort((a,b)=> new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setJobList(sortedJobList);
        }
      })
      .catch(error => {
        console.log('Error Fetching Data:', error);
      })
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  const renderList = ({item}) => {
    const followUpDate = new Date(item.followups[0]?.visitdate);
    const currentDate = new Date();

    let label ="";
   if(followUpDate > currentDate) {
    label="Upcomimg";
   }else if(
    followUpDate.getDate() === currentDate.getDate() &&
    followUpDate.getMonth () === currentDate.getMonth() &&
    followUpDate.getFullYear() === currentDate.getFullYear()
   ){
    label=`Today ${followUpDate.toLocaleTimeString([],{
      hour:'2-digit',
      minute:'2-digit',
    })}`;
  }
  else{
    label="Pending"
  }
   
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainView}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <MaterialCommunityIcons name="label" size={24} color={label.includes('Pending') ? 'red':'green'}/>
            <Text style={{ color: label.includes('Pending') ? 'red' : 'green' }}>{label}</Text>
            <Text style={{ color: 'black' }}>Date: {item.followups[0]?.updated_at} </Text>
          </View>
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
                Linking.openURL(`tel:${item.mobile}`).catch(error => {
                  console.log('Error While Opening Dialer', error);
                })
              }>
              <FontAwesome name="phone" size={18} color="#2e509d" />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Address : - {item.address}</Text>
          <Text style={styles.text}>Purpose : - {item.prospect}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>
              <Text>Required Action: - </Text>
              {item.followup}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsScreen', {
                  jobData: item,
                  userId: userData.id,
                  followups: item.followups,
                })
              }
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
      {isLoading ? (
        <Image
          source={require('../../assests/aarogyasevalogo.png')}
          resizeMode="contain"
          style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',
            alignSelf:'center',
            width:'75%'
          }}
        />
      ) : (
        <FlatList
          data={joblist}
          renderItem={renderList}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
  text: {
    fontSize: 18, 
    fontWeight: '600',
    color:'black'
  },
});
