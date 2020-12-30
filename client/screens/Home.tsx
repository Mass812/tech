import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollViewComponent,
} from 'react-native';
import LessonCard from '../Components/LessonCard';
import {useQuery} from 'urql';
import {useNavigation} from '@react-navigation/native';
import Mega from '../Components/Mega';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import InstructionalLessonCard from '../Components/InstructionalLessonCard';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CoursesQuery = `
query {
    courses {
        courseName
        created
        description
        id
        courseImg
        instructor
        keywords
        lectureCount
        length
        category
        
    }
}
`;

interface AllCoursesProps {
  courseName: string;
  instructor: string;
  lectureCount: string;
  keywords: string[];
  id: string;
  courseImg: string;
  length: string;
  category: string;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const nav = useNavigation();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [display, setDisplay] = useState<string>();
  const [result, reexecuteQuery] = useQuery({
    query: CoursesQuery,
  });

  let {data, fetching, error} = result;

  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const sendToLesson = async (
    e: EventTarget,
    id: string,
    courseName: string,
  ) => {
    setDisplay('Clicked Id =' + courseName);
    nav.navigate('ClassDetail', {courseName});
  };

  const renderItem = ({item}: {item: AllCoursesProps}) => {
    return (
      <InstructionalLessonCard
        onPress={(e: EventTarget) => sendToLesson(e, item.id, item.courseName)}
        superscriptTitle={item.instructor}
        img={item.courseImg}
        title={item.courseName}
        additionalInfo={item.keywords}
        length={item.length}
        wideDimension={false}
        category={item.category}
      />
    );
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => console.log('Home tsx')}></TouchableOpacity>

      <View style={styles.main}>
        <Mega />
      </View>
      <View style={styles.sectionTitleParent}>
        <Text style={styles.sectionTitle}>Popular Classes</Text>
      </View>

      <View style={styles.bottom}>
        <FlatList
          data={data.courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
  },
  main: {
    flex: 1,
    marginTop: -50,
  },
  bottom: {
    // flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'darkgrey',
    marginLeft: 12,
    marginTop: 23,
  },
  sectionTitleParent: {
    //height: 30,
    justifyContent: 'center',
  },
});

export default Home;
