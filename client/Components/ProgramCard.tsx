import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
  
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
   
interface ProgramCardProps { 
    photo: any,
    instructor: string
    title: string
    buttonText?: string
    bulletPoints: string
    id: string
    button: boolean
    onPress?: (e: React.SyntheticEvent 
        ) => void 
  }



const ProgramCard : React.FC <ProgramCardProps> = ({button, onPress, photo, instructor, title, buttonText, bulletPoints, id} ) => {

        return (

            <View style={styles.imageParent} key={id}>
            <Image style={styles.image} source={{uri:photo}} />
            <Text style={styles.instructor}>{instructor}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.bulletPoints}>{bulletPoints}</Text>
            {button? 
            <TouchableOpacity style={styles.button} onPress={onPress}>
                 <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            
        :
        null
        }
        </View>

)}

 const styles = StyleSheet.create({
    imageParent: {
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        width:  width-30,
        maxWidth: width-30,
        borderRadius: 10,
        borderWidth: 2,
       justifyContent: 'center',
       alignItems: 'center',
       alignContent: 'center',
       textAlign: 'center',
       marginBottom: 20,
       margin: 'auto',
       backgroundColor: 'black',
       alignSelf: 'center'
     
    },
    image: {
        position: 'absolute',
        height: 200,
        width:  width-30,
        maxWidth: width-30,
       zIndex: -1,
       borderRadius: 10,
       borderWidth: 2,
       
       opacity: .5,
      
      
       

    },
    instructor: {
        fontSize: 15,
        color: 'white',
        top: 0.2,
        fontWeight: '600',
        textShadowColor: 'black',
        textShadowRadius: 2,
        
    }
    ,
    title: {
       // flex:1,
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
       // width: width,
        top: .2,
        marginTop: 5,
        marginBottom: 1,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowRadius: 5,

    },
    bulletPoints: {
        marginTop: 4,
        marginBottom: 15,
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
        textShadowColor: 'black',
        textShadowRadius: 3,
    },
    button: {
        position: 'relative',
        minWidth: width * .3,
        height: 30,
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: 'rgb(239,150,128)',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25,

     
        // textAlign: 'center',
        // top: height * 0.400,
//left:  width* -.5 + 90 ,
       

       
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: "500"
        
    }
})
export default ProgramCard;