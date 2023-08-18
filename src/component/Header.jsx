import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const Header = ({navigation}) => {
  const Drawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Drawer}>
        <FontAwesome name="bars" size={50} color="#00bc4c" />
      </TouchableOpacity>

      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={{width: '50%', height: 100}}
      />
      <Entypo name="log-out" size={50} color="#f08518" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
});
