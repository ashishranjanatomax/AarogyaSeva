import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';

const LeadClosed = ({navigation}) => {
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
        Lead Closed List
      </Text>
    </View>
  );
};

export default LeadClosed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
