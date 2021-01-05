import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface IndependentUnderVideoComponentProps {}

const IndependentUnderVideoComponent: React.FC<IndependentUnderVideoComponentProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        this is the IndependentUnderVideoComponent component
      </Text>
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
export default IndependentUnderVideoComponent;
