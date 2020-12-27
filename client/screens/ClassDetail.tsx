import * as React from 'react'
import { View, StyleSheet, Text, Image, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from 'urql'
import ProgramCard from '../Components/ProgramCard';
import CourseOverview from '../Components/CourseOverview';


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
      equipment
    }
  }
`

interface ClassDetailProps {
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
  img: string
  equipment: string[]

}

type ParamList = {
  courseName: string
  key: string
  name: string
  params: Params
}

type Params = { courseName: string }






const ClassDetail: React.FC<ClassDetailProps> = () => {
  const route = useRoute<ParamList>();


  let courseName = route.params.courseName



  const [result, reexecuteQuery] = useQuery({
    query: findCourse,
    variables: { course: courseName },
  });

  let { data, fetching, error } = result
  console.log('graphql Lesson data: ===>>', data)
  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;


  return (

    <View style={styles.container}>
      <ProgramCard button={true} buttonText={'Start Class'} id={data.course.id}  instructor={data.course.instructor} photo={data.course.img} title={data.course.courseName} 
               bulletPoints={`${data.course.lectureCount } ClassDetail *  ${data.course.length}`} />
  <CourseOverview keywords={data.course.keywords} 
                  equipment={data.course.equipment} 
                  instructor={data.course.instructor} 
                  length={data.course.length}  
                  courseFocus={data.course.courseFocus}
                  courseName={data.course.courseName}
                  id={data.course.id}
                  lectureCount={data.course.lectureCount}
                  description={data.course.description}
                  cost={data.course.cost}
                  category={data.course.category}
                  img={data.course.img}
                  saleCost={data.course.saleCost}
                  created={data.course.created}
                  />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    color: 'green',
  }
})
export default ClassDetail;