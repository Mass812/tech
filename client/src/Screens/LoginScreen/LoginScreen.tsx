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
import {AuthContext} from '../../Context/AuthContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const height = Dimensions.get('screen').height;

const checkUserAndValidity = `
mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        email
        membershipStatus
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

  const [userInput, setUserInput] = useState<StateConditions>({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [hideSection, setHideSection] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fetching, setFetching] = useState(false);

  const [returnedData, signInUser] = useMutation(checkUserAndValidity);

  const checkInputs = () => {
    userInput.email.trim().length === 0 ||
    userInput.password.trim().length === 0
      ? setIsDisabled(true)
      : setIsDisabled(false);
  };

  useEffect(() => {
    checkInputs();
  }, [userInput.email, userInput.password]);

  const handleOnChangeEmail = (text: string) => {
    let textLowerCase = text.trim().toLowerCase();
    setUserInput({...userInput, email: textLowerCase});
  };

  const handleOnChangePassword = (text: string) => {
    let textLowerCase = text.trim().toLowerCase();
    setUserInput({...userInput, password: textLowerCase});
  };

  const onPress = () => {
    setFetching(true);
    signInUser({...userInput})
      .then((data) => {
        if (data.error !== undefined) {
          if (data?.error?.message)
            setErrorMessage(`${data.error.message}, No internet.`);
          setFetching(false);
        } else if (data.data.login === null) {
          setHideSection(true);
          setErrorMessage('Please try again, invalid credentials');
          setFetching(false);
        } else {
          setFetching(false);
          dispatch({type: 'EMAIL', payload: data.data.login.email});
          dispatch({type: 'TOKEN', payload: data.data.login.token});
          dispatch({
            type: 'MEMBERSHIP_STATUS',
            payload: data.data.login.membershipStatus,
          });
          console.log('got token', state.membershipStatus, state.token);
        }
      })
      .catch((err) => {
        setFetching(false);
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
            {errorMessage ? (
              <Text style={styles.errorMessage}>
                {errorMessage ? errorMessage : null}
              </Text>
            ) : null}

            <InputBlock
              onChangeEmail={(text: string) => handleOnChangeEmail(text)}
              onChangePassword={(text: string) => handleOnChangePassword(text)}
              onPress={onPress}
              hideSection={hideSection}
              disabled={isDisabled}
              onFocusInputOne={() => setHideSection(true)}
              onFoucusInputTwo={() => setHideSection(true)}
              onBlur={() => setHideSection(false)}
              fetching={fetching}
              focusButton={Keyboard.dismiss}
            />
            <Text style={styles.message}>
              SignIn user: matt@gmail.com, pw: password
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
