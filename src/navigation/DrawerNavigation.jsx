import {View, Image, Text, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import JobList from '../dashboard/JobList';
import CreateJobList from '../dashboard/CreateJobList';
import Profile from '../dashboard/Profile';
import LeadFollowUp from '../dashboard/LeadFollowUp';
import LeadClosed from '../dashboard/LeadClosed';
import Outcome from '../screen/Outcome';
import EmployeePerformance from '../dashboard/EmployeePerformance';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({userData, ...props}) => {
  const {name, email} = userData;
  // const [userName, setUserName] = useState('ashishranjanmonal');
  // const [email, setEmail] = useState('aviashishranjan@gmail.com');
  const [profileImage, setProfileImage] = useState(
    'https://avatars.githubusercontent.com/u/52354895?v=4',
  );
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <Image
          source={{uri: profileImage}}
          style={{width: 80, height: 80, borderRadius: 40}}
        />
        <Text style={{marginTop: 10, fontSize: 18}}>{name}</Text>
        <Text>{email}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => Alert.alert('Log Out Successfully')}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigation = ({route}) => {
  const userData = route.params.userData;
  console.log(userData.name, 'Line 50');
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      initialRouteName="Job List"
      drawerContent={props => (
        <CustomDrawerContent {...props} userData={userData} />
      )}>
      <Drawer.Screen name="Profile" options={{headerShown: false}}>
        {props => <Profile {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Job List"
        component={JobList}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Create Lead"
        component={CreateJobList}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Lead Follow Up"
        component={LeadFollowUp}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Lead Closed"
        component={LeadClosed}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="OutCome"
        component={Outcome}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Performance"
        component={EmployeePerformance}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
