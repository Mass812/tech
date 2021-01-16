import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import CardButtonPink from './CardButtonPink';
import CardButton from './CardButton';
import HazeBacklay from './HazeBacklay';
import {iPauseOptionMenuProps} from '../../Interfaces/PauseOptionMenuComponent';

const width = Dimensions.get('window').width;

const PauseOptionMenuCard: React.FC<iPauseOptionMenuProps> = ({
  showSecondCard,
  cardOneQuestion,
  cardOneSubQuestionLeft,
  cardOneSubQuestionRight,
  cardOneButtonOneText,
  cardOneButtonOneOnPress,
  cardOneButtonTwoText,
  cardOneButtonTwoOnPress,
  cardOneButtonThreeText,
  cardOneButtonThreeOnPress,
  cardTwoQuestion,
  cardTwoSubQuestionLeft,
  cardTwoButtonOneText,
  cardTwoButtonOneOnPress,
  cardTwoButtonTwoText,
  cardTwoButtonTwoOnPress,
  onPressHaze,
}) => {
  return (
    <>
      <HazeBacklay onPressHaze={onPressHaze} />
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          {!showSecondCard ? (
            <View style={styles.parent}>
              <Text style={styles.question}>{cardOneQuestion}</Text>
              <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                  {cardOneSubQuestionLeft} Min
                </Text>
                <Text style={styles.subHeaderText}>
                  {cardOneSubQuestionRight}
                  Exercise
                </Text>
              </View>

              <View style={{justifyContent: 'flex-start', height: 225}}>
                <CardButton
                  onPress={cardOneButtonOneOnPress}
                  text={cardOneButtonOneText}
                />
                <CardButton
                  onPress={cardOneButtonTwoOnPress}
                  text={cardOneButtonTwoText}
                />
                <CardButtonPink
                  onPress={cardOneButtonThreeOnPress}
                  text={cardOneButtonThreeText}
                />
              </View>
            </View>
          ) : (
            <View style={styles.parent}>
              <Text style={styles.question}>{cardTwoQuestion}</Text>
              <Text style={styles.subHeaderText}>{cardTwoSubQuestionLeft}</Text>
              {/* <View>
                <Text style={styles.textDetail}>{'Class '}</Text>
                <Text style={styles.textDetail}>Card 2</Text>
              </View> */}

              <View style={{justifyContent: 'flex-start', height: 225}}>
                <CardButton
                  onPress={cardTwoButtonOneOnPress}
                  text={cardTwoButtonOneText}
                />
                <CardButton
                  onPress={cardTwoButtonTwoOnPress}
                  text={cardTwoButtonTwoText}
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
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  subHeaderText: {
    fontSize: 12,
    margin: 5,
  },
  question: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    marginBottom: 5,
  },
  textDetail: {
    textAlign: 'left',
    color: 'teal',
  },
});
export default PauseOptionMenuCard;
