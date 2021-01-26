import React, {useRef} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;

interface InputBlockProps {
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onPress: () => void;
  onFocusInputOne?: () => void;
  onFoucusInputTwo?: () => void;
  onBlur?: () => void;
  disabled: boolean;
  hideSection: boolean;
  fetching: boolean;
  focusButton: () => void;
}

const InputBlock: React.FC<InputBlockProps> = ({
  onChangeEmail,
  onChangePassword,
  onPress,
  onFocusInputOne,
  onFoucusInputTwo,
  onBlur,
  hideSection,
  disabled,
  fetching,
  focusButton,
}) => {
  const SignIn = () => {};
  const secondInput = useRef<any>(null);
  return (
    <View>
      {!hideSection && (
        <View style={styles.infoBlock}>
          <Text style={styles.header}>Get Active. Get Fit.</Text>
          <View style={styles.detailLineOneBlock}>
            <Text style={styles.detailLineOne}>Already a </Text>
            <Text style={styles.detailLineOneColored}>Fabletics VIP </Text>
            <Text style={styles.detailLineOne}>member?</Text>
          </View>
          <Text style={styles.detailLineTwo}>No need to sign up!</Text>
          <Text style={styles.detailLineThree}>
            Log in using your membership credetials.
          </Text>
        </View>
      )}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder={'Email'}
          placeholderTextColor={'black'}
          onBlur={() => secondInput.current.focus()}
          returnKeyType={'next'}
          onFocus={onFocusInputOne}
          autoCompleteType={'email'}
        />
        <TextInput
          ref={secondInput}
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder={'Password'}
          placeholderTextColor={'black'}
          onFocus={onFoucusInputTwo}
          onBlur={onBlur}
          autoCompleteType={'password'}
        />

        <View>
          <TouchableOpacity
            style={styles.buttonPink}
            onPress={onPress}
            disabled={disabled}
            touchSoundDisabled={true}
            onFocus={focusButton}>
            <Text style={styles.buttonText}>
              {disabled === true ? 'Sign In' : 'Loading'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width - 40,
    height: 275,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  header: {
    color: 'white',
    fontSize: 22,
    marginBottom: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  detailLineOneBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailLineOne: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  detailLineOneColored: {
    color: 'salmon',
    fontSize: 15,
    fontWeight: '500',
  },
  detailLineTwo: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 3,
  },
  detailLineThree: {
    marginTop: 19,

    marginBottom: 32,
    color: 'white',
  },
  buttonPink: {
    //borderWidth: 0.5,
    backgroundColor: 'rgb(239,150,128)',
    minWidth: width - 60,

    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 3,
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkButtonDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 11,
  },
  input: {
    width: '90%',
    height: 45,
    backgroundColor: 'rgba(219, 219, 219, .4)',
    padding: 3,
    marginBottom: 10,
    marginTop: 15,
  },
});
export default InputBlock;
