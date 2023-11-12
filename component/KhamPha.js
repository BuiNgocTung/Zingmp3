import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation }) {
  const recentMusicData = [
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
              
            <TouchableOpacity   onPress={() => { navigation.navigate("Search") }}>
            <Icon name='search' style={styles.searchIcon} size={20} />
            <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input}  editable={false}/>
            </TouchableOpacity>
            <Icon name='microphone' style={styles.microphoneIcon} size={20} />
          </View>

          <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
            <Icon name='gear' size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={require('../img/khamPha/khamP.png')} style={{ width: 330, height: 164 }} />
        </TouchableOpacity>
        {/* menu icon */}
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
        
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.upgradeItem}>
              <Icon name='music' />
            </View>
            <Text style={{ fontSize: 12 }}>Nhạc mới</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate("Category") }}>
            <View style={styles.upgradeItem}>
              <Icon name='list' />
            </View>
            <Text style={{ fontSize: 12 }}>Thể loại</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.upgradeItem}>
              <Icon name='star' />
            </View>
            <Text style={{ fontSize: 12 }}>Top 10</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.upgradeItem}>
              <Icon name='play' />
            </View>
            <Text style={{ fontSize: 12 }}>Top MV</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.upgradeItem}>
              <Icon name='calendar' />
            </View>
            <Text style={{ fontSize: 12 }}>Sự kiện</Text>
          </TouchableOpacity>

          







        </View>

        {/* Danh sách nhạc nghe gần đây */}
        <View style={styles.recentMusicContainer}>
          <Text style={styles.recentMusicTitle}>Nghe gần đây</Text>
          <FlatList
            horizontal={true}
            data={recentMusicData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.recentMusicItem}>
                <Image source={item.image} style={[styles.recentMusicImage, { width: 160, height: 165, }]} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )} />
        </View>
        {/* Danh sách có thể bạn muốn nghe */}
        <View style={styles.recentMusicContainer}>
          <Text style={styles.recentMusicTitle}>Có thể bạn muốn nghe</Text>
          <FlatList
            horizontal={true}
            data={recentMusicData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.recentMusicItem}>
                <Image source={item.image} style={[styles.recentMusicImage, { width: 160, height: 165, }]} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )} />
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundImage: 'linear-gradient(180deg, #FFF 0%, #D479E3 100%) '

  },
  header: {
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



  favoriteIcon: {
    width: 48,
    height: 51,
  },

  downloadIcon: {
    width: 48,
    height: 51,
  },
  recentMusicContainer: {
    margin: 20,

  },
  recentMusicTitle: {
    fontSize: 21,
    fontWeight: '700',

  },
  recentMusicItem: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  recentMusicImage: {
    marginRight: 20,

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
  tabContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  tabButton: {
    borderBottomWidth: 1,
    borderColor: 'transparent',
    width: 70,
    height: 30,
    marginRight: 10,
  },
  selectedTabButton: {
    borderBottomColor: '#AB43AD',
    borderBottomWidth: 1,
  },
  tabButtonText: {
    fontSize: 18,
  },
  selectedTabButtonText: {
    fontWeight: 'bold',
  },
  additionalButtonsContainer: {
    flexDirection: 'column',
  },
  additionalButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIconContainer: {
    backgroundColor: '#C0BBBB',
    width: 50,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonIcon: {
    color: 'black',
  },
  additionalButtonText: {
    fontSize: 14,
  },
  noAlbumMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  noAlbumIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  noAlbumIcon: {
    fontSize: 20,
  },
  noAlbumText: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  upgradeItem: {
     width: 37,
     height: 37, 
     borderRadius: 20,
    marginBottom:5,
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
    justifyContent: 'center'
  },
  menuItem:{
    alignItems: 'center', 
    justifyContent: 'center',
     
     width: 60, 
     height: 50
  }
});
