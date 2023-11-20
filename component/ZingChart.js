import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Text, ScrollView } from 'react-native';  // Import Image

import Icon from 'react-native-vector-icons/MaterialIcons';
import Chart from '../component/Chart'
export default function ZingChart({ navigation, route }) {
  const { user } = route.params || {};
  const userImage = user && user.img ? { uri: user.img } : require('../img/user/user.png');

  const [data, setData] = useState([]);
  useEffect(() => {
    // Gửi yêu cầu GET đến API
    fetch('http://localhost:3001/song')
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      });
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>


        <View style={styles.header}>
          {/* Thanh header */}


          <TouchableOpacity onPress={() => { navigation.navigate("User") }}>
            <Image source={userImage} style={styles.userImage} />
          </TouchableOpacity>

          <View style={styles.searchBar}>

            <TouchableOpacity onPress={() => { navigation.navigate("Search") }}>
              <Icon name='search' style={styles.searchIcon} size={20} />
              <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input} editable={false} />
            </TouchableOpacity>

            <Icon name='mic' style={styles.microphoneIcon} size={20} />
          </View>

          <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
            <Icon name='settings' size={20} />
          </TouchableOpacity>
        </View>
        {/*----- */}
        <Text style={styles.gradientText}>#Zingchar</Text>
        {/* Đồ thị */}
        <View style={{
          // alignItems: 'center',
          // justifyContent: 'center'
        }}>
          <Chart />
        </View>
        {/* list music */}
        <View style={{
          backgroundImage: 'linear-gradient(180deg, #61D7D7 0%, rgba(25, 46, 232, 0.00) 100%)', borderRadius: 20,
          width: '100%', marginTop: 20
        }}>
          <View style={{ marginTop: 5 }}>
            <FlatList
              data={data.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontWeight: '700', fontSize: 23, color: 'white' }}>{item.id + 1}</Text>
                  <TouchableOpacity style={styles.recentMusicItem}
                    onPress={() => { navigation.navigate("ChiTietBH", { songId: item.id, data: data }) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={item.img} style={styles.recentMusicImage} />

                        <View>
                          <Text style={{ fontSize: 13, fontWeight: '700' }}>{item.title}</Text>
                          <Text>{item.artist}</Text>
                        </View>
                      </View>
                    </View>

                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name='more-horiz' size={25} color={'gray'} />
                  </TouchableOpacity>

                </View>

              )} />
          </View>

        </View>

      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundImage: 'linear-gradient(110deg, #7000BE 0%, rgba(0,0,255,0) 100%)'
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 150,
    paddingLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 10,
    color: '#8E86A8',
  },
  microphoneIcon: {
    color: '#8E86A8',
    position: 'absolute',
    marginLeft: 210,
    marginTop: 10,
  },
  input: {
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#F9D0DA',
    borderRadius: 140,
    width: 245,
    height: 37,
  },
  recentMusicItem: {
    width: 280,
    height: 50,
    margin: 5,
    // marginLeft: 20
  },
  recentMusicImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5
  },
  gradientText: {
    margin: 20,
    fontSize: 25,
    fontWeight: '700',
    color: 'red',
    textShadowColor: 'red',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    letterSpacing: 1.25,

    // Add any other styles you need for your text
  },
});


