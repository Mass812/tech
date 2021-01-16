export interface iPauseOptionMenuProps {
    showSecondCard: boolean;
    cardOneQuestion: string;
    cardOneSubQuestionLeft: string;
    cardOneSubQuestionRight: string;
    cardOneButtonOneText: string;
    cardOneButtonOneOnPress: any;
    cardOneButtonTwoText: string;
    cardOneButtonTwoOnPress: () => void;
    cardOneButtonThreeText: string;
    cardOneButtonThreeOnPress: () => void;
    cardTwoQuestion: string;
    cardTwoSubQuestionLeft: string;
    cardTwoButtonOneText: string;
    cardTwoButtonOneOnPress: () => void;
    cardTwoButtonTwoText: string;
    cardTwoButtonTwoOnPress: () => void;
    cardTwoButtonThreeText?: string;
    cardTwoButtonThreeOnPress?: () => void;
    onPressHaze: () => void;
  }
  