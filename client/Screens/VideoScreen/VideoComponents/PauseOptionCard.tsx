import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {BaseButton, TouchableOpacity} from 'react-native-gesture-handler';
import {LessonScreenStore} from '../VideoScreen';

interface PauseOptionCardProps {
  onPress?: () => void;
}

interface iPauseOpButton {
  text: string;
  onPress?: () => void;
}

const Haze: React.FC<PauseOptionCardProps> = () => {
  let {state, dispatch} = useContext(LessonScreenStore);
  return (
    <View style={styles.haze}>
      <TouchableOpacity
        style={styles.hazeButton}
        onPress={() => dispatch({type: 'PAUSED', payload: false})}
      />
    </View>
  );
};

const CardButton: React.FC<iPauseOpButton> = ({text}) => {
  let {state, dispatch} = useContext(LessonScreenStore);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => dispatch({type: 'PAUSED', payload: false})}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const PauseOptionCard: React.FC<PauseOptionCardProps> = () => {
  let {state, dispatch} = useContext(LessonScreenStore);

  const handleUnPause = () => {
    dispatch({type: 'PAUSED', payload: false});
  };

  return (
    <>
      <Haze />
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <View style={styles.parent}>
            <Text style={styles.question}>
              {'question is what to you want to do'}
            </Text>
            <Text>By</Text>
            <View style={{justifyContent: 'space-evenly', height: 225}}>
              <CardButton
                key={1}
                onPress={handleUnPause}
                text={'Resume Lesson'}
              />
              <CardButton text={'I am the first button prop click me'} />
              <CardButton text={'I am the first button prop click me'} />
            </View>
          </View>
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
    zIndex: 0,
  },
  hazeButton: {
    height: '100%',
    width: '100%',
  },
  container: {
    // flex: 1,
    // backgroundColor: 'black',
    // height: '100%',
    // width: '100%',
    // position: 'absolute',
    // opacity: 1,
    // zIndex: 1,
  },
  bottomContainer: {
    display: 'flex',
    height: 440,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 36,
    padding: 30,
    paddingTop: 36,
    opacity: 1,
    zIndex: 2,
  },
  parent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 275,
    width: '100%',
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 2,
  },
  question: {
    fontSize: 16,

    color: 'black',
  },
  button: {
    borderWidth: 0.5,
    backgroundColor: 'lightgrey',
    width: '120%',
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 11,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
export default PauseOptionCard;
