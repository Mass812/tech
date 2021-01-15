import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faDumbbell, faBolt} from '@fortawesome/free-solid-svg-icons';

interface AcheivementIconBlockProps {
  icon: any;

  title: string;
  detailOne: string;
  detailTwo?: string;
}

const AcheivementIconBlock: React.FC<AcheivementIconBlockProps> = ({
  icon,

  title,
  detailOne,
  detailTwo,
}) => {
  return (
    <View style={styles.iconColumn}>
      <View style={styles.iconHalo}>
        <FontAwesomeIcon icon={icon} size={30} color={'#0896a3'} />
      </View>
      <Text style={styles.detailTitle}>{title}</Text>
      <View style={styles.detailColumn}>
        <Text style={styles.detailOne}>{detailOne}</Text>
        <Text style={styles.detailTwo}>{detailTwo}</Text>
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
    backgroundColor: '#83c0c9',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  detailColumn: {
    height: 36,
    marginTop: 4,
    justifyContent: 'space-around',
  },
  detailTitle: {
    margin: 0,
    fontWeight: '700',
  },
  detailOne: {
    fontWeight: '500',
    color: 'red',
  },
  detailTwo: {
    fontWeight: '500',
    color: 'seagreen',
  },
});
export default AcheivementIconBlock;
