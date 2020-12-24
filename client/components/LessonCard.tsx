
import { VolumeId } from 'aws-sdk/clients/storagegateway';
import * as React from 'react'
import { View, Text, StyleSheet,TouchableWithoutFeedback, Image } from 'react-native';



interface LessonCardProps {
    img: string
    instructor: string
    courseName: string
    cost?: string
    description: string
    lectureCount: string
    length: string
    onPress: (e: React.SyntheticEvent 
    ) => void 
    keywords: string[]
   
}



const LessonCard: React.FC<LessonCardProps> = ({ onPress, courseName, img, instructor, description, lectureCount, keywords }) => {


    



    return (
        <TouchableWithoutFeedback  style={styles.parent} onPress = {onPress}>
<View>


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
                            <Text style={styles.focus} key={idx}>{n}{' '}</Text>
                        ))}

                    </View>

                </View>
            </View>
</View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        padding: 5,
        paddingTop: 10,
        marginTop: 4,
        borderWidth: 7,
        borderRadius: 10,
        borderColor: 'lightgrey',
        borderTopColor: 'green'



    },
    card: {
        
         borderBottomWidth: 2,
        display: 'flex',
        marginBottom: 28,
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
        backgroundColor: 'rgba(153,172,194, 0.3)'
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

        fontSize: 15,
        overflow: 'hidden'
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
        top: 30,
        left: 65,
    },
    focus: {
        color: 'teal',
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