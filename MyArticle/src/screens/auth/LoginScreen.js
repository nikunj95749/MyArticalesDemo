import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {logIn} from '../../resources/baseServices/auth';
import {setAuthToken} from '../../helpers/auth';
import {setAuthTokenAction} from '../../store/auth';
import SmallLoader from '../../components/Loader/SmallLoader';
import { getUserData } from '../../store/profileData';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("dasdasd@gmail.com");
  const [password, setPassword] = useState('dsfafsdfsd');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loader, setLoader] = useState(false);

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setLoader(true);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setLoader(false);
    } else {
      setEmailError('');
      setLoader(false);
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      setLoader(false);
    } else {
      setPasswordError('');
      setLoader(false);
    }

    if (validateEmail(email) && password.length >= 6) {
      const loginData = {
        user: {
          email,
          password,
        },
      };
      try {
        const response = await logIn(loginData);
        await setAuthToken(response?.data?.user?.token);
        dispatch(setAuthTokenAction(response?.data?.user?.token));
        dispatch(getUserData(response?.data?.user));
        navigation.navigate('HomeFeedScreen');
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Log in</Text>
      <View style={styles.subContainer}>
        <KeyboardAwareScrollView bounces={false} style={{flex: 1}}>
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
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {loader ? (
                <SmallLoader />
              ) : (
                <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
                  Login
                </Text>
              )}
            </TouchableOpacity>
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
  loginButton: {
    marginTop: 30,
    width: '100%',
    height: 45,
    backgroundColor: '#0c0f13',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default LoginScreen;
