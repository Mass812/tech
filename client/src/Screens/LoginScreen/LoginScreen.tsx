import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Backlay from './LoginScreenComponents/Backlay';
import FabFitIconBlock from './LoginScreenComponents/FabFitIconBlock';
import InputBlock from './LoginScreenComponents/InputBlock';
import PayMembershipBlock from './LoginScreenComponents/PayMembershipBlock';
import {useQuery} from 'urql';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import {AuthContext} from '../../Context/AuthContext';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';

const checkUserAndValidity = `
query ($email: String!, $password: String!) {
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

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const {state, dispatch} = useContext(AuthContext);
  const [userInput, setUserInput] = useState<iSignIn>({
    email: '',
    password: '',
  });

  const [submitData, setSubmitData] = useState<iSignIn>();

  const [returnedData, reexecuteQuery] = useQuery({
    query: checkUserAndValidity,
    variables: submitData,
    requestPolicy: 'network-only',
    pause: !submitData,
  });
  const checkData = async () => {
    if (
      returnedData.operation?.variables?.email &&
      data &&
      !!data.login.token
    ) {
      dispatch({type: 'LOADING', payload: true});
      dispatch({type: 'TOKEN', payload: data.login.token});
      dispatch({type: 'EMAIL', payload: data.login.email});
      dispatch({type: 'LOADING', payload: false});
      setSubmitData({email: '', password: ''});
    }
  };
  useEffect(() => {
    checkData();
  }, [returnedData]);

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
    setSubmitData({...userInput});
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
