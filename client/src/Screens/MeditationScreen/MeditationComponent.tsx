import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'urql';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';

interface MeditationProps {
  category?: string;
  contentUrl?: string;
  contentImg?: string;
  description?: string;
  id?: string;
  instructor?: string;
  title?: string;
  horizontal?: boolean;
  queryValue?: string;
  length?: string;
  dataProps?: string;
}

interface FlatListProps {
  category?: string;
  contentUrl?: string;
  contentImg?: string;
  description?: string;
  id: string;
  instructor?: string;
  title: string;
  horizontal?: boolean;
  queryValue?: string;
  length?: string;
  dataProps?: string;
}

let width = Dimensions.get('screen').width;

const Meditation: React.FC<MeditationProps> = ({
  horizontal = false,
  queryValue = ``,
  dataProps = 'meditations',
}) => {
  const [result, reexecuteQuery] = useQuery({query: queryValue});
  const nav = useNavigation();

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderItem = ({item}: {item: MeditationProps}) => {
    return (
      <View
        style={horizontal ? styles.listNotWide : styles.listWide}
        key={item.id}>
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            nav.navigate('MeditationPlayer', {
              contentUrl: item.contentUrl,
              contentImg: item.contentImg,
              instructor: item.instructor,
              category: item.category,
              length: item.length,
              title: item.title,
              description: item.description,
              id: item.id,
            })
          }>
          <ProgramCard
            photo={item.contentImg}
            title={item.title}
            bulletPoints={`${item.instructor} * ${item.length}`}
            button={false}
            id={item.id}
            displayAsCard={true}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList<FlatListProps>
        data={data[dataProps]}
        renderItem={renderItem}
        horizontal={horizontal}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listNotWide: {
    margin: 5,
    fontSize: 20,
    color: 'green',
    width: 300,
  },
  listWide: {
    margin: 5,
    fontSize: 20,
    color: 'green',
    width: width - 30,
  },
});
export default Meditation;
