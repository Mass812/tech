import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
import {VideoStore} from '../LessonVideoScreen';

interface TitleBannerUnderVideoProps {}

const TitleBannerUnderVideo: React.FC<TitleBannerUnderVideoProps> = ({}) => {
  const {state, dispatch} = useContext(VideoStore);

  const handleSpotifyOnPress = () => {};
  console.log(state);
  return (
    <View style={styles.parent}>
      <View style={styles.twoColumns}>
        <Text style={styles.lessonTitle}>{state.title}</Text>
        <View style={styles.timeAndTargetBlock}>
          <Text style={styles.timeFont}>{state.totalPlayerTimeAsString}</Text>
          <Text style={styles.dot}> • </Text>
          <Text style={styles.targetFont}>Target Here</Text>
        </View>
      </View>

      <View style={styles.iconBlock}>
        <TouchableOpacity onPress={handleSpotifyOnPress}>
          <FontAwesomeIcon icon={faMusic} size={22} color={'teal'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  parent: {
    flexDirection: 'row',
    padding: 14,
    alignContent: 'center',
    width: '100%',
    height: 75,
  },
  twoColumns: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'space-between',
  },
  timeFont: {
    fontSize: 16,
    color: 'grey',
  },
  targetFont: {
    fontSize: 16,
    color: 'grey',
  },
  lessonTitle: {
    fontSize: 23,

    color: 'black',
  },
  timeAndTargetBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconBlock: {
    display: 'flex',
    paddingTop: 12,
    justifyContent: 'flex-start',
  },
  dot: {
    fontSize: 18,
    alignSelf: 'center',
  },
});
export default TitleBannerUnderVideo;
