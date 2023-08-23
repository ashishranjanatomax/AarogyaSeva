import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DetailsScreen = ({navigation, route}) => {
  const {jobData, userId, followups} = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error Logging out:', error);
    }
  };
  console.log('Line 15', followups);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      // Simulating a delay for demonstration purposes
      setRefreshing(false);
    }, 2000);
  };

  const renderFollowupItem = ({item}) => (
    <View style={styles.followupItem}>
      <Text style={styles.followupText}>Date: {item.visitdate}</Text>
      <Text style={styles.followupText}>
        Follow Up Methood: {item.followupmethods}
      </Text>
      <Text style={styles.followupText}>Discussion Notes: {item.notes}</Text>
      <Text style={styles.followupText}>Status: {item.outcome}</Text>

      {/* Render other followup data here */}
    </View>
  );
  return (
    <View style={{flex: 1}}>
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
      <Text style={styles.heading}>Candidate Details</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flexDirection: 'column',
            marginVertical: 25,
            marginHorizontal: 50,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            gap: 15,
          }}>
          <Image source={require('../../assests/user-image.png')} />
          <Text style={styles.text}>
            Name: - {jobData.title} {jobData.firstname} {jobData.middlename}{' '}
            {jobData.lastname}
          </Text>
          <Text style={styles.text}>Address: - {jobData.address}</Text>
          <Text style={styles.text}>Background: - {jobData.background}</Text>
          <Text style={styles.text}>
            Background Sector Name: - {jobData.backgroundsector}
          </Text>
          <Text style={styles.text}>Email: - {jobData.email}</Text>
          <Text style={styles.text}>Mobile Number: - {jobData.mobile}</Text>
          <Text style={styles.text}>Discussion: - {jobData.discussion}</Text>
          <Text style={styles.text}>
            Date For Follow Up: - {jobData.dateforfollowup}
          </Text>
          <Text style={styles.text}>
            Time For Follow Up: - {jobData.timeforfollowup}
          </Text>

          <Text style={styles.text}>Follow Up: - {jobData.followup}</Text>
          <Text style={styles.text}>
            GeoGraphical Location: - {jobData.geographicallocation}
          </Text>
          <Text style={styles.text}>Landmark: - {jobData.landmark}</Text>
          <Text style={styles.text}>Middle Name: - Ashish Ranjan</Text>
          <Text style={styles.text}>
            Purpose Amount: - {jobData.purposeamount}
          </Text>
          <Text style={styles.text}>Source: - {jobData.source}</Text>
          <Text style={styles.text}>Purpose: - {jobData.purpose}</Text>
          <Text style={styles.text}>Outcome: - {jobData.outcome}</Text>
          <Text style={styles.text}>ID: - {jobData.id}</Text>
          <Text style={styles.text}>Employee Id : - {userId}</Text>
        </View>

        <View style={styles.followupsContainer}>
          <Text style={styles.heading}>Follow Ups</Text>

          <FlatList
            data={followups}
            renderItem={renderFollowupItem}
            keyExtractor={item => item.id.toString()}
            style={{flex: 1}}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OutCome', {
              joblistId: jobData.id,
              userId: userId,
            })
          }
          style={styles.touchableOpacityContainer}>
          <Text style={styles.LoginText}>Add Next Follow Up </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2e509d',
  },
  heading: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
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
  text: {
    fontWeight: '700',
    fontSize: 18,
  },
  followupsContainer: {
    marginVertical: 25,
    marginHorizontal: 50,
  },
  followupItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  followupText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
