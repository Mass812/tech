import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {SgVideoStore} from '../SelfGuidedVideoScreen';
import PauseOptionMenuCard from '../../../ReusableComponents/PauseOptionMenu/PauseOptionMenu';

interface PauseOptionCardProps {
  restartTheLesson?: () => void | any;
}

const PauseOptionCard: React.FC<PauseOptionCardProps> = ({
  restartTheLesson,
}) => {
  const {state, dispatch} = useContext(SgVideoStore);
  const [showSecondCard, setShowSecondCard] = useState<boolean>(false);

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
    <PauseOptionMenuCard
      showSecondCard={showSecondCard}
      cardOneQuestion={state.title}
      cardOneSubQuestionLeft={`${state.totalPlayerTimeAsString}`}
      cardOneSubQuestionRight={`${state.sectionNumber + 1} / ${
        state.exerciseSections.length
      } `}
      cardOneButtonOneText={`Restart Workout`}
      cardOneButtonOneOnPress={restartTheLesson}
      cardOneButtonTwoText={'Quit Lesson'}
      cardOneButtonTwoOnPress={handleQuitLesson}
      cardOneButtonThreeText={'Resume Lesson'}
      cardOneButtonThreeOnPress={handleResumeLesson}
      cardTwoQuestion={'How do you want to end your workout?'}
      cardTwoSubQuestionLeft={`${state.timeRemainingAsString.substring(
        0,
        5,
      )} Remaining`}
      cardTwoButtonOneText={'Mark as Complete'}
      cardTwoButtonOneOnPress={handleMarkAsCompleted}
      cardTwoButtonTwoText={'Quit Workout'}
      cardTwoButtonTwoOnPress={() => nav.navigate('Home')}
      onPressHaze={() => dispatch({type: 'PAUSED', payload: !state.paused})}
    />
  );
};

export default PauseOptionCard;
