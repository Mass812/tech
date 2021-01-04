import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';

interface ProfileHeaderBannerProps {}

const ProfileHeaderBanner: React.FC<ProfileHeaderBannerProps> = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.userEditBar}>
        <View>
          <FontAwesomeIcon icon={faCog} size={22} color={'grey'} />
        </View>
        <View>
          <Text style={styles.editText}>Edit</Text>
        </View>
      </View>
      <Text style={styles.title}>USERNAME</Text>
      <View style={styles.split}>
        <View style={styles.detailColumn}>
          <Text style={styles.dataPoints}>5 ft 5 in.</Text>
          <Text>Height</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.dataPoints}>5 lbs.</Text>
          <Text>Weight</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  userEditBar: {
    //display: 'flex',
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editText: {
    fontSize: 18,
    color: 'grey',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  split: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  detailColumn: {
    margin: 35,
    alignItems: 'center',
  },
  dataPoints: {
    color: '#0896a3',
    fontSize: 20,
  },
});
export default ProfileHeaderBanner;
