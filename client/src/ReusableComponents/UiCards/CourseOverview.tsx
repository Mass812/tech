import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

interface CourseOverviewProps {
  courseName: string;
  instructor: string;
  id?: string;
  description: string;
  lectureCount?: string;
  length: string;
  category: string;
  img: string;
  equipment: string[];
  targets?: string[];
  displayProgramLink?: boolean;
  onPress?: (event: React.SyntheticEvent) => void;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  instructor,
  targets,
  id,
  description,
  lectureCount,
  length,
  category,
  equipment,
  onPress,
  courseName,
  displayProgramLink = false,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {displayProgramLink ? (
          <Text style={styles.title}>About this Class</Text>
        ) : (
          <Text style={styles.title}>About this Program</Text>
        )}
        <Text style={styles.description}>{description}</Text>

        <View style={{marginBottom: 15}}>
          <Text style={styles.title}>Equipment</Text>
          {equipment.map((n, id) => (
            <TableItem key={id} itemTitle={'Equipment'} itemValue={n} />
          ))}
        </View>
        <View>
          <Text style={styles.title}>Details</Text>
        </View>
        <TableItem itemTitle={'trainer'} itemValue={instructor} />
        {displayProgramLink ? (
          <TableItem
            itemButton={true}
            itemTitle={'programs'}
            itemValue={courseName}
            onPress={onPress}
          />
        ) : null}
        <TableItem itemTitle={'course length'} itemValue={length} />
        {targets && <TableItem itemTitle={'targets'} itemValue={targets[0]} />}
        <TableItem itemTitle={'category'} itemValue={category} />
        <Text style={{color: 'lightgrey'}}>ID: {id}</Text>
      </View>
    </ScrollView>
  );
};

interface TableItemProps {
  itemTitle: string;
  itemValue?: string;
  itemButton?: boolean;

  onPress?: (event: React.SyntheticEvent) => void;
}

const TableItem: React.FC<TableItemProps> = ({
  itemTitle,
  itemValue,
  itemButton = false,
  onPress,
}) => {
  return (
    <View style={styles.tableItemView}>
      <Text style={styles.tableItemName}>{itemTitle}: </Text>

      {itemButton ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{itemValue}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.tableItemValue}>{itemValue} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    letterSpacing: 0.6,
  },
  tableItemView: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    textAlign: 'left',
    // borderBottomWidth: 2,
    // borderColor: 'darkgrey',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },

  tableItemName: {
    marginLeft: 5,
    color: 'grey',
    minWidth: 120,
  },
  tableItemValue: {
    color: 'black',
  },
  button: {
    backgroundColor: '#abced4',
    padding: 4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#0896a3',
    fontWeight: '400',
    alignSelf: 'center',
  },
});
export default CourseOverview;
