import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'urql';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import GetMeditations_MeditationScreen from '../../Urql_Requests/Querys/GetMeditations_MeditationScreen';
import {MeditationProps} from '../../Interfaces/MeditationsScreenInterfaces';

const Meditation: React.FC<MeditationProps> = ({}) => {
  const [result] = useQuery({query: GetMeditations_MeditationScreen});
  const nav = useNavigation();

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderItem = ({item}: {item: MeditationProps}) => {
    const {
      contentUrl,
      contentImg,
      instructor,
      category,
      length,
      title,
      description,
      id,
    } = item;
    return (
      <View key={id}>
        <TouchableOpacity
          key={id}
          onPress={() =>
            nav.navigate('MeditationPlayer', {
              contentUrl,
              contentImg,
              instructor,
              category,
              length,
              title,
              description,
              id,
            })
          }>
          <ProgramCard
            photo={contentImg}
            title={title}
            bulletPoints={`${instructor} * ${length}`}
            button={false}
            id={id}
            displayAsCard={true}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={data.meditations}
        renderItem={renderItem}
        horizontal={false}
        snapToAlignment={'center'}
        snapToInterval={300}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    height: 1000,
  },
});
export default Meditation;
