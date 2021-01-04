import React, {useReducer} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ComponenntInitialState: ComponentState = {
  loading: false,
  data: [],
  more: 0,
  after: 0,
  name: 'Timmy Reducer',
};
//create an initial state interface to ensure type checking on the actual initial state
interface ComponentState {
  loading: boolean;
  data: string[];
  more: number;
  after: number;
  name: string;
}
// define the types as strings, and option the payloads so that
// all action dispatches do not have to be passed in if they are not needed
// NOtice that I can destructure the action in the rducer without issue now--and
// typescript knows what type and payload are

//use cases to type check the type string

type Action =
  | {type: 'LOADING_TRUE'}
  | {type: 'NAME'; payload: string}
  | {type: 'LOADING'; payload: string};

const someReducer = (state: ComponentState, action: Action) => {
  switch (action.type) {
    case 'LOADING_TRUE':
      return {...state, loading: true};
    case 'NAME':
      return {...state, name: action.payload};
    case 'LOADING':
      return {...state, loading: false, data: [...state.data, action.payload]};
    default:
      throw new Error('No action recognized ');
  }
};

interface CourseListPaginationContextProps {
  onPress: (e: React.SyntheticEvent) => void;
}

const CourseListPaginationContext: React.FC<CourseListPaginationContextProps> = ({
  onPress,
}) => {
  const [state, dispatch] = useReducer(someReducer, ComponenntInitialState);
  const {loading, data, name, more, after} = state;

  const hadnleOnPress = () => {
    dispatch({type: 'LOADING_TRUE'});
    dispatch({type: 'NAME', payload: 'tim'});
  };
  return (
    <View>
      <TouchableOpacity
        style={{height: 100, width: 200, backgroundColor: 'red'}}
        onPress={onPress}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default CourseListPaginationContext;
