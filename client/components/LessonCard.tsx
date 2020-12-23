import { isTypeSystemExtensionNode } from 'graphql';
import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';



interface LessonCardProps {
    img: string
    instructor: string
    courseName: string
    cost?: string
    description: string
    lectureCount: string
    length: string

    keywords: string[]
}



const LessonCard: React.FC<LessonCardProps> = ({ courseName, img, instructor, description, lectureCount, keywords }) => {


        const name = instructor.length



    return (

        <View style={styles.parent}>
            <Text style={styles.lectureCount}>{lectureCount} classes</Text>
            <Text style={styles.instructorName}>{instructor}</Text>
                      
            <Text style={styles.title}>{courseName}</Text>
            <View style={styles.card}>
                <View style={styles.topCardRow}>
                    <View style={styles.left}>
                        <Image style={styles.image} source={{ uri: img }} />
                    </View>

                    <View style={styles.right}>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
                    <View > 
                        <View style={styles.topCardRow}>
                        <Text style={styles.focusTitle}>Focus:</Text>

                            {keywords.map((n, idx) => (
                            <Text style={styles.focus} key={idx}>{n }{' '}</Text>
                        ))}
                    
                        </View>
                      
                        </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        padding: 5,
        paddingTop: 10,
        marginTop: 4,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'lightgrey',

        
        
    },
    card: {

       // borderWidth: 2,
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      //   backgroundColor: 'lightgrey',

    },
    lectureCount: {
        position: 'absolute',
        right: 3,
        top: 3,
        borderWidth: 2,
        margin: 2,
        padding: 2,
        backgroundColor: '#fefed9'
    },
    topCardRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'

    },
    instructorName: {
        fontSize: 30,
        color: 'teal'
 
    },
    right: {
        display: "flex",
        flexDirection: 'column',
        marginRight: 110,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'space-around'

    },
    description: {
      
        fontSize: 12,
    },
    detail: {
        marginTop: 3,
        textAlign: 'left',
        fontSize: 10
    },
    left: {
        // display: "flex",
        // flexDirection: 'column',
        height: 150,

        textAlign: 'left',
        marginRight: 7,
        justifyContent: 'center',
        


    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8

    },
    title: {
        fontSize: 16,
        color: 'black',
        fontWeight: "600",
        position: "absolute",
        top: 38,
        left: 65,
    },
    focus: {
        color: 'slategrey',
        marginRight: 2
    },
    focusTitle: {
        color: 'black',
        fontSize: 13,
        fontWeight: "500",
        marginRight: 2


    }
})
export default LessonCard;