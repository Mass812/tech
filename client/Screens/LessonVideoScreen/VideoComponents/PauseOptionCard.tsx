import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {VideoStore} from '../LessonVideoScreen';

interface PauseOptionCardProps {
  restartTheLeeson?: () => void;
}

interface iPressText {
  text: string;
  onPress?: () => void;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Haze: React.FC<PauseOptionCardProps> = () => {
  const {state, dispatch} = useContext(VideoStore);
  return (
    <View style={styles.haze}>
      <TouchableOpacity
        style={styles.hazeButton}
        onPress={() => dispatch({type: 'PAUSED', payload: false})}
      />
    </View>
  );
};

const CardButton: React.FC<iPressText> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const CardButtonPink: React.FC<iPressText> = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonPink} onPress={onPress}>
      <View style={styles.pinkButtonDetails}>
        <FontAwesomeIcon icon={faPlayCircle} size={22} color={'white'} />
        <Text style={styles.buttonText}>{`  ${text}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PauseOptionCard: React.FC<PauseOptionCardProps> = ({
  restartTheLeeson,
}) => {
  const {state, dispatch} = useContext(VideoStore);
  const [showSecondCard, setShowSecondCard] = useState<boolean>();
  let nav = useNavigation();

  const handleQuitLesson = () => {
    setShowSecondCard(true);
  };
  const handleResumeLesson = () => {
    dispatch({type: 'PAUSED', payload: false});
  };

  const handleMarkAsCompleted = () => {
    console.log('do something');
  };

  return (
    <>
      <Haze />
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          {!showSecondCard ? (
            <View style={styles.parent}>
              <Text style={styles.question}>{'What Do You Want To Do?'}</Text>

              <View style={{justifyContent: 'flex-start', height: 225}}>
                <CardButton
                  onPress={restartTheLeeson}
                  text={`Restart Lesson ${state.instructor}`}
                />
                <CardButton onPress={handleQuitLesson} text={'End Class'} />

                <CardButtonPink
                  onPress={handleResumeLesson}
                  text={'Resume Lesson'}
                />
              </View>
            </View>
          ) : (
            <View style={styles.parent}>
              <Text style={styles.question}>
                {'How would you like to proceed?'}
              </Text>
              <Text style={styles.question}>
                {`Time Remaining: ${state.timeRemainingAsString.substring(
                  0,
                  5,
                )}`}
              </Text>
              <View>
                <Text style={styles.textDetail}>{'Class '}</Text>
                <Text style={styles.textDetail}>Card 2</Text>
              </View>

              <View style={{justifyContent: 'flex-start', height: 225}}>
                <CardButton
                  onPress={handleMarkAsCompleted}
                  text={'Mark as Completed'}
                />
                <CardButton
                  onPress={() => nav.navigate('Home')}
                  text={'Quit Lesson'}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  haze: {
    // flex: 1,
    backgroundColor: 'black',
    //   height: '100%',
    //  width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  hazeButton: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: 400,
    position: 'absolute',
    bottom: 0,
  },
  bottomContainer: {
    display: 'flex',
    height: 400,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    //  position: 'absolute',
    bottom: 0,
    left: 0,
    top: 40,
    borderRadius: 36,
    padding: 30,
    paddingTop: 36,

    zIndex: 15,
  },
  parent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 300,
    width: width,
    backgroundColor: 'white',

    zIndex: 2,
  },
  question: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
  },
  textDetail: {
    textAlign: 'left',
    color: 'teal',
  },
  button: {
    borderWidth: 0.5,
    backgroundColor: 'rgba(224, 224, 224, .9)',
    minWidth: width - 30,
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 7,
    margin: 14,
  },
  buttonPink: {
    borderWidth: 0.5,
    backgroundColor: 'rgb(239,150,128)',
    minWidth: width - 30,
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 7,
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkButtonDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default PauseOptionCard;
