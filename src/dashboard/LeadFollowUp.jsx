import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../component/Header';

const LeadFollowUp = ({navigation}) => {
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
        Lead Follow Up List
      </Text>
    </View>
  );
};

export default LeadFollowUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
