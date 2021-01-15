import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/fabletics_256_256.png')}
        style={styles.image}
      />
      <View style={styles.spinnerRow}>
        <FontAwesomeIcon icon={faSpinner} size={20} color={'teal'} />
        <Text style={styles.text}>Loading Now</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    zIndex: 3,
  },
  image: {
    height: 75,
    width: 75,
  },
  spinnerRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 7,
  },
});
export default LoadingScreen;
