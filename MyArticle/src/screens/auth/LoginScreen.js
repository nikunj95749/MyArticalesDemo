import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {logIn} from '../../resources/baseServices/auth';
import {setUserDetails} from '../../helpers/auth';
import {setUserDetailsAction} from '../../store/userDetails';
import {logError} from '../../helpers';
import CustomButton from '../../components/CustomButton';
import useApiErrorsHandler from '../../hooks/useApiErrorHandler';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('dasdasd@gmail.com');
  const [password, setPassword] = useState('dsfafsdfsd');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loader, setLoader] = useState(false);
  const handleApiErrors = useApiErrorsHandler();

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    try {
      setLoader(true);
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }

      setEmailError('');

      if (validateEmail(email) && password.length >= 6) {
        const loginData = {
          user: {
            email,
            password,
          },
        };

        const response = await logIn(loginData);
        await setUserDetails(JSON.stringify(response?.data?.user));
        dispatch(setUserDetailsAction(response?.data?.user));
        navigation.goBack();
      }
    } catch (error) {
      handleApiErrors(error);
      logError(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Log in</Text>
      <View style={styles.subContainer}>
        <KeyboardAwareScrollView bounces={false} style={styles.flex}>
          <View style={styles.loginView}>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <TextInput
              style={styles.input}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
            {passwordError ? (
              <Text style={styles.error}>{passwordError}</Text>
            ) : null}
            <CustomButton
              title="Login"
              isLoading={loader}
              onPress={handleLogin}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f13',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  loginText: {
    fontWeight: '600',
    fontSize: 32,
    color: 'white',
    alignSelf: 'center',
    marginBottom: '16%',
  },
  subContainer: {
    borderTopLeftRadius: 50,
    height: '75%',
    backgroundColor: 'white',
  },
  loginView: {
    marginTop: '30%',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
