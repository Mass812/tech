import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'urql';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';

const Meditations = `
    query {
      meditations {
        contentUrl
        contentImg
        instructor
        category
        length
        title
        description
       id
      }
    }
  `;

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

const Meditation: React.FC<MeditationProps> = ({}) => {
  const [result, reexecuteQuery] = useQuery({query: Meditations});
  const nav = useNavigation();

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderItem = ({item}: {item: MeditationProps}) => {
    return (
      <View key={item.id}>
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
    // <ScrollView>
    <View style={styles.main}>
      <FlatList<FlatListProps>
        keyExtractor={(item) => item.id}
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
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    //flex: 1,
    //  alignItems: 'center',
    justifyContent: 'center',
    height: 1000,
  },
});
export default Meditation;
