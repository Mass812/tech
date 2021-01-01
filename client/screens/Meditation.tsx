import  React from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
  import {useQuery} from 'urql'
import ProgramCard from '../Components/ProgramCard'
import {useNavigation, useRoute} from '@react-navigation/native';

  const getMeditations = `
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
  category: string
  contentUrl: string
  contentImg: string
  description: string
  id: string
  instructor: string
  length: string
  title: string
  
}
 



const Meditation : React.FC <MeditationProps> = ( { length} ) => {

const [result, reexecuteQuery] = useQuery({ query: getMeditations})
const nav = useNavigation()

let {data, fetching, error} = result;

if (fetching)
return (
  <View style={styles.main}>
    <Text>Loading...</Text>
  </View>
);
if (error)
return (
  <View style={styles.main}>
    <Text>Oh, No...{error.message}</Text>
  </View>
);

const renderItem = ({item}: {item: MeditationProps}) => {

  return(
    <TouchableOpacity 
    // onPress={()=> nav.navigate('Root', {'MeditationPlayer', params: {contentUrl: item.contentUrl, contentImg: item.contentImg}})}>
    onPress={()=> nav.navigate('MeditationPlayer', {         
      contentUrl: item.contentUrl,
      contentImg: item.contentImg,
      instructor: item.instructor,
      category: item.category,
      length: item.length,
      title: item.title,
      description: item.description,
     id : item.id,
     })}>

      <ProgramCard 
              photo={item.contentImg}
              title = {item.title}
              bulletPoints={`${item.instructor} * ${item.length}`}
              button={false}
              id={item.id}

              />
    </TouchableOpacity>
          
  )}

        return (

        <SafeAreaView >
          
          <FlatList
          data={data.meditations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
        />
        </SafeAreaView>

)}

 const styles = StyleSheet.create({
container: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
},
main: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 20,
color: 'green',
}
})
export default Meditation;