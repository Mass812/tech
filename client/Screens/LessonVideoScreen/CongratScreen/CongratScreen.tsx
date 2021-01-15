import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Acheivement from './CongratScreenComponents/AcheivementBanner';
import InstructorOutfitBlock from './CongratScreenComponents/InstructorOutfitBlock';

interface CongratScreenProps {}

const CongratScreen: React.FC<CongratScreenProps> = () => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Work, USER_NAME !</Text>
      <Text style={styles.underTitle}>You completed today's class.</Text>
      <Acheivement />
      <View></View>
      <InstructorOutfitBlock />
      <TouchableOpacity
        onPress={() => nav.navigate('Home')}
        style={styles.buttonPink}>
        <Text style={styles.pinkButtonDetails}>Finish Workout</Text>
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
  title: {
    fontSize: 23,
    color: 'black',
    marginBottom: 25,
  },
  underTitle: {
    fontSize: 14,
    marginBottom: 35,
  },

  buttonPink: {
    borderWidth: 0.5,
    backgroundColor: 'rgb(239,150,128)',
    minWidth: 400,
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
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default CongratScreen;
