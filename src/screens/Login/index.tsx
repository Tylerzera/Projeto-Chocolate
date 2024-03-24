import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'; 
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';


const Login = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const handleNavegarEsqueceuSenha = () => {
    navigation.navigate('EsqueceuSenha');
  }

  const handleLogin = async () => {

    if (!login) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    const user = await userService.login(login, password);

    if (user) {
      alert('Usuário autenticado com sucesso ' + user.username);
      setLogin('');
      setPassword('');
    } else {
      alert('Usuário e/ou senha inválidos');
    }
  };

  return (
    <View style={styles.headerContainer}>
  <Text style={styles.title}>Login</Text>
  <Image
    style={styles.imageStyle}
    source={require('../../../assets/icone.png')}
  />


      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, usernameError && styles.errorInput]}
          placeholder="E-mail"
          placeholderTextColor="#8a8a8a"
          onChangeText={setLogin}
          value={login}
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
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavegarCadastro} style={[styles.button, styles.secondaryButton]} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Ir para cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavegarEsqueceuSenha} activeOpacity={0.8}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1', // Um cinza claro para um fundo neutro
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
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
    backgroundColor: '#CFD8DC', // Um cinza azulado para o input
    borderRadius: 25,
    marginVertical: 10,
    paddingLeft: 20,
    fontSize: 16,
    elevation: 3, // Sombras sutis para os inputs
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  errorInput: {
    borderColor: '#FF3D00', // Vermelho para erros
    borderWidth: 1,
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#607D8B', // Um azul petróleo para o botão
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#B0BEC5', // Um cinza mais claro para o segundo botão
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#607D8B', // Cor do botão principal
    fontSize: 16,
    marginTop: 15,
  },

  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20, // Ajuste esta margem para manter a relação de espaçamento com o texto "Login"
  },
});
export default Login;