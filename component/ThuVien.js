import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, ScrollView ,FlatList} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App({ navigation }) {
  const dataMusic = [
    {
      id: 0,
      category: "ballad",
      name: "Gương Mặt Lạ Lẩm",
      image: require("../img/list/GuongMatLaLam.jpg"),
      time: '5:34',

    },
    {
      id: 1,
      category: "ballad",
      name: "Hết Thương cạn nhớ",
      image: require("../img/list/HetThuongCanNho.jpg"),
      time: '4:44',

    },
    {
      id: 2,
      category: "ballad",
      name: "Hết Thương cạn nhớ",
      image: require("../img/list/HetThuongCanNho.jpg"),
      time: '4:44',

    },

  ]

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() => { navigation.navigate("User") }}>
          <Image source={require('../img/user/tung.jpg')} style={{ width: 50, height: 50, borderRadius: 150, paddingLeft: 10 }} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <Icon name='search' style={styles.iconSearch} size={20} />

          <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input} />
          <Icon name='microphone' style={styles.iconSpeak} size={20} />

        </View>
        <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
          <Icon name='gear' size={20} />
        </TouchableOpacity>



      </View>
      <Text style={{ fontSize: 25, fontWeight: '700', margin: 20 }}>Thư viện</Text>

      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity>
          <View style={styles.upgrade}>

            <Image source={require('../icon/library/favorite.png')} style={{ width: 48, height: 51 }} />
            <Text style={styles.text}>Bài hát yêu thích</Text>

            <Text style={[styles.text, { color: '#875454' }]}>77</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.upgrade}>
            <Icon name='download' size={48} />
            <Text style={styles.text}>Đã tải</Text>
            <Text style={[styles.text, { color: '#875454' }]}>0</Text>
          </View>
        </TouchableOpacity>

      </View>

      <View style={{margin:20}}>
        <Text style={{ fontSize: 21, fontWeight: '700' }}>Nghe gần đây </Text>


        <FlatList
        horizontal ={true}
        data={dataMusic}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginLeft:-10}}>
          
              <Image source={item.image} style={ styles.imgMusic} />
         
            <Text >{item.name}</Text>
          </TouchableOpacity>

        )}
      />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 10

  },
  scrollContainer: {

    flexDirection: 'row',
    marginTop: 10,
    height: 220
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  input: {
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#F9D0DA',
    borderRadius: 140,
    width: 245,
    height: 37,
  },
  iconSearch: {

    position: 'absolute',
    marginLeft: 10,
    marginTop: 10,
    color: '#8E86A8',



  },

  iconSpeak: {
    color: '#8E86A8',
    position: 'absolute',
    marginLeft: 210,
    marginTop: 10,


  },
  upgrade: {
    margin: 10,
    width: 170,
    height: 150,
    borderRadius: 30,
    borderColor: '#DAC6C6',
    borderWidth: 1,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'space-around',

  },

  imgMusic: {
    margin: 10,
   
    width: 160,
    height: 165,
    borderRadius: 30,
    borderColor: '#DAC6C6',
    borderWidth: 1,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  text: {
    fontWeight: '800',
    fontSize: 12
  }
});
