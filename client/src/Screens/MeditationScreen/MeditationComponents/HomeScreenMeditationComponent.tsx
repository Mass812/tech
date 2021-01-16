import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HomepageMeditationComponentProps {
  title: string;
  rowDetailOne: string;
  rowDetailTwo: string;
  img: string;
  onPress: () => void;
}

const HomepageMeditationComponent: React.FC<HomepageMeditationComponentProps> = ({
  title,
  rowDetailOne,
  rowDetailTwo,
  img,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.parent}>
        <View style={styles.cardBlock}>
          <Image source={{uri: img}} style={styles.image} />

          <View style={styles.textDetailRow}>
            <Text style={styles.detailText}>{rowDetailOne}</Text>
            <View style={styles.titleView}>
              <Text style={styles.detailTitle}>{title}</Text>
            </View>
            <Text style={styles.detailTextBottom}>{rowDetailTwo}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    width: 320,
    height: 175,
    margin: 10,
  },
  cardBlock: {
    display: 'flex',
    width: 320,
    height: 175,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 11,
    opacity: 1,
  },
  image: {
    width: 320,
    height: 175,
    position: 'absolute',
    borderRadius: 11,
    opacity: 0.5,
  },
  textDetailRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 15,
    width: '100%',
    height: 175,
  },
  titleView: {
    borderColor: 'white',
    opacity: 1,
    borderBottomWidth: 1,
    margin: 2,
    paddingBottom: 6,
  },
  detailTitle: {
    fontSize: 23,
    fontWeight: '500',
    color: 'white',
    paddingTop: 4,
    paddingBottom: 4,
    textShadowColor: 'black',
    textShadowRadius: 9,
  },

  detailText: {
    color: 'white',
    fontSize: 13,
    textShadowColor: 'black',
    textShadowRadius: 10,
    fontWeight: '500',
  },
  detailTextBottom: {
    // position: 'absolute',
    // left: 15,
    // bottom: 5,
    paddingTop: 7,
    color: 'white',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowRadius: 10,
    fontWeight: '500',
  },
});
export default HomepageMeditationComponent;
