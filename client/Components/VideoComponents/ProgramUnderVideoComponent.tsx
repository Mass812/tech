import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface ProgramUnderVideoComponentProps {}

const ProgramUnderVideoComponent: React.FC<ProgramUnderVideoComponentProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        this is the ProgramUnderVideoComponent component
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
export default ProgramUnderVideoComponent;
