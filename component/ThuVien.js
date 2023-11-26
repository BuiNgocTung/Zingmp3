import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ThuVien({ navigation, route }) {
  const { user } = route.params || {};

  const userImage = user && user.img ? { uri: user.img } : require('../img/user/user.png');

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/song')
      .then(response => response.json())
      .then(result => {
        // Sắp xếp các bài hát theo thời gian nghe gần nhất
        const sortedSongs = result.sort((a, b) => {
          // Chuyển đổi thời gian nghe sang đối tượng Date để so sánh
          const timeA = new Date(parseCustomDate(a.currentTime));
          const timeB = new Date(parseCustomDate(b.currentTime));
  
          // Sắp xếp theo thứ tự giảm dần, từ gần đây nhất đến xa nhất
          return timeB - timeA;
        });
  
        // Lấy ra 5 bài hát nghe gần nhất
        const recentSongs = sortedSongs.slice(0, 10);
  
        // Cập nhật trạng thái với danh sách 5 bài hát nghe gần nhất
        setData(recentSongs);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API', error);
      });
  }, [data]);
  
  // Phân tích chuỗi thời gian để chuyển đổi thành đối tượng Date
  const parseCustomDate = (customTime) => {
    const [time, date] = customTime.split(' ');
    const [hour, minute, second] = time.split(':');
    const [day, month, year] = date.split('/');
  
    return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
  };

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
  const handUpdateCurrentTime = async (songId) => {
    try {
   
      // Gửi yêu cầu cập nhật currentTime cho bài hát có id là songId
      const updateSongResponse = await fetch(`http://localhost:3001/song/${songId}`, {
        method: 'PATCH', // Hoặc PATCH tùy thuộc vào thiết kế API của bạn
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentTime: new Date().toLocaleString(), // Cập nhật currentTime
        }),
      });
  
      if (updateSongResponse.status === 200) {
        // Cập nhật thành công trên server, tiến hành cập nhật trạng thái local
        const updatedSongList = data.map(song => {
          if (song.id === songId) {
            return { ...song, currentTime: new Date().toLocaleString() };
          }
          return song;
        });
  
        // Cập nhật trạng thái dữ liệu local với thông tin mới
        setData(updatedSongList);
      } else {
        // Xử lý khi cập nhật thất bại trên server
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật currentTime cho bài hát:', error);
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.header}>
          {/* Thanh header */}
          <TouchableOpacity onPress={() => {  navigation.navigate('User', { user: user});}}>
            <Image source={userImage} style={styles.userImage} />
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

        {/* Tiêu đề */}
        <Text style={styles.title}>Thư viện</Text>

        {/* Phần nút "Bài hát yêu thích" và "Đã tải" */}
        <View style={styles.upgradeContainer}>
          <TouchableOpacity onPress={()=>{navigation.navigate("BHYeuThich",{user:user})}}>
            <View style={styles.upgradeItem}>
              <Image source={require('../icon/library/favorite.png')} style={styles.favoriteIcon} />
              <Text style={styles.upgradeText}>Bài hát yêu thích</Text>
              <Text style={styles.upgradeCount}>{user.favoriteSongs.length}</Text>
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
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.recentMusicItem}
               onPress={()=>{navigation.navigate("ChiTietBH",{data:data,songId:item.id}),handUpdateCurrentTime(item.id) }}>
                <Image source={item.img} style={styles.recentMusicImage} />
                <Text>{item.title}</Text>
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
    marginBottom:20
  },
  recentMusicItem: {
    alignItems: 'center',
    // justifyContent: 'center',
    height: 220,
    width:180,
    marginRight:20
  
  },
  recentMusicImage: {
    marginBottom:10,
    marginRight:20,
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
