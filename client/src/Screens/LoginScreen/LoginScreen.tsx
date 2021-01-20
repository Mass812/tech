import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Backlay from './LoginScreenComponents/Backlay';
import FabFitIconBlock from './LoginScreenComponents/FabFitIconBlock';
import InputBlock from './LoginScreenComponents/InputBlock';
import PayMembershipBlock from './LoginScreenComponents/PayMembershipBlock';
import {useMutation} from 'urql';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import {AuthContext} from '../../Context/AuthContext';

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
  email?: string;
  password?: string;
};

type StateConditions = null | iSignIn;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {state, dispatch} = useContext(AuthContext);
  const [userInput, setUserInput] = useState<StateConditions>(null);

  const [returnedData, signInUser] = useMutation(checkUserAndValidity);

  const {data, fetching, error} = returnedData;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const handleOnChangeEmail = (text: string) => {
    let textLowerCase = text.toLowerCase();
    setUserInput({...userInput, email: textLowerCase});
  };

  const handleOnChangePassword = (text: string) => {
    let textLowerCase = text.toLowerCase();
    setUserInput({...userInput, password: textLowerCase});
  };

  const onPress = async () => {
    signInUser({...userInput})
      .then((data) => {
        console.log('data from MUTATION => ', data);
        dispatch({type: 'EMAIL', payload: data.data.login.email});
        dispatch({type: 'TOKEN', payload: data.data.login.token});
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Backlay />
      <FabFitIconBlock />
      <View style={styles.bottom}>
        <InputBlock
          onChangeEmail={(text: string) => handleOnChangeEmail(text)}
          onChangePassword={(text: string) => handleOnChangePassword(text)}
          onPress={onPress}
        />
        <Text style={styles.message}>
          Sign in with user: matt@gmail.com, pw: password
        </Text>
        <View style={styles.orBlock}>
          <Text style={styles.orText}>OR</Text>
        </View>
        <PayMembershipBlock />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: 300,
  },
  orBlock: {
    height: 35,
    alignItems: 'center',
  },
  message: {
    color: 'salmon',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'white',
  },
  orText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
export default LoginScreen;
