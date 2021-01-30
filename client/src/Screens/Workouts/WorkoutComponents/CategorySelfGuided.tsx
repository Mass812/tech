import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {useQuery} from 'urql';
import LoadingScreen from '../../SplashScreens/Loading';
import ErrorScreen from '../../SplashScreens/ErrorScreen';
import {useNavigation} from '@react-navigation/native';
import SelfGuidedCardMini from './SelfGuidedCardMini';
import GetAllSelfGuided from '../../../Urql_Requests/Querys/GetAllSelfGuided_CategorySelfGuided';
import {SelfGuidedCategory} from '../../../Interfaces/WorkoutScreenInterfaces';
const width = Dimensions.get('screen').width;

interface WorkoutCardProps {}

const WorkoutCard: React.FC<WorkoutCardProps> = () => {
  const nav = useNavigation();

  const [results, reexecuteQuery] = useQuery({
    query: GetAllSelfGuided,
  });

  const {data, error, fetching} = results;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderItem = ({item}: {item: SelfGuidedCategory}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          nav.navigate('SelfGuidedVideoScreen', {
            contentUrl: item.contentUrl,
            id: item.id,
            title: item.title,
          })
        }>
        <SelfGuidedCardMini
          //  instructor={item.instructor}
          img={`${item.img}`}
          title={item.title}
          category={`${item.category}`}
          length={`${item.length}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.thinHeader}>
        <Text>Workouts</Text>
        <Text>{data.allSelfGuided.length} Workouts</Text>
      </View>
      <View style={styles.parent}>
        <FlatList
          data={data.allSelfGuided}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    display: 'flex',
    width: width,
    padding: 20,
  },
  thinHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: 35,
    backgroundColor: 'lightgrey',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
export default WorkoutCard;
