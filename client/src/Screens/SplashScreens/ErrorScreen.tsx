import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronCircleLeft, faDizzy} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ErrorProps {
  error?: string;
  routeBackTo?: string;
  onPress?: () => void;
}

const ErrorScreen: React.FC<ErrorProps> = ({
  error,
  routeBackTo = 'Home',
  onPress,
}) => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.navigate(routeBackTo);
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/fabletics_256_256.png')}
        style={styles.image}
      />
      <View style={styles.spinnerRow}>
        <FontAwesomeIcon icon={faDizzy} size={20} color={'teal'} />
        <Text style={styles.text}>Sorry, there was an error.</Text>
        <Text style={styles.text}>Redirecting</Text>
      </View>
      <Text>{error ? error : ''}</Text>
      <Text>Go Back</Text>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          color={'salmon'}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
export default ErrorScreen;
