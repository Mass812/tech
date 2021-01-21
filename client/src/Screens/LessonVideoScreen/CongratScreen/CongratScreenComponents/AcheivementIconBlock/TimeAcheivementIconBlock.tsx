import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';

interface TimeAcheivementIconBlockProps {
  minutes: number;
  seconds: number;
}

const TimeAcheivementIconBlock: React.FC<TimeAcheivementIconBlockProps> = ({
  minutes,
  seconds,
}) => {
  // const [minutesCalc, setMinutesCalc] = useState<string>('0');
  // const [remainingSecondsCalc, setRemainingSecondsCalc] = useState<string>('0');

  // useEffect(() => {
  //   getMinutesFromSeconds(accumulativeTime);
  // }, [accumulativeTime]);

  // function getMinutesFromSeconds(time: number) {
  //   const minutes = time >= 60000 ? Math.floor(time / 60000) : 0;
  //   const y = Math.floor(time - minutes * 60000);
  //   const seconds = (y / 1000).toFixed();

  //   setMinutesCalc(minutes.toString());
  //   setRemainingSecondsCalc(seconds);
  // }

  return (
    <View style={styles.iconColumn}>
      <View style={styles.iconHalo}>
        <FontAwesomeIcon icon={faClock} size={30} color={'#0896a3'} />
      </View>
      <Text style={styles.detailTitle}>Time</Text>
      <View style={styles.detailColumn}>
        <View style={styles.detailRow}>
          <Text style={styles.detalColored}>{minutes}</Text>
          <Text style={styles.detailRegular}> min</Text>
          <Text style={styles.detalColored}> {seconds} </Text>
          <Text style={styles.detailRegular}>sec</Text>
        </View>
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
  detailColumn: {
    height: 36,
    marginTop: 4,
    justifyContent: 'flex-start',
  },
  detailTitle: {
    margin: 0,
    fontWeight: '700',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  detalColored: {
    color: 'teal',
  },
  detailRegular: {
    color: 'darkgrey',
  },
});
export default TimeAcheivementIconBlock;
