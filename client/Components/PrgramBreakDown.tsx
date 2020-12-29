import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import PopularClassesCard from './PopularClassesCard';

interface ProgramBreakDownProps {
  photo: string;
}

const ProgramBreakDown: React.FC<ProgramBreakDownProps> = ({photo}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Program Breakdown</Text>
      <View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    color: 'green',
  },
});
export default ProgramBreakDown;
