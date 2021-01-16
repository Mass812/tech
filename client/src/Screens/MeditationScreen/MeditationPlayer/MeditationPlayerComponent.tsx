import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {MediaPlayerComponentProps} from '../../../Interfaces/MeditationPlayerScreenInterface';

let height = Dimensions.get('screen').height;

const MediaPlayerComponent: React.FC<MediaPlayerComponentProps> = ({
  instructor,
  title,
  length,
  description,
  pause,
  onPressArrowBack,
  onPressPause,
  contentImg,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <View style={styles.detailGroup}>
          <Text style={styles.headerText1}> {instructor} </Text>
          <Text style={styles.title}> {title}</Text>
          <Text style={styles.textTime}> {length} </Text>
          <Text style={styles.headerText2}> {description}</Text>
        </View>

        <View style={styles.playButtonRow}>
          <TouchableOpacity style={styles.playButton} onPress={onPressPause}>
            {!pause ? (
              <FontAwesomeIcon icon={faPauseCircle} color={'white'} size={52} />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} color={'white'} size={52} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={{
          uri: contentImg,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  trackbarParent: {
    width: '100%',
    height: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
  },
  trackbar: {
    color: 'blue',
  },

  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    textShadowColor: 'black',
    textShadowRadius: 15,
    margin: 7,
  },
  headerText1: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  headerText2: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'black',
    textShadowRadius: 10,
    marginTop: 50,
  },
  textTime: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 5,
    marginBottom: 12,
  },
  video: {
    width: 0,
    height: 0,
  },
  image: {
    position: 'absolute',
    height: height,
    width: '100%',
    resizeMode: 'stretch',
    zIndex: 0,

    opacity: 0.76,
  },
  headerBlock: {
    display: 'flex',
    flexDirection: 'column',

    minHeight: height,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 3,
    margin: 25,
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column',

    zIndex: 3,
  },
  playButtonRow: {
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    zIndex: 5,
    marginBottom: 50,
    top: -70,
  },
  playButton: {
    height: 60,
    width: 40,
    zIndex: 5,
  },
  backButton: {
    height: 100,
    width: 100,
  },
});
export default MediaPlayerComponent;
