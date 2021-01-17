import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {VideoStore} from '../../../LessonVideoScreen';
import CourseCompletedDetailBlock from './CourseCompletedDetailBlock';

interface CourseCompletedDetailBannerProps {}

const CourseCompletedDetailBanner: React.FC<CourseCompletedDetailBannerProps> = () => {
  const {state, dispatch} = React.useContext(VideoStore);

  return (
    <View style={styles.container}>
      <CourseCompletedDetailBlock
        coloredDetail={state.instructor}
        regDetail={'trainer'}
      />
      <CourseCompletedDetailBlock
        coloredDetail={state.intensity ?? '9'}
        regDetail={'intensity'}
      />
      <CourseCompletedDetailBlock
        coloredDetail={state.totalPlayerTimeAsString}
        regDetail={'duration'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 1,
  },
});
export default CourseCompletedDetailBanner;
