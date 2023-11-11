import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Text,ScrollView } from 'react-native';  // Import Image

import Icon from 'react-native-vector-icons/MaterialIcons';
import Chart from '../component/Chart'
export default function ZingChart({ navigation }) {


  const recentMusicData = [
    {
      id: 0,
      image: require('../img/BHYeuThich/Rectangle 18.png'),
      name: 'Gương Mặt Lạ Lẫm',
      tg: 'Mr. Siro'

    },
    {
      id: 1,
      image: require('../img/BHYeuThich/Rectangle 19.png'),
      name: 'Hết Thương Cạn Nhớ',
      tg: 'Đức Phúc'

    },
    {
      id: 2,
      image: require('../img/BHYeuThich/Rectangle 20.png'),
      name: 'Còn Gì Đau Hơn Chữ Đã Từng',
      tg: 'Quân A.P'

    },
    {
      id: 3,
      image: require('../img/BHYeuThich/Rectangle 21.png'),
      name: 'Là Bạn Không Thể Yêu',
      tg: 'Lou Hoàng'

    },
    {
      id: 4,
      image: require('../img/BHYeuThich/Rectangle 22.png'),
      name: 'Bước Qua Đời Nhau',
      tg: 'Lê Bảo Bình'

    },
    {
      id: 5,
      image: require('../img/BHYeuThich/Rectangle 23.png'),
      name: 'Lời Yêu Ngây Dại',
      tg: 'Mr. Siro'

    },
    {
      id: 6,
      image: require('../img/BHYeuThich/Rectangle 24.png'),
      name: 'Buồn Làm Chi Em Ơi',
      tg: 'Trịnh Đình Quang'

    },
    {
      id: 7,
      image: require('../img/BHYeuThich/Rectangle 25.png'),
      name: 'Gương Mặt Lạ Lẫm',
      tg: 'Mr. Siro'

    }

    ,
    {
      id: 8,
      image: require('../img/BHYeuThich/Rectangle 23.png'),
      name: 'Lời Yêu Ngây Dại',
      tg: 'Mr. Siro'

    },
    {
      id: 9,
      image: require('../img/BHYeuThich/Rectangle 24.png'),
      name: 'Buồn Làm Chi Em Ơi',
      tg: 'Trịnh Đình Quang'

    },
    {
      id: 10,
      image: require('../img/BHYeuThich/Rectangle 25.png'),
      name: 'Gương Mặt Lạ Lẫm',
      tg: 'Mr. Siro'

    }
    ,
 
  ];

  return (
    <ScrollView>
    <View style={styles.container}>


      <View style={styles.header}>
        {/* Thanh header */}


        <TouchableOpacity onPress={() => { navigation.navigate("User") }}>
          <Image source={require('../img/user/tung.jpg')} style={styles.userImage} />
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
      <View style={{ alignItems: 'center' }}>
        <Chart />
      </View>
      {/* list music */}
      <View style={{
        backgroundImage: 'linear-gradient(180deg, #61D7D7 0%, rgba(25, 46, 232, 0.00) 100%)', borderRadius: 20,
        width: '100%', marginTop: 20
      }}>
        <View style={{ marginTop: 5 }}>
          <FlatList
            data={recentMusicData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{justifyContent:'space-around',flexDirection:'row' ,alignItems: 'center',}}>
              <Text style={{ fontWeight: '700', fontSize: 23, color: 'white' }}>{item.id+1}</Text>
                <TouchableOpacity style={styles.recentMusicItem}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={item.image} style={styles.recentMusicImage} />

                      <View>
                        <Text style={{ fontSize: 13, fontWeight: '700' }}>{item.name}</Text>
                        <Text>{item.tg}</Text>
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
    margin:20,
    fontSize: 25,
    fontWeight: '700',
    color: 'red',
    textShadowColor: 'linear-gradient(#e66465, #9198e5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    letterSpacing: 1.25,
    fontFamily: 'Roboto',
    // Add any other styles you need for your text
  },
});


