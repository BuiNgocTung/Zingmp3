import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp.');
        return;
      }
  
         // Gửi yêu cầu để lấy danh sách người dùng từ API
    const response = await  fetch('http://localhost:3001/users');
    const data = await response.json();
      // Kiểm tra xem tên người dùng đã tồn tại hay chưa
      const userExists = data.some(user => user.username === username);
      if (userExists) {
        alert('Tên người dùng đã tồn tại.');
        return;
      }
  
      // Gửi yêu cầu đăng ký đến API
      const signUpResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          img: '',
          favoriteSongs: [] 
        }),
      });
  
      if (signUpResponse.status === 201) {
        navigation.navigate('Login');
      } 
    } catch (error) {
      console.log(error)
    }
  };




  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <Image source={require('../icon/load/name.png')} style={{ width: 227, height: 67 }} />
        <Text style={{ fontSize: 45, color: '#FFF', marginLeft: -90 }}>mp3</Text>
      </View>

      <View style={{ paddingTop: 50 }}>
        <TextInput
          placeholder='Tên đăng nhập'
          style={styles.input}
          placeholderTextColor={'#978B8B'}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
        <TextInput
          placeholder='Mật khẩu '
          style={styles.input}
          placeholderTextColor={'#978B8B'}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TextInput
          placeholder='Nhập lại mật khẩu'
          style={styles.input}
          placeholderTextColor={'#978B8B'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.customButton} onPress={handleSignUp}>
        <Text style={{ color: 'white', fontSize: 20 }}>Đăng ký</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Bạn là thành viên?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
          <Text style={{ color: '#4790FD', fontSize: 15 }}> Hãy đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB43AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '325px',
    height: '65px',
    marginBottom: 30,
    backgroundColor: '#DBC3DB',
    flexShrink: 0,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 25
  },
  customButton: {
    backgroundImage: 'linear-gradient(90deg, #D479E3 0%, #785584 100%)',
    width: '325px',
    height: '50px',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
});
