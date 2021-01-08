import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

interface InstructorProfileThumbProps {
  img: string;
  name: string;
}

const InstructorProfileThumb: React.FC<InstructorProfileThumbProps> = ({
  img,
  name,
}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.card}>
        <View style={styles.imgParent}>
          <Image source={{uri: img}} style={styles.img} />
        </View>

        <View style={styles.cardDetailsParent}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>dahdah... </Text>
        </View>

        <View style={styles.buttonParent}>
          <Text style={styles.buttonText}>View Profile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    // height: 180,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    marginLeft: 15,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    // width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRightColor: 'grey',
    borderRadius: 14,
    width: 160,
  },
  imgParent: {
    height: 100,
    width: 100,
    marginTop: 25,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  cardDetailsParent: {
    margin: 15,
    justifyContent: 'center',
  },
  buttonParent: {
    margin: 5,
    backgroundColor: '#fefee3',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {},

  title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    color: 'darkgrey',
  },
});
export default InstructorProfileThumb;
