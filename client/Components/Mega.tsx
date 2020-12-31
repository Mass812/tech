import { CardStyleInterpolators } from '@react-navigation/stack';
import * as React from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';


interface MegaProps {}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Mega: React.FC<MegaProps> = () => {
  let photoOne = require('./Assets/fitness_mega_1.jpeg');
  let photoTwo = require('./Assets/fitness_mega_2.jpg');
  let photoThree = require('./Assets/fitness_mega_3.png');

  let photoArray = [
    {
      photo: photoOne,
      instructor: 'Amy Green',
      bulletPoints: '4 Weeks ∑ 20 Classes',
      id: 1,
      title: 'HIIT & Strength',
      buttonText: 'View Program',
    },
    {
      photo: photoTwo,
      instructor: 'Myranny Gupta',
      bulletPoints: 'Relieve Stress & Tension',
      id: 2,
      title: 'Focus Energy',
      buttonText: 'Join Now',
    },
    {
      photo: photoThree,
      instructor: 'Rachele Lyle',
      bulletPoints: 'Meditative Moments',
      id: 3,
      title: 'Find Peace',
      buttonText: 'Try Meditation',
    },
  ];

  let displayPhotos = photoArray.map((n, idx) => (
    <View style={styles.imageParent} key={n.id}>
      <Image style={styles.image} source={n.photo} />
      <Text style={styles.instructor}>{n.instructor}</Text>
      <Text style={styles.title}>{n.title}</Text>
      <Text style={styles.bulletPoints}>{n.bulletPoints}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{n.buttonText}</Text>
      </TouchableOpacity>
    
    </View>
  ));

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width} //your element width
      snapToAlignment={'center'}>
      {displayPhotos}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageParent: {
    height: height * 0.6,
    maxHeight: height * 0.6,
    width: width,
    maxWidth: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    height: height * 0.6,
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
