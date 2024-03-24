import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const Cadastro = () => {
  const [email, setEmail] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogin = async () => {

    const user = await userService.addUser({
      email,
      firstName: nome,
      lastName: sobrenome,
      password,
      username: '',
    });

    if (user) {
      alert('Usuário autenticado com sucesso ' + nome);
      setEmail('');
      setPassword('');
      setNome('');
      setSobrenome('');
    } else {
      alert('Usuário e/ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro</Text><Image
    style={styles.imageStyle}
    source={require('../../../assets/icone.png')}
  />



        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="Nome"
          placeholderTextColor="#8a8a8a"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="Sobrenome"
          placeholderTextColor="#8a8a8a"
          onChangeText={setSobrenome}
          value={sobrenome}
        />
        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="E-mail"
          placeholderTextColor="#8a8a8a"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#8a8a8a"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={handleNavegarLogin}>Ir para login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1', // Cor de fundo da tela de login
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    paddingTop: 20,
    marginTop: 20, // Ajuste ou adicione esta margem para criar espaço entre a imagem e o formulário
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
    backgroundColor: '#CFD8DC', // Cor dos campos de entrada da tela de login
    borderRadius: 25,
    marginVertical: 10,
    paddingLeft: 20,
    fontSize: 16,
    elevation: 3, // Sombra dos campos de entrada
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  errorInput: {
    borderColor: '#FF3D00', // Cor de borda para erro
    borderWidth: 1,
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#607D8B', // Cor do botão 'Entrar' da tela de login
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
    color: '#607D8B', // Cor do texto 'Ir para cadastro' da tela de login
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

export default Cadastro;