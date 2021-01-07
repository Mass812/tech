import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimesCircle, faExpandAlt} from '@fortawesome/free-solid-svg-icons';

const width = Dimensions.get('screen').width;

interface VideoControlsProps {}

const VideoControls: React.FC<VideoControlsProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <FontAwesomeIcon icon={faTimesCircle} size={17} color="black" />
      </View>
      <View style={styles.rightIcon}>
        <FontAwesomeIcon icon={faExpandAlt} size={17} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    display: 'flex',
    position: 'absolute',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 55,

    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  leftIcon: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 25,
    opacity: 0.6,
  },
  rightIcon: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 25,
    opacity: 0.6,
  },
});
export default VideoControls;
