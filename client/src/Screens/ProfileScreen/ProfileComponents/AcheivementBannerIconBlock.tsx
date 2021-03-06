import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faDumbbell, faBolt} from '@fortawesome/free-solid-svg-icons';

interface AcheivementIconBlockProps {
  icon: any;
  textSubject: string;
}

const AcheivementIconBlock: React.FC<AcheivementIconBlockProps> = ({
  icon,
  textSubject,
}) => {
  return (
    <View style={styles.iconColumn}>
      <View style={styles.iconHalo}>
        <FontAwesomeIcon icon={icon} size={30} color={'#0896a3'} />
      </View>
      <Text style={styles.detailTitle}>{textSubject}</Text>
      <View>
        <Text>3 hrs 12 min</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeRow: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 1,
  },
  iconColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 130,
    justifyContent: 'center',
    padding: 5,
  },
  iconHalo: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#abced4',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  detailTitle: {
    margin: 0,
  },
});
export default AcheivementIconBlock;
