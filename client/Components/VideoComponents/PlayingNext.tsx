import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RowSectionHeader from '../ReusableComponents/RowSectionHeader';

interface PlayingNextProps {}

const PlayingNext: React.FC<PlayingNextProps> = () => {
  return (
    <View style={styles.container}>
      <RowSectionHeader text={'Recommended for you'} />
      <View style={styles.tableRow}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tableRow: {
    width: '100%',
    height: 150,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default PlayingNext;
