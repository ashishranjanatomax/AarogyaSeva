import {View, Image, Text, Alert} from 'react-native';
import React from 'react';
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

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <Image
          source={require('../../assests/user-image.png')}
          style={{width: 80, height: 80, borderRadius: 40}}
        />
        <Text style={{marginTop: 10, fontSize: 18}}>User Name</Text>
        <Text>Email@gmail.com</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => Alert.alert('Log Out Successfully')}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Job List"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
