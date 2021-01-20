import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimesCircle, faMusic} from '@fortawesome/free-solid-svg-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SgVideoStore} from '../../../Context/SgVideoContext';

const width = Dimensions.get('screen').width;

interface VideoControlsProps {}

const VideoControls: React.FC<VideoControlsProps> = () => {
  let {state, dispatch} = useContext(SgVideoStore);

  const handleClose = () => {
    dispatch({type: 'PAUSED', payload: true});
  };

  const hamdleSpotify = () => {
    // side view screen
  };

  const handlePressScreen = () => {
    let prevVal = !state.paused;
    dispatch({type: 'PAUSED', payload: prevVal});
  };

  return (
    <TouchableOpacity style={styles.parent} onPress={handlePressScreen}>
      <>
        <View style={styles.topIcons}>
          <TouchableOpacity style={styles.leftIcon} onPress={handleClose}>
            <FontAwesomeIcon icon={faTimesCircle} size={17} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIcon} onPress={hamdleSpotify}>
            <FontAwesomeIcon icon={faMusic} size={17} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.timerParent}>
          <Text style={styles.timer}>{state.currentPlayerTimeAsString}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    display: 'flex',
    position: 'absolute',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 55,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topIcons: {
    position: 'absolute',
    top: 56,
    left: 12,
    right: 22,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 24,
  },
  timerParent: {
    position: 'absolute',
    left: 12,
    bottom: 0,
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
    width: width - 20,
    color: 'white',
    fontSize: 21,
    shadowColor: 'black',

    shadowRadius: 2,
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
