import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {VideoStore} from '../LessonVideoScreen';
import {useMutation} from 'urql';
import PauseOptionMenuCard from '../../../ReusableComponents/PauseOptionMenu/PauseOptionMenu';
import updateLessonPopularity from '../../../Urql_Requests/Mutations/UpdateVideoPopularity_LessonVideoScreen_PauseOptionCard';

interface PauseOptionCardProps {
  restartTheLesson?: () => void;
}

const PauseOptionCard: React.FC<PauseOptionCardProps> = ({
  restartTheLesson,
}) => {
  const {state, dispatch} = useContext(VideoStore);
  const [showSecondCard, setShowSecondCard] = useState<boolean>(false);
  const {instructor, courseName, weekNumber, lessonNumber} = state;
  const [data, executeMutation] = useMutation(updateLessonPopularity);

  let nav = useNavigation();

  const handleQuitLesson = () => {
    setShowSecondCard(true);
  };
  const handleResumeLesson = () => {
    dispatch({type: 'PAUSED', payload: false});
  };

  // TODO ADD TIME TO USER DOC
  const handleMarkAsCompleted = () => {
    dispatch({type: 'USER_WATCH_TIME', payload: state.currentTime});

    executeMutation({
      instructor,
      courseName,
      weekNumber,
      lessonNumber,
    }).then(() => console.log(data, 'fired off mutation'));
  };

  const handleJustQuit = () => {
    executeMutation({
      instructor,
      courseName,
      weekNumber,
      lessonNumber,
    }).then(() => nav.navigate('Home'));
  };

  return (
    <PauseOptionMenuCard
      showSecondCard={showSecondCard}
      cardOneQuestion={state.title}
      cardOneSubQuestionLeft={`${state.totalPlayerTimeAsString}`}
      cardOneSubQuestionRight={`${state.targets[0]} `}
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
      cardTwoButtonTwoOnPress={handleJustQuit}
      onPressHaze={() => dispatch({type: 'PAUSED', payload: !state.paused})}
    />
  );
};

export default PauseOptionCard;
