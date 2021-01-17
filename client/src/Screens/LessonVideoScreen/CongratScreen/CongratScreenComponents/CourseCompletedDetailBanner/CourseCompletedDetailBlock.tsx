import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface CourseCompletedDetailBlockProps {
  coloredDetail: string;
  regDetail: string;
}

const CourseCompletedDetailBlock: React.FC<CourseCompletedDetailBlockProps> = ({
  coloredDetail,
  regDetail,
}) => {
  return (
    <View style={styles.detailColumn}>
      <Text style={styles.detalColored}>{coloredDetail}</Text>
      <Text style={styles.detailRegular}>{regDetail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailColumn: {
    height: '100%',
    marginTop: 4,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  detalColored: {
    color: 'teal',
    fontSize: 15,
    paddingBottom: 4,
  },
  detailRegular: {
    color: 'darkgrey',
  },
});
export default CourseCompletedDetailBlock;
