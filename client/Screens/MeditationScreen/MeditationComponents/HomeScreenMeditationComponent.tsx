import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HomepageMeditationComponentProps {
  title: string;
  rowDetailOne: string;
  rowDetailTwo: string;
  img: string;
}

const HomepageMeditationComponent: React.FC<HomepageMeditationComponentProps> = ({
  title,
  rowDetailOne,
  rowDetailTwo,
  img,
}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.cardBlock}>
        <Image source={{uri: img}} style={styles.image} />
        <Text style={styles.detailTitle}>{title}</Text>
        <View style={styles.textDetailRow}>
          <Text style={styles.detailText}>{rowDetailOne}</Text>
          <Text> • </Text>
          <Text style={styles.detailText}>{rowDetailTwo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    width: 300,
    height: 180,
    margin: 10,
  },
  cardBlock: {
    display: 'flex',
    width: 300,
    height: 180,
    justifyContent: 'center',
    backgroundColor: 'black',
    textAlign: 'center',
    borderRadius: 11,
  },
  image: {
    width: 300,
    height: 180,
    position: 'absolute',
    borderRadius: 11,
    opacity: 0.8,
  },
  detailTitle: {
    fontSize: 23,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    textShadowColor: 'black',
    textShadowRadius: 9,
  },
  textDetailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  detailText: {
    color: 'white',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowRadius: 10,
    fontWeight: '500',
  },
});
export default HomepageMeditationComponent;
