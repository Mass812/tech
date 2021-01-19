import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic, faPlayCircle} from '@fortawesome/free-solid-svg-icons';

const width = Dimensions.get('window').width;

interface iCardButtonPinkProps {
  text: string;
  onPress?: () => void;
}

const CardButtonPink: React.FC<iCardButtonPinkProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonPink} onPress={onPress}>
      <View style={styles.pinkButtonDetails}>
        <FontAwesomeIcon icon={faPlayCircle} size={22} color={'white'} />
        <Text style={styles.buttonText}>{`  ${text}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPink: {
    borderWidth: 0.5,
    backgroundColor: 'rgb(239,150,128)',
    minWidth: width - 30,
    maxWidth: '90%',
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 7,
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkButtonDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default CardButtonPink;
