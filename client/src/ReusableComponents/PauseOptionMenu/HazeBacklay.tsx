import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

interface iHazeBacklayProps {
  onPressHaze: () => void;
}

const HazeBacklay: React.FC<iHazeBacklayProps> = ({onPressHaze}) => {
  return (
    <View style={styles.haze}>
      <TouchableOpacity style={styles.hazeButton} onPress={onPressHaze} />
    </View>
  );
};

const styles = StyleSheet.create({
  haze: {
    // flex: 1,
    backgroundColor: 'black',
    //   height: '100%',
    //  width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },

  hazeButton: {
    height: '100%',
    width: '100%',
  },
});
export default HazeBacklay;
