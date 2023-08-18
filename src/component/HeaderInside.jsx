import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const HeaderInside = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assests/aarogyasevalogo.png')}
        resizeMode="contain"
        style={{
          width: '50%',
          height: 100,
          borderBottomWidth: 2,
          borderColor: 'red',
        }}
      />
    </View>
  );
};

export default HeaderInside;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#00bc4c',
  },
});
