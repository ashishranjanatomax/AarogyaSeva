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
import LeadClosed from '../dashboard/LeadClosed';
import EmployeePerformance from '../dashboard/EmployeePerformance';
import Logout from '../screen/Logout';
import History from '../dashboard/History';
import AdminJobAssigned from '../dashboard/AdminJobAssigned';
import SharedLeadbyEmployee from '../dashboard/SharedLeadbyEmployee';
import LeadHistory from '../dashboard/LeadHistory';
import TimeSheet from '../dashboard/TimeSheet';

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
        <Text style={{marginTop: 10, fontSize: 18,color:'black'}}>{name}</Text>
        <Text style={{color:'black'}}>{email}</Text>
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
      <Drawer.Screen name='Assigned Job' options={{headerShown:false}}>
        {props=> <AdminJobAssigned {...props} userData={userData}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Create Lead" options={{headerShown: false}}>
        {props => <CreateJobList {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Shared Lead Creation" options={{headerShown: false}}>
        {props => <SharedLeadbyEmployee {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Total Worked " options={{headerShown: false}}>
        {props => <History {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Performance " options={{headerShown: false}}>
        {props => <EmployeePerformance {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Closed Lead " options={{headerShown: false}}>
        {props => <LeadClosed {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Lead History " options={{headerShown: false}}>
        {props => <LeadHistory {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Time Sheet " options={{headerShown: false}}>
        {props => <TimeSheet {...props} userData={userData} />}
      </Drawer.Screen>
      <Drawer.Screen name="Log Out " options={{headerShown: false}}>
        {props => <Logout {...props} userData={userData} />}
      </Drawer.Screen>
      
      
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
