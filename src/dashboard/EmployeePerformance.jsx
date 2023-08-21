import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';

const EmployeePerformance = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>Employee Performance </Text>
      <ScrollView></ScrollView>
    </View>
  );
};

export default EmployeePerformance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: '#2e509d',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
});
