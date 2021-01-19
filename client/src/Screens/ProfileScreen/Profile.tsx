import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AcheivementBanner from './ProfileComponents/AcheivementBanner';
import ProfileHeaderBanner from './ProfileComponents/ProfileHeaderBanner';
import RecentlyDoneBanner from './ProfileComponents/RecentlyDoneBanner';
import {AuthContext} from '../../Context/AuthContext';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {state, dispatch} = useContext(AuthContext);

  const onPress = () => {
    dispatch({type: 'TOKEN', payload: null});
  };
  return (
    <ScrollView horizontal={false}>
      <ProfileHeaderBanner onPress={onPress} />

      <View style={styles.spread} />
      <AcheivementBanner />
      <View style={styles.spread} />
      <RecentlyDoneBanner
        header={'Recent Meditations'}
        children={<Text>Meditations</Text>}
      />
      <View style={styles.spread} />
      <RecentlyDoneBanner
        header={'Recent Classes'}
        children={<Text>Workouts</Text>}
      />
      <View style={styles.spread} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spread: {
    width: '100%',
    height: 15,
    backgroundColor: '#dee3e3',
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default Profile;
