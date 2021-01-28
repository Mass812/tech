import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {SgVideoStore} from '../../../Context/SgVideoContext';
import {AuthContext} from '../../../Context/AuthContext';
import PauseOptionMenuCard from '../../../ReusableComponents/PauseOptionMenu/PauseOptionMenu';
import {useMutation} from 'urql';
import UpdateUserDocAttribute from '../../../Urql_Requests/Mutations/UpdateUserDocAttribute';

interface PauseOptionCardProps {
  restartTheLesson?: () => void | any;
}

const PauseOptionCard: React.FC<PauseOptionCardProps> = ({
  restartTheLesson,
}) => {
  const {state: sgState, dispatch: sgDispatch} = useContext(SgVideoStore);
  const {state: authState, dispatch: authDispatch} = useContext(SgVideoStore);
  const [data, updateUserDocAttribute] = useMutation(UpdateUserDocAttribute);

  const [showSecondCard, setShowSecondCard] = useState<boolean>(false);

  let nav = useNavigation();

  const handleQuitLesson = () => {
    setShowSecondCard(true);
  };
  const handleResumeLesson = () => {
    sgDispatch({type: 'PAUSED', payload: false});
  };

  const handleMarkAsCompleted = () => {
    // self guided update popularity
    // add user time and lesson completed

    sgDispatch({type: 'LOADING', payload: true});
    let userWatchTime = sgState.currentTime * 1000;

    sgDispatch({type: 'USER_WATCH_TIME', payload: userWatchTime});

    let addLessonCompletedCountTOUserDoc = updateUserDocAttribute({
      email: authState.email,
      attr: 'selfGuidedCompleted',
      value: 1,
    }).catch((err) => console.log(err));

    let addUserWatchTimeToUserDoc = updateUserDocAttribute({
      email: authState.email,
      attr: 'userWatchTime',
      value: sgState.playableDuration * 1000,
    }).catch((err) => console.log(err));

    try {
      return [addLessonCompletedCountTOUserDoc, addUserWatchTimeToUserDoc];
    } catch (err) {
      console.log(err);
    } finally {
      sgDispatch({type: 'LOADING', payload: false});
      // TODO congrats screen
      nav.navigate('Home');
      // sgDispatch({type: 'LESSON_COMPLETED', payload: true});
    }
  };

  return (
    <PauseOptionMenuCard
      showSecondCard={showSecondCard}
      cardOneQuestion={sgState.title}
      cardOneSubQuestionLeft={`${sgState.totalPlayerTimeAsString}`}
      cardOneSubQuestionRight={`${sgState.sectionNumber + 1} / ${
        sgState.exerciseSections.length
      } `}
      cardOneButtonOneText={`Restart Workout`}
      cardOneButtonOneOnPress={restartTheLesson}
      cardOneButtonTwoText={'Quit Lesson'}
      cardOneButtonTwoOnPress={handleQuitLesson}
      cardOneButtonThreeText={'Resume Lesson'}
      cardOneButtonThreeOnPress={handleResumeLesson}
      cardTwoQuestion={'How do you want to end your workout?'}
      cardTwoSubQuestionLeft={`${sgState.timeRemainingAsString.substring(
        0,
        5,
      )} Remaining`}
      cardTwoButtonOneText={'Mark as Complete'}
      cardTwoButtonOneOnPress={handleMarkAsCompleted}
      cardTwoButtonTwoText={'Quit Workout'}
      cardTwoButtonTwoOnPress={() => nav.navigate('Home')}
      onPressHaze={() => sgDispatch({type: 'PAUSED', payload: !sgState.paused})}
    />
  );
};

export default PauseOptionCard;
