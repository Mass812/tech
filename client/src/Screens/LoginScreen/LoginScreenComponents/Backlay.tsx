import * as React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface BacklayProps {}

const Backlay: React.FC<BacklayProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/upper_body_blast_program.jpg')}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(105, 104, 104, .9)',
  },
  img: {
    position: 'relative',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    zIndex: -1,
    opacity: 0.4,
  },
});
export default Backlay;
