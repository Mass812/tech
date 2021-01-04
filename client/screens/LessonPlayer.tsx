import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import PlayingNext from '../Components/VideoComponents/PlayingNext';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('window').height;

interface LessonPlayerProps {
  key: string;
  name: string;
  params: Params;
}

type Params = {
  contentUrl: string;
  weekNumber: string;
  lessonNumber: string;
  courseName: string;
  instructor: string;
  title: string;
};
interface playbackShape {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = () => {
  let player = useRef<HTMLInputElement>('player');
  const nav = useNavigation();
  const route = useRoute<LessonPlayerProps>();
  let {title, contentUrl, instructor, weekNumber, lessonNumber} = route.params;
  const [isBuffering, setIsBuffering] = useState(false);
  const [errrorMessage, setErrorMessage] = useState('');
  const [progressData, setProgressData] = useState<playbackShape>({
    currentTime: 0,
    playableDuration: 34.6,
    seekableDuration: 888,
  });
  const [pause, setPause] = useState(false);

  console.log('lesson player url: ', contentUrl);

  return (
    <View style={styles.container}>
      <View style={styles.videoParentPortrait}>
        <Video
          source={{
            uri: contentUrl,
          }}
          onLoad={() => setIsBuffering(false)}
          //    onEnd={() => nav.goBack()}
          onBuffer={() => setIsBuffering(true)} // Callback when remote video is buffering
          onError={() => console.log('error')} // Callback when video cannot be loaded
          style={styles.videoPortrait}
          paused={pause}
          fullscreen={false}
          // fullscreenOrientation={'portrait'}
          onProgress={(currentTime: any) => setProgressData({...currentTime})}
          resizeMode={'cover'}
        />
        <View
          style={{
            // display: 'flex',
            flexDirection: 'row',
            padding: 14,
            alignContent: 'center',
            // minWidth: '100%',
            width: width,
            height: 100,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 23, marginTop: 10, color: 'green'}}>
              Lesson Name Here
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{fontSize: 16, color: 'grey'}}>Length Here</Text>
              <Text style={{fontSize: 18, alignSelf: 'center'}}> •</Text>
              <Text style={{fontSize: 16, color: 'grey'}}>Target Here</Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              paddingTop: 25,
              justifyContent: 'flex-start',
            }}>
            <FontAwesomeIcon icon={faPlayCircle} size={30} />
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.playingNextParent}>
          <PlayingNext />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    // justifyContent: 'center',
    //  alignContent: 'center',
  },

  videoParentPortrait: {
    display: 'flex',
    flexDirection: 'column',

    width: width,
    justifyContent: 'flex-start',
  },
  videoPortrait: {
    minHeight: 400,
    // width,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },

  playingNextParent: {
    display: 'flex',
    height: height - 400,
  },
});
export default LessonPlayer;
