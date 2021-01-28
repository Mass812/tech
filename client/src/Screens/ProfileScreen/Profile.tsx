import React, {useContext, useState, useEffect} from 'react';
import {useQuery} from 'urql';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AcheivementBanner from './ProfileComponents/AcheivementBanner';
import ProfileHeaderBanner from './ProfileComponents/ProfileHeaderBanner';
import RecentlyDoneBanner from './ProfileComponents/RecentlyDoneBanner';
import {AuthContext} from '../../Context/AuthContext';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import LoadingScreen from '../SplashScreens/Loading';
import userDetails from '../../Urql_Requests/Querys/UserDetails_Congrats_Profile';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {state, dispatch} = useContext(AuthContext);
  const [minutes, setMinutesCalc] = useState<number>(0);
  const [seconds, setRemainingSecondsCalc] = useState<number>(0);

  const [userInfo, refetchUserInfo] = useQuery({
    query: userDetails,
    variables: {email: state.email},
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (userInfo?.data?.user?.userWatchTime) {
      getMinutesFromSeconds(userInfo.data.user.userWatchTime);
    }
  }, [userInfo.data, minutes]);

  let {data, fetching, error} = userInfo;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const handleSignOut = () => {
    dispatch({type: 'TOKEN', payload: null});
  };

  function getMinutesFromSeconds(time: number) {
    const minutes = time >= 60000 ? Math.floor(time / 60000) : 0;
    const y = Math.floor(time - minutes * 60000);
    const seconds = y / 1000;
    setMinutesCalc(minutes);
    setRemainingSecondsCalc(seconds);
  }

  return (
    <ScrollView horizontal={false}>
      <ProfileHeaderBanner onPress={handleSignOut} />

      <View style={styles.spread} />
      <AcheivementBanner
        minutes={minutes}
        seconds={seconds}
        lessonsCompleted={data.user.lessonsCompleted}
        selfGuidedCompleted={data.user.selfGuidedCompleted}
        streak={data.user.streak}
      />
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
