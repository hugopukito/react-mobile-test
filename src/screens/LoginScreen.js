import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonText, setButtonText] = useState('Login');
  const [buttonColor, setButtonColor] = useState('#3498DB');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setButtonColor('#3498DB');
    setButtonText('Logging in...');

    const url = 'https://hugopukito.com/api/signin';
    const data = { email, password };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        setLoading(false);
        return response.json();
      })
      .then(json => {
        console.log('Token:', json.token);
        setButtonColor('#4CAF50');
        setButtonText('Logged in!');
      })
      .catch(() => {
        setLoading(false);
        setButtonColor('#FF0000');
        setButtonText('Invalid credentials');
        setTimeout(() => {
          setButtonColor('#3498DB');
          setButtonText('Login');
        }, 3000);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>{buttonText}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
