import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';

interface FabFitIconBlockProps {}

const FabFitIconBlock: React.FC<FabFitIconBlockProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../Assets/fabletics_placard.png')}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 200,
    height: 100,
    zIndex: 0,
  },
});
export default FabFitIconBlock;
