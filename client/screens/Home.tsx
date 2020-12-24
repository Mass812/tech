import React, {useRef, useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

import LessonCard from '../components/LessonCard'
import { useQuery } from 'urql'
import { useNavigation } from '@react-navigation/native';

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
    const nav = useNavigation()
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [display, setDisplay] = useState<string>()
    const [result, reexecuteQuery] = useQuery({
        query: CoursesQuery,
    });

    let { data, fetching, error } = result

    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Oh no... {error.message}</Text>;

    



    const sendToLesson=(e, idx: string)=>{
       
        setDisplay(idx)

        nav.navigate('Lessons', {params: idx})


    }


    const renderItem = ({ item }: { item: AllCoursesProps }) => {
        return (
            <LessonCard onPress={(e: any)=>sendToLesson(e, item.id)} instructor={item.instructor} img={item.img} cost={item.cost}  courseName={item.courseName} keywords={item.keywords}
            description={item.description} lectureCount={item.lectureCount} length={item.length}
            />
        )
    }






    return (
        <SafeAreaView style={styles.container}>
           <Text>{display}</Text> 

       
            <View style={styles.main}>

                    <FlatList
                        data={data.courses}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
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