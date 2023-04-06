import React, {useContext, useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {ListItemsScreenProps} from '../../models/navigationTypes';
import {UserAccountContext} from '../../contexts/UserAccountContext';
import {asyncGetData, generateToken} from '../../services/dataGenerator';
import {STORAGE_KEYS} from '../../services/enums';

interface AllUsers {
  email: string;
  password: string;
  token: string;
}

const Login: React.FC<ListItemsScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  // Destructure properties from the UserAccountContext and set default values if they are not defined
  const {
    users = [],
    setUsers = () => {},
    setLoginUserToken,
    setToken,
  } = useContext(UserAccountContext) ?? {};

  // Generate a new token
  const token = generateToken();

  // Define an async function to get all user data from local storage
  const getAllUserData = async () => {
    // Await the result of the asyncGetData function call with the STORAGE_KEYS.USER parameter
    await asyncGetData(STORAGE_KEYS.USER).then(data => {
      // If data exists, parse it and set it as allUsers
      if (data) {
        setAllUsers(JSON.parse(data));
      }
    });
  };

  // Use the useEffect hook to call getAllUserData function only once on initial render
  useEffect(() => {
    getAllUserData();
  }, []);

  // Define a function to validate an email string against a regular expression
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // Define a function to handle the login process
  const handleLogin = () => {
    try {
      // Throw an error if email or password is missing
      if (!email || !password) {
        throw Error('All fields are required');
      }
      // Throw an error if the email is not valid
      if (!validateEmail(email)) {
        throw Error('Please provide a valid email');
      }
      let emailExists = false;
      // Define a variable to store the old user token
      let oldUserToken = '';
      // Check if the email exists in the allUsers array and set the emailExists and oldUserToken variables accordingly
      allUsers.some(item => {
        if (item.email === email) {
          emailExists = true;
          oldUserToken = item.token;
          return true;
        }
      });

      // If the email exists, set the old user token as the current token and login user token
      if (emailExists) {
        setToken(oldUserToken), setLoginUserToken(oldUserToken);
      } else {
        // If the email does not exist, add a new user object to the users array with the new token and set it as the current token and login user token
        setUsers([
          ...users,
          {email: email.trim(), password: password, token: token},
        ]);
        setToken(token), setLoginUserToken(token);
      }
    } catch (error: any) {
      // Show an alert with the error message if an error occurs during the login process
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoComplete="password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
