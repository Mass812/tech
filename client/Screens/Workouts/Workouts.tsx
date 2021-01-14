import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import LessonThumbnail from './WorkoutComponents/LessonThumbNail';

interface CategoryLessonsProps {
  text: string;
}

const CategoryLessons: React.FC<CategoryLessonsProps> = ({text}) => {
  const nav = useNavigation();

  return (
    <ScrollView>
      <>
        <View style={styles.container}>
          <>
            {/* <LessonThumbnail
            text={'Barre'}
            onPress={() => nav.navigate('CategoryLessons', {category: 'Barre'})}
          /> */}
            <LessonThumbnail
              text={'Cardio'}
              onPress={() =>
                nav.navigate('CategoryLessons', {category: 'Cardio'})
              }
            />
            {/* <LessonThumbnail
            text={'Dance'}
            onPress={() => nav.navigate('CategoryLessons', {category: 'Dance'})}
          /> */}
            <LessonThumbnail
              text={'HIIT'}
              onPress={() =>
                nav.navigate('CategoryLessons', {category: 'HIIT'})
              }
            />
            <LessonThumbnail
              text={'Meditations'}
              onPress={() => nav.navigate('Meditation')}
            />
            <LessonThumbnail
              text={'Pilates'}
              onPress={() =>
                nav.navigate('CategoryLessons', {category: 'Pilates'})
              }
            />
            {/* <LessonThumbnail
            text={'Recovery'}
            onPress={() =>
              nav.navigate('CategoryLessons', {category: 'Recovery'})
            }
          />
          <LessonThumbnail
            text={'Strength'}
            onPress={() =>
              nav.navigate('CategoryLessons', {category: 'Strength'})
            }
          />
          <LessonThumbnail
            text={'Toning'}
            onPress={() =>
              nav.navigate('CategoryLessons', {category: 'Toning'})
            }
          />
          <LessonThumbnail
            text={'Yoga'}
            onPress={() => nav.navigate('CategoryLessons', {category: 'Yoga'})}
          /> */}
          </>
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  tabHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  tabBlock: {
    //height: 60,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  tabBlockTarget: {
    //height: 60,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    margin: 12,
  },
  tabText: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 2,
    paddingBottom: 4,
  },
});
export default CategoryLessons;
