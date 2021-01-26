import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import Backlay from './LoginScreenComponents/Backlay';
import FabFitIconBlock from './LoginScreenComponents/FabFitIconBlock';
import InputBlock from './LoginScreenComponents/InputBlock';
import PayMembershipBlock from './LoginScreenComponents/PayMembershipBlock';
import {useMutation} from 'urql';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import {AuthContext} from '../../Context/AuthContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('screen').height;

const checkUserAndValidity = `
mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        email
    }
}
`;
interface LoginScreenProps {}

type iSignIn = {
  email: string;
  password: string;
};

type StateConditions = iSignIn;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {state, dispatch} = useContext(AuthContext);
  const nav = useNavigation();
  const [userInput, setUserInput] = useState<StateConditions>({
    email: '',
    password: '',
  });
  const [hideSection, setHideSection] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [returnedData, signInUser] = useMutation(checkUserAndValidity);

  const {data, fetching, error} = returnedData;

  if (error) return <ErrorScreen error={error.message} />;

  const handleOnChangeEmail = (text: string) => {
    let textLowerCase = text.trim().toLowerCase();
    setUserInput({...userInput, email: textLowerCase});
  };

  const handleOnChangePassword = (text: string) => {
    let textLowerCase = text.trim().toLowerCase();
    setUserInput({...userInput, password: textLowerCase});
  };

  let isValidInput =
    userInput.email.trim().length !== undefined &&
    userInput.password.trim().length !== 0 &&
    !fetching
      ? true
      : false;

  const onPress = () => {
    signInUser({...userInput})
      .then((data) => {
        console.log('error Data ==> ', data);
        if (data.data.login === null) {
          setHideSection(true);
          setErrorMessage('Please try again, invalid credentials');
        } else {
          dispatch({type: 'EMAIL', payload: data.data.login.email});
          dispatch({type: 'TOKEN', payload: data.data.login.token});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Backlay />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <FabFitIconBlock />
            {errorMessage !== '' ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <InputBlock
              onChangeEmail={(text: string) => handleOnChangeEmail(text)}
              onChangePassword={(text: string) => handleOnChangePassword(text)}
              onPress={onPress}
              hideSection={hideSection}
              disabled={isValidInput}
              onFocusInputOne={() => setHideSection(true)}
              onFoucusInputTwo={() => setHideSection(true)}
              onBlur={() => setHideSection(false)}
              fetching={true}
              focusButton={Keyboard.dismiss}
            />
            <Text style={styles.message}>
              Sign in with user: matt@gmail.com, pw: password
            </Text>
          </KeyboardAvoidingView>
          <View style={styles.orBlock}>
            <Text style={styles.orText}>OR</Text>
          </View>
          <PayMembershipBlock />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  orBlock: {
    height: 35,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'yellow',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: '700',
  },
  message: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'salmon',
    padding: 4,
    fontWeight: '700',
  },
  orText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
export default LoginScreen;
