import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import photoArray from './HardCodedMegaArrayData';

interface MegaProps {}

interface FlatListProps {
  photoArray: MegaProps[];
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Mega: React.FC<MegaProps> = () => {
  const nav = useNavigation();

  let displayPhotos = photoArray.map((n, idx) => (
    <View key={idx + n.id} style={styles.imageParent}>
      <Image style={styles.image} source={n.photo} />
      <Text style={styles.instructor}>{n.instructor}</Text>
      <Text style={styles.title}>{n.title}</Text>
      <Text style={styles.bulletPoints}>{n.bulletPoints}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          nav.navigate('ProgramDetail', {courseName: n.title});
        }}>
        <Text style={styles.buttonText}>{n.buttonText}</Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      snapToAlignment={'start'}>
      {displayPhotos}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageParent: {
    height: height * 0.7,
    maxHeight: height * 0.7,
    width: width,
    maxWidth: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    height: height * 0.7,
    width: width,
    maxWidth: width,
    zIndex: -1,
    resizeMode: 'cover',
  },
  instructor: {
    fontSize: 17,
    color: 'white',
    top: 0.2,
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  title: {
    // flex:1,
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    width: width,
    top: 0.2,
    marginTop: 5,
    marginBottom: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  bulletPoints: {
    marginTop: 4,
    marginBottom: 25,
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  button: {
    position: 'relative',
    minWidth: width * 0.3,
    height: 34,
    marginBottom: 60,
    justifyContent: 'center',
    backgroundColor: 'rgb(239,150,128)',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,

    // textAlign: 'center',
    // top: height * 0.400,
    //left:  width* -.5 + 90 ,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default Mega;
