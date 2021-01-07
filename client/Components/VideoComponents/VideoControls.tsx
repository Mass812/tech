import React, {useReducer} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimesCircle,
  faExpandAlt,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

const width = Dimensions.get('screen').width;

interface VideoControlsProps {
  onPressPause: () => void;
  onPressClose: () => void;
  onPressFullScreen: () => void;
  onPressOutOfFocus: () => void;
  videoScreenTapped: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  onPressPause,
  onPressClose,
  onPressFullScreen,
  onPressOutOfFocus,
  videoScreenTapped,
}) => {
  return (
    <TouchableOpacity style={styles.parent} onPress={onPressOutOfFocus}>
      {videoScreenTapped ? (
        <>
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.leftIcon} onPress={onPressClose}>
              <FontAwesomeIcon icon={faTimesCircle} size={17} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={onPressFullScreen}>
              <FontAwesomeIcon icon={faExpandAlt} size={17} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.middleIcon} onPress={onPressPause}>
            <FontAwesomeIcon icon={faPause} size={36} color={'black'} />
          </TouchableOpacity>
        </>
      ) : null}
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
    left: 25,
    right: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  middleIcon: {
    position: 'absolute',
    top: 200 - 18,
    left: width / 2 - 18,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 30,
    opacity: 0.6,

    //zIndex: 2,
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
