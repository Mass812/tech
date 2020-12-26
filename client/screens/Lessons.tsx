import * as React from 'react'
import { View, StyleSheet, Text, Image, } from 'react-native';
import { useRoute } from '@react-navigation/native';
 import {useQuery} from 'urql'  






const findCourse = `

query ($course: String!) {
  
    course(course: $course){
      courseName
      instructor
      courseFocus
      id
      cost
      saleCost
      description
      lectureCount
      length
      created
      category
      img
    }
  
  }



`

   
interface LessonsProps {  
  courseName: string
  instructor: string
  courseFocus: string
  id: string
  cost: string
  saleCost: string
  description: string
  lectureCount: string
  length: string
  created: string
  category: string

 }

 type ParamList = {
   courseName: string
   key: string
   name: string
   params: Params
 }

type Params = {courseName: string}






const Lessons : React.FC <LessonsProps> = () => {
  const route = useRoute<ParamList>();


  let courseName  = route.params.courseName
 


const [result, reexecuteQuery] = useQuery({
  query: findCourse,
  variables: {course: courseName},
});

let { data, fetching, error } = result
console.log('graphql Lesson data: ===>>', data)
if (fetching) return <Text>Loading...</Text>;
if (error) return <Text>Oh no... {error.message}</Text>;


        return (

        <View style={styles.container}>
      <Image source={{uri: `${data.course.img}`}} style={{width: 275, height: 275}}/>
          <Text style={styles.title}>{courseName}</Text>
        <Text>Title: {data.course.courseName}</Text>
        <Text>Title: {data.course.instructor}</Text>
        <Text>Title: {data.course.description}</Text>
        <Text>Title: {data.course.saleCost}</Text>
        <Text>Title: {data.course.created}</Text>
        <Text>Title: {data.course.courseFocus}</Text>
        <Text>Title: {data.course.lectureCount}</Text>
  
      
        </View>

)}

 const styles = StyleSheet.create({
container: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 20,
color: 'green',
}
})
export default Lessons;