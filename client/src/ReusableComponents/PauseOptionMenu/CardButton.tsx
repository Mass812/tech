import * as React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

const width = Dimensions.get('window').width;

interface iPauseOptionMenuButton {
  text: string;
  onPress?: () => void;
}

const CardButton: React.FC<iPauseOptionMenuButton> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    backgroundColor: 'rgba(224, 224, 224, .9)',
    minWidth: width - 30,
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 7,
    margin: 14,
  },

  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default CardButton;
