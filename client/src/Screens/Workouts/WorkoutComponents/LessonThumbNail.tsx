import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface LessonThumbnailProps {
  text: string;
  onPress: () => void;
}

const LessonThumbnail: React.FC<LessonThumbnailProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.parent}>
        <View style={styles.cardBlock}>
          <Image
            source={require('../../../Assets/fitness_mega_4.jpg')}
            style={styles.image}
          />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    width: 175,
    height: 120,
    margin: 10,
  },
  cardBlock: {
    display: 'flex',
    width: 175,
    height: 120,
    justifyContent: 'center',
    backgroundColor: 'tan',
    textAlign: 'center',
    borderRadius: 11,
  },
  image: {
    width: 175,
    height: 120,
    position: 'absolute',
    borderRadius: 11,
    opacity: 0.87,
  },
  text: {
    fontSize: 21,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    textShadowColor: 'black',
    textShadowRadius: 9,
  },
});
export default LessonThumbnail;
