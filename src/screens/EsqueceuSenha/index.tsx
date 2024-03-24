import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState<string>('');

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate('Login');
  };

  const handleEsqueceuSenha = async () => {

    const user = await userService.forgotPassword(email);

    if (user) {
      alert('Email de recuperação de senha enviado com sucesso ');
    } else {
      alert('Email inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu a senha</Text>
      <Image
    style={styles.imageStyle}
    source={require('../../../assets/icone.png')}
  />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8a8a8a"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleEsqueceuSenha} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <Text style={styles.linkText} onPress={handleNavegarLogin}>Ir para login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#37474F', // Um azul escuro acinzentado para o título
    textAlign: 'center',
    marginTop: 50, // Aumente este valor conforme necessário para descer o texto
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#CFD8DC',
    borderRadius: 25,
    marginVertical: 10,
    paddingLeft: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    color: '#37474F',
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#607D8B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#607D8B',
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20, // Ajuste esta margem para manter a relação de espaçamento com o texto "Login"
  },


});

export default EsqueceuSenha;