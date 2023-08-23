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
import EmployeePerformance from '../dashboard/EmployeePerformance';
import Outcome from '../screen/Outcome';
import Logout from '../screen/Logout';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({userData, ...props}) => {
  const {name, email, id} = userData;

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
    </DrawerContentScrollView>
  );
};
const DrawerNavigation = ({route}) => {
  const userData = route.params.userData;

  return (
    <Drawer.Navigator
      backBehavior="none"
      initialRouteName="JobList"
      drawerContent={props => (
        <CustomDrawerContent {...props} userData={userData} />
      )}>
      <Drawer.Screen name="Profile" options={{headerShown: false}}>
        {props => <Profile {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="JobList" options={{headerShown: false}}>
        {props => <JobList {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Create Lead" options={{headerShown: false}}>
        {props => <CreateJobList {...props} userData={userData} />}
      </Drawer.Screen>
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
      {/* <Drawer.Screen
        name="OutCome"
        component={Outcome}
        options={{headerShown: false}}
      /> */}
      <Drawer.Screen
        name="Performance"
        component={EmployeePerformance}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
