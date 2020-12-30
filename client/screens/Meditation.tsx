import { NavigationContainer } from '@react-navigation/native';
import  React from 'react'
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
  import {useQuery} from 'urql'
import ProgramCard from '../Components/ProgramCard'
import {useNavigation} from '@react-navigation/native';

  const getMeditations = `
    query {
      meditations {
        contentUrl
        contentImg
        length
        title
       id
      }
    }
  `;
   
   
interface MeditationProps {  
  contentUrl: string
  contentImg: string
  length: string
  title: string
  id: string
  
}
 



const Meditation : React.FC <MeditationProps> = ( {title, contentUrl, contentImg, length} ) => {

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
    <TouchableOpacity onPress={()=> nav.navigate('MeditationPlayer', {contentUrl: item.contentUrl})}>

      <ProgramCard 
              photo={item.contentImg}
              title = {item.title}
              bulletPoints={`${length}`}
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