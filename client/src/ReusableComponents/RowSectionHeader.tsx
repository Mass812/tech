import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface RowSectionHeaderProps {
  text: string;
}

const RowSectionHeader: React.FC<RowSectionHeaderProps> = ({text}) => {
  return (
    <View style={styles.sectionTitleParent}>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: 'darkgrey',
    marginLeft: 12,
    marginTop: 23,
    textAlign: 'left',
  },
  sectionTitleParent: {
    //height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '100%',
  },
});
export default RowSectionHeader;
