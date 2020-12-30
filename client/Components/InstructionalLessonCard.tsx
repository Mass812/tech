import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

interface InstructionalLessonCardProps {
  img: string;
  instructor: string;
  courseName: string;
  onPress: (e: React.SyntheticEvent) => void;
  keywords?: string[];
  targets: string;
  equipment: string[];
}

const InstructorLessonCard: React.FC<InstructionalLessonCardProps> = ({
  onPress,
  courseName,
  img,
  instructor,
  keywords,
  targets,
  equipment,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.parent}>
        <View style={styles.card}>
          <View style={styles.topCardRow}>
            <Image source={{uri: img}} style={styles.image} />
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.instructorName}>{instructor}</Text>
          </View>
          <View style={styles.thirdRow}>
            <Text style={styles.title}>{courseName.substring(0, 32)}</Text>
          </View>
          <View style={styles.fourthRow}>
            <Text style={styles.focus}>{targets}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parent: {
    //  padding: 10,
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
    height: 275,
    backgroundColor: 'white',
  },

  topCardRow: {
    height: 175,
  },
  secondRow: {
    minHeight: 'auto',
    textAlign: 'left',
  },
  thirdRow: {
    display: 'flex',
    height: 175,
  },
  fourthRow: {
    display: 'flex',
    height: 175,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  instructorName: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: 'grey',
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 8,
    fontSize: 28,
    color: 'black',
    fontWeight: '200',
  },

  image: {
    minWidth: '100%',
    height: 175,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
    marginLeft: 15,
    // textAlign: 'center',
  },
  focus: {
    color: 'rgb(239,150,128)',
    marginRight: 2,
    marginTop: 15,
    fontWeight: '500',
  },
  focusTitle: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 2,
  },
});
export default InstructorLessonCard;
