import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface ProgramCardProps {
  photo: any;
  instructor?: string;
  title?: string;
  buttonText?: string;
  bulletPoints: string;
  id?: string;
  button: boolean;
  displayAsCard?: boolean;
  onPress?: (e: React.SyntheticEvent) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  button,
  displayAsCard = true,
  onPress,
  photo,
  instructor,
  title,
  buttonText,
  bulletPoints,
  id,
}) => {
  return (
    <View
      style={
        displayAsCard
          ? styles.imageParentCardType
          : styles.imageParentNonCardType
      }
      key={id}>
      <Image
        style={displayAsCard ? styles.imageCardType : styles.imageNonCardType}
        source={{uri: photo}}
      />
      <View
        style={
          displayAsCard
            ? styles.detailsLayoutCardType
            : styles.detailsLayoutNonCardType
        }>
        <Text style={styles.instructor}>{instructor}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.bulletPoints}>{bulletPoints}</Text>
        {button ? (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageParentNonCardType: {
    display: 'flex',
    flexDirection: 'row',
    height: 300,
    width: width,
    // width:  width-30,
    // maxWidth: width-30,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    // margin: 'auto',
    backgroundColor: 'black',
    alignSelf: 'center',
    opacity: 0.86,
  },
  imageNonCardType: {
    position: 'absolute',
    height: 300,
    width: '100%',
    maxWidth: width,
    zIndex: -1,

    opacity: 0.86,
  },
  detailsLayoutNonCardType: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  imageParentCardType: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    //  width: width,
    width: '100%',
    maxWidth: width - 30,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    margin: 'auto',
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 10,

    opacity: 0.95,
  },
  imageCardType: {
    position: 'absolute',
    height: 200,
    width: '100%',
    maxWidth: width - 30,
    zIndex: -1,
    borderRadius: 10,
    borderWidth: 0,
    opacity: 0.77,
  },
  detailsLayoutCardType: {
    // height: '50%',
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'flex-end',
  },
  instructor: {
    fontSize: 15,
    color: 'white',
    top: 0.2,
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textAlign: 'center',
  },

  title: {
    // flex:1,
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    // width: width,
    top: 0.2,
    marginTop: 5,
    marginBottom: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 3,
  },
  bulletPoints: {
    marginTop: 4,
    marginBottom: 15,
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textAlign: 'center',
  },
  button: {
    position: 'relative',
    minWidth: width * 0.3,
    height: 30,
    marginBottom: 30,
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
    fontWeight: '500',
  },
});
export default ProgramCard;
