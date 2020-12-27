
import * as React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';



interface PopularClassesCardProps {
    img: string
    instructor: string
    courseName: string
    onPress: (e: React.SyntheticEvent
    ) => void
    keywords: string[]

}

const PopularClassesCard: React.FC<PopularClassesCardProps> = ({ onPress, courseName, img, instructor, keywords }) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.parent}>
                <View style={styles.card} >
                    <View style={styles.topCardRow}>
                        <Image source={{ uri: img }} style={styles.image} />
                     
                        </View>
                        <View style={styles.middleRow}>
                                <Text style={styles.instructorName}>{instructor}</Text>
                            <Text style={styles.title}>{courseName.substring(0,32)}</Text>
                        </View>
                            <View style={styles.thirdRow}>
                                    {keywords.map((n,idx)=>(
                                        <Text style={styles.focus} key={idx}>{n}</Text>
                                    ))}
                               </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    parent: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(198,227,231, .03)',
        marginLeft: 10,        
        width: 300,
 
    },
    card: {
        
        borderColor: 'grey',
        display: 'flex',
        height: 245,
        backgroundColor: 'white',
    },

    topCardRow: {
        height: 175,
      
    },
    middleRow: {
        minHeight: 'auto',
        justifyContent: 'center',
        textAlign: 'center'
    },
    thirdRow: {
        display: 'flex',
        height: 175,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      
    },
    instructorName: {
        //display: 'flex',
        fontSize: 20,
        color: 'black',
        fontWeight: "500",

    },

    image: {
        minWidth: "100%",
        height: 175,
        borderRadius: 8,
        alignSelf: 'baseline'

    },
    title: {
        fontSize: 16,
        color: 'grey',
        fontWeight: "600",
        marginLeft: 15
       // textAlign: 'center',
    },
    focus: {
        color: 'rgb(239,150,128)',
        marginRight: 2,
        marginTop: 15,
        fontWeight: "500",
        
    },
    focusTitle: {
        color: 'black',
        fontSize: 13,
        fontWeight: "500",
        marginRight: 2
    }
})
export default PopularClassesCard;