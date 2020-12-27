import React, { useState, useContext} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Image, TouchableOpacity, ScrollViewComponent } from 'react-native';
import LessonCard from '../Components/LessonCard'
import { useQuery } from 'urql'
import { useNavigation } from '@react-navigation/native';
import Mega from '../Components/Mega';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProgramCard from '../Components/ProgramCard'



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
        equipment
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
    equipment: string[]
    id: string
    img: string
}


interface ProgramsProps {
  
}




const Programs: React.FC<ProgramsProps> = () => {

    const nav = useNavigation()
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [display, setDisplay] = useState<string>()
    const [result, reexecuteQuery] = useQuery({
        query: CoursesQuery,
    });

    let { data, fetching, error } = result

    if (fetching) return <Text>Loading...</Text>;
    if (error) return <Text>Oh no... {error.message}</Text>;

    



    const sendToLesson= async (e: EventTarget, idx: string, courseName: string)=>{
       
         setDisplay('Clicked Id =' + idx)

       nav.navigate('ClassDetail',  {courseName})


    }


   

    const renderItem = ({ item }: { item: AllCoursesProps }) => {
        return (
            <TouchableOpacity onPress ={(e: React.SyntheticEvent)=>sendToLesson(e, item.id, item.courseName)}>

                <ProgramCard button={false} id={item.id} onPress={(e: EventTarget)=>sendToLesson(e, item.id, item.courseName)} instructor={item.instructor} photo={item.img} title={item.courseName} 
               bulletPoints={`${item.lectureCount } ClassDetail *  ${item.length}`} 
               />
            </TouchableOpacity>
        )
    }

    return (
       

              <ScrollView>

            <TouchableOpacity onPress={()=>console.log('Programs tsx')}>
  
            </TouchableOpacity>

            
            <View style={styles.main}>
               
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={data.courses}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                </View>
              </ScrollView>

       

    )
}

const styles = StyleSheet.create({
    container: {
      //  flex: 1,
    },
  main: {
      flex: 1,
      padding: 5
  },
  bottom: {
    flex: 1
  }

})


export default Programs;