import * as React from 'react'
import { View, StyleSheet, Text, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



interface CourseOverviewProps {
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
    keywords: string[]
    equipment: string[]
}








const CourseOverview: React.FC<CourseOverviewProps> = ({ instructor,
    courseFocus,
    id, description,
    lectureCount,
    length,
    created,
    category,
    keywords,
    equipment
}) => {

    return (
        <ScrollView>
        <View style={styles.container}>

            <Text style={styles.title}>About this class</Text>
            <Text style={styles.description}>{description}</Text>


            <View style={{marginBottom: 15}}>
                <Text style={styles.title}>Equipment</Text>
                {equipment.map((n,id)=>(
                     <TableItem key = {id} itemTitle={'Equipment'} itemValue={n} />
                ))}
            </View>
            <View>
                <Text style={styles.title}>Details</Text>
            </View>
            <TableItem itemTitle={'trainer'} itemValue={instructor} />
            <TableItem itemTitle={'created'} itemValue={created} />
            <TableItem itemTitle={'course length'} itemValue={length} />
            <TableItem itemTitle={'course focus'} itemValue={courseFocus} />
            <TableItem itemTitle={'category'} itemValue={category} />
            <Text>ID: {id}</Text>
        </View>
        </ScrollView>
    )
}



interface TableItemProps {
    itemTitle: string
    itemValue: string
}



const TableItem: React.FC<TableItemProps> = ({ itemTitle, itemValue }) => {

    return (

        <View style={styles.tableItemView}>
            <Text style={styles.tableItemName}>{itemTitle}: </Text>
            <Text style={styles.tableItemValue}>{itemValue} </Text>
        </View>

    )
}
















const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        //alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left'
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: "600",
        marginBottom: 10

    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        letterSpacing: .6,

    },
    tableItemView: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        textAlign: 'left',
   
        borderBottomWidth: 2,

        borderColor: 'darkgrey',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },

    tableItemName:{
        marginLeft: 5,
        color: 'grey'
    },
    tableItemValue: {
        marginLeft: 5,
        color: 'black'
    }
})
export default CourseOverview;








