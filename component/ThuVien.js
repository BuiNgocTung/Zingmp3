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

  const [selectedTab, setSelectedTab] = useState('Playlist');
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(true);

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Hiển thị nút bổ sung khi chọn tab "Playlist"
    if (tabName === 'Playlist') {
      setShowAdditionalButtons(true);
    } else {
      setShowAdditionalButtons(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          {/* Thanh header */}
          <TouchableOpacity onPress={() => { navigation.navigate("User") }}>
            <Image source={require('../img/user/tung.jpg')} style={styles.userImage} />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Icon name='search' style={styles.searchIcon} size={20} />
            <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input} />
            <Icon name='microphone' style={styles.microphoneIcon} size={20} />
          </View>

          <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
            <Icon name='gear' size={20} />
          </TouchableOpacity>
        </View>

        {/* Tiêu đề */}
        <Text style={styles.title}>Thư viện</Text>

        {/* Phần nút "Bài hát yêu thích" và "Đã tải" */}
        <View style={styles.upgradeContainer}>
          <TouchableOpacity>
            <View style={styles.upgradeItem}>
              <Image source={require('../icon/library/favorite.png')} style={styles.favoriteIcon} />
              <Text style={styles.upgradeText}>Bài hát yêu thích</Text>
              <Text style={styles.upgradeCount}>77</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.upgradeItem}>
              <Icon name='download' size={48} style={styles.downloadIcon} />
              <Text style={styles.upgradeText}>Đã tải</Text>
              <Text style={styles.upgradeCount}>0</Text>
            </View>
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
                <Image source={item.image} style={styles.recentMusicImage} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Chuyển đổi tab "Playlist" và "Album" */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Playlist' && styles.selectedTabButton]}
            onPress={() => handleTabPress('Playlist')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === 'Playlist' && styles.selectedTabButtonText,
              ]}
            >
              Playlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Album' && styles.selectedTabButton]}
            onPress={() => handleTabPress('Album')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === 'Album' && styles.selectedTabButtonText,
              ]}
            >
              Album
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nút bổ sung khi chọn tab "Playlist" */}
        {showAdditionalButtons==true && (
          <View style={styles.additionalButtonsContainer}>
            <TouchableOpacity style={styles.additionalButton}>
              <View style={styles.buttonIconContainer}>
                <Icon name='plus' size={20} style={styles.buttonIcon} />
              </View>
              <Text style={styles.additionalButtonText}>Tạo playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.additionalButton}>
              <View style={styles.buttonIconContainer}>
                <Icon name='music' size={20} style={styles.buttonIcon} />
              </View>
              <Text style={styles.additionalButtonText}>Những bài nhạc hay của PMQ</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Thông báo khi chưa có playlist */}
        {showAdditionalButtons==false && (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 1, borderColor: 'gray', width: 40, height: 40, borderRadius: 10
            }}>
              <Icon name='music' size={20} /></View>
            <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 10 }}>Bạn chưa có album nào</Text>
            <Text style={{ fontSize: 14, marginTop: 10 }}>Tìm album bạn yêu thích để thêm</Text>
            <Text style={{ fontSize: 14, }}>vào thư viện</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft:10,
    marginRight:10
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
  title: {
    fontSize: 25,
    fontWeight: '700',
    margin: 20,
  },
  upgradeContainer: {
    flexDirection: 'row',
  },
  upgradeItem: {
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
  favoriteIcon: {
    width: 48,
    height: 51,
  },
  upgradeText: {
    fontWeight: '800',
    fontSize: 12,
  },
  upgradeCount: {
    color: '#875454',
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
    marginLeft: -10,
  },
  recentMusicImage: {
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
});
