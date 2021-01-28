import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {VideoStore} from '../../../../Context/LessonVideoContext';

interface InstructorOutfitBlockProps {}

const InstructorOutfitBlock: React.FC<InstructorOutfitBlockProps> = () => {
  const {state, dispatch} = React.useContext(VideoStore);

  let name = state.instructor.split(' ')[0];
  let capitalizedName = name.toUpperCase();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizedName}'S OUTFIT</Text>
      <View style={styles.outfitRow}>
        <View style={styles.imgBlock}>
          <Image style={styles.img} source={{uri: state.outfitTopImgUrl}} />
          <Text style={styles.outfitText}>{state.outfitTopName}</Text>
        </View>
        <View style={styles.imgBlock}>
          <Image style={styles.img} source={{uri: state.outfitBottomImgUrl}} />
          <Text style={styles.outfitText}>{state.outfitBottomName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //     flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  outfitRow: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',

    width: '100%',
    justifyContent: 'flex-start',
    padding: 1,
  },
  title: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 15,
    marginTop: 40,
    letterSpacing: 4,
  },
  imgBlock: {
    margin: 10,
    justifyContent: 'flex-start',
    minHeight: 180,
    width: 140,
  },
  img: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  outfitText: {
    fontSize: 16,
    width: 130,
    color: 'grey',
  },
});
export default InstructorOutfitBlock;
