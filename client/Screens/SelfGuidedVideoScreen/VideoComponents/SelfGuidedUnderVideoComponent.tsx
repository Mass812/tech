import Slider from '@react-native-community/slider';
import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Image, Button} from 'react-native';
import {SgVideoStore} from '../SelfGuidedVideoScreen';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import SelfGuidedSlider from './SelfGuidedSlider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface IndependentUnderVideoComponentProps {
  time?: number;
  title?: string;
  exerciseCount?: number;
  exerciseNumber?: number;
  id?: string;
  data: Data[];
}

type Data = {
  title: string;
  length: number;
  contentUrl: string;
  sectionNumber: number;
  id: number;
};

const IndependentUnderVideoComponent: React.FC<IndependentUnderVideoComponentProps> = ({
  data,
}) => {
  let {state, dispatch} = useContext(SgVideoStore);

  let hold: string[] = [];
  useEffect(() => {
    data.map((n) => {
      hold.push(n.contentUrl);
    });
    dispatch({type: 'VIDEO_PLAYING', payload: data[0].contentUrl ?? ''});
    dispatch({type: 'SECTION_NUMBER', payload: 0});
    dispatch({type: 'EXERCISE_SECTIONS', payload: hold});
  }, []);

  const playThisVideo = (e: EventTarget, sectionNumber: number) => {
    let value = sectionNumber - 1;
    dispatch({type: 'VIDEO_PLAYING', payload: data[value].contentUrl});
    dispatch({type: 'SECTION_NUMBER', payload: sectionNumber - 1});
  };

  const renderItem = ({item}: {item: Data}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.tableRow}
          onPress={(e: EventTarget) => playThisVideo(e, item.sectionNumber)}>
          <View style={styles.detailRow}>
            <Text style={styles.time}>{item.length / 1000} seconds</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {state.sectionNumber === item.sectionNumber - 1 ? (
            <SelfGuidedSlider />
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          initialNumToRender={10}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 1200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
  },

  tableRow: {
    width: width,
    height: 75,
    borderRightColor: '#e0e0e0',
    //borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 0,
    //  justifyContent: 'space-between',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 75,
  },

  title: {
    fontSize: 16,
    color: 'black',
    marginLeft: 25,
  },
  time: {
    fontSize: 16,
    color: 'teal',
    marginLeft: 12,
  },
});
export default IndependentUnderVideoComponent;
