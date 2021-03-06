import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('screen').width;

interface InstructionalLessonCardProps {
  img: string;
  superscriptTitle?: string;
  title: string;
  length: string;
  onPress: (e: React.SyntheticEvent) => void;
  additionalInfo?: string[];
  id?: string;
  category?: string;
  wideDimension: boolean;
}

const InstructorLessonCard: React.FC<InstructionalLessonCardProps> = ({
  onPress,
  title,
  img,
  superscriptTitle,
  additionalInfo = [],
  id,
  length,
  category,
  wideDimension,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={wideDimension ? styles.parentWide : styles.parent}>
        <View style={styles.card}>
          <View style={styles.topCardRow}>
            <Image source={{uri: img}} style={styles.image} />
            {category ? (
              <View style={styles.tabIcon}>
                <Text style={styles.tabFont}>{category.toUpperCase()}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.bottomParent}>
            {superscriptTitle ? (
              <View style={styles.secondRow}>
                <Text style={styles.instructorName}>{superscriptTitle}</Text>
              </View>
            ) : null}
            <View style={styles.thirdRow}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.fourthRow}>
              <Text style={styles.leftDetail}>{length}</Text>
              <View style={styles.additionalInfo}>
                {additionalInfo.map((n, idx) =>
                  idx < additionalInfo.length - 1 ? (
                    <Text key={idx}> {n},</Text>
                  ) : (
                    <Text key={idx}> {n}</Text>
                  ),
                )}
              </View>
            </View>
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
    borderRadius: 20,
    borderColor: 'lightgrey',
    backgroundColor: 'rgba(198,227,231, .03)',
    marginLeft: 10,
    width: 290,
  },
  parentWide: {
    //  padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgrey',
    backgroundColor: 'rgba(198,227,231, .03)',
    marginLeft: 10,
    width: width - 80,
  },
  card: {
    borderColor: 'grey',
    display: 'flex',
    backgroundColor: 'white',
    shadowOffset: {width: 9, height: 2},
    shadowColor: 'grey',
    shadowRadius: 12,
    borderRadius: 20,
  },

  topCardRow: {
    backgroundColor: 'black',
    borderRadius: 20,
  },
  tabIcon: {
    position: 'absolute',
    display: 'flex',
    backgroundColor: 'rgb(13,175,211)',
    padding: 4,
    paddingLeft: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    bottom: 12,
    right: 0,
  },
  tabFont: {
    color: 'white',
    marginRight: 8,
    fontWeight: '500',
    fontSize: 16,
  },
  bottomParent: {
    padding: 10,
  },
  secondRow: {
    minHeight: 'auto',
    textAlign: 'left',
  },
  thirdRow: {
    borderBottomWidth: 1,
    borderColor: 'rgba(209, 209, 209, 1)',
    borderStyle: 'solid',
  },
  fourthRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
  },
  additionalInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  instructorName: {
    width: '100%',
    marginTop: 7,
    borderBottomWidth: 2,
    borderColor: 'black',
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    fontWeight: '200',
  },
  image: {
    minWidth: '100%',
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.96,
    overflow: 'hidden',
  },
  title: {
    fontSize: 19,
    color: 'black',
    fontWeight: '300',
    marginBottom: 10,
    textAlign: 'left',
  },
  leftDetail: {
    color: 'black',
    marginLeft: 2,
    fontWeight: '300',
    fontSize: 14,
  },
  rightDetail: {
    color: 'black',
    marginRight: 2,
    fontWeight: '300',
    fontSize: 12,
  },
});
export default InstructorLessonCard;
