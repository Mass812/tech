import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'urql';
import ProgramCard from '../UiCards/ProgramCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import LoadingScreen from '../../Screens/Loading';
import ErrorScreen from '../../Screens/ErrorScreen';

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
      <View style={horizontal ? styles.listNotWide : styles.listWide}>
        <TouchableOpacity
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
    <SafeAreaView>
      <View style={styles.main}>
        <FlatList<FlatListProps>
          data={data[dataProps]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={horizontal}
        />
      </View>
    </SafeAreaView>
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
