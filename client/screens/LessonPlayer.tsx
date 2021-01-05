import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
  length?: string;
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

  let {
    title,
    contentUrl,
    instructor,
    weekNumber,
    lessonNumber,
    length,
  } = route.params;

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
          onEnd={() => nav.goBack()}
          onBuffer={() => setIsBuffering(true)} // Callback when remote video is buffering
          onError={() => console.log('error')} // Callback when video cannot be loaded
          style={styles.videoPortrait}
          paused={pause}
          fullscreen={false}
          // fullscreenOrientation={'portrait'}
          onProgress={(currentTime: any) => setProgressData({...currentTime})}
          resizeMode={'cover'}
        />
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
