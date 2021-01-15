import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface CongratScreenProps {}

const CongratScreen: React.FC<CongratScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Work, USER_NAME</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default CongratScreen;
