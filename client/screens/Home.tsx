import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Image } from 'react-native';
import LessonCard from '../components/LessonCard'
import { useQuery } from 'urql'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




const CoursesQuery = `
query {
    courses {
        courseName
        instructor
        cost
        saleCost
        onSale
        description
        lectureCount
        length
        created
        keywords
        id
        img
    }
}
`


interface AllCoursesProps {
    courseName: string
    instructor: string
    cost: string
    saleCost: string
    onSale: boolean
    description: string
    lectureCount: string
    length: string
    created: string
    keywords: string[]
    id: string
    img: string
}


interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {

    const [result, reexecuteQuery] = useQuery({
        query: CoursesQuery,
    });

    let { data, fetching, error } = result

    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Oh no... {error.message}</Text>;

    console.log('data =>', data)

    const renderItem = ({ item }: { item: AllCoursesProps }) => {
        return (
            <LessonCard instructor={item.instructor} img={item.img} cost={item.cost}  courseName={item.courseName} keywords={item.keywords}
            description={item.description} lectureCount={item.lectureCount} length={item.length}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>


                <View>
                    <FlatList
                        data={data.courses}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>

               
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
 
    },
  main: {
      padding: 5
  }

})


export default Home;