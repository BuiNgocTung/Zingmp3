import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Gửi yêu cầu để lấy danh sách người dùng từ API
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      const loggedInUser = data.find(user => user.username === username && user.password === password);
      if (loggedInUser) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Tab',
              state: {
                routes: [
                  {
                    name: 'Thư viện',
                    state: {
                      routes: [
                        { name: 'ThuVien', params: { user: loggedInUser, data: data } },
                      ],
                    },
                  },

                  {
                    name: 'Khám phá',
                    state: {
                      routes: [
                        { name: 'KhamPha', params: { user: loggedInUser, data: data } },
                      ],
                    },
                  },

                  {
                    name: '#zingchart',
                    state: {
                      routes: [
                        { name: 'zingchart', params: { user: loggedInUser, data: data } },
                      ],
                    },
                  },

                  {
                    name: 'Radio',
                    state: {
                      routes: [
                        { name: 'Radio', params: { user: loggedInUser, data: data } },
                      ],
                    },
                  },
                  
                  {
                    name: 'User',
                    state: {
                      routes: [
                        { name: 'User', params: { user: loggedInUser, data: data } },
                      ],
                    },
                  }
                ],
              },
            },
          ],
        });






      } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng nhập', error);
    }
  };




  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <Image source={require('../icon/load/name.png')} style={{ width: 227, height: 67 }} />
        <Text style={{ fontSize: 45, color: '#FFF', marginLeft: -90 }}>mp3</Text>
      </View>

      <View style={{ paddingTop: 50 }}>
        <TextInput placeholder='Tên đăng nhập' style={styles.input} placeholderTextColor={'#978B8B'} value={username}
          onChangeText={(text) => setUsername(text)}></TextInput>
        <TextInput placeholder='Mật khẩu ' style={styles.input} placeholderTextColor={'#978B8B'} secureTextEntry={true}
          value={password} onChangeText={(text) => setPassword(text)} ></TextInput>
        <Text style={{ color: 'white', paddingLeft: 170, fontSize: 20 }}>Quên mật khẩu?</Text>
      </View>

      <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
        <Text style={{ color: 'white', fontSize: 20 }}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={{ color: 'white', fontSize: 15 }}>Tiếp tục với</Text>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Image source={require('../icon/login/google.png')} style={styles.icon} />
        <Image source={require('../icon/login/apple.png')} style={styles.icon} />
        <Image source={require('../icon/login/facebook.png')} style={styles.icon} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Bạn chưa là thành viên?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
          <Text style={{ color: '#4790FD', fontSize: 15 }}> Hãy đăng ký</Text>
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
  icon: {

    width: 46, height: 46,
    margin: 10
  }

});
