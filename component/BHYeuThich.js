import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BHYeuThich({ navigation, route }) {
    const { user } = route.params || {};

    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu GET đến API để lấy dữ liệu các bài hát
        fetch('http://localhost:3001/song')
            .then(response => response.json())
            .then(result => {
                // Lưu dữ liệu từ API vào state 'data'
                setData(result);

                // Kiểm tra xem user có dữ liệu không và có 'favoriteSongs' không
                if (user && user.favoriteSongs) {
                    // Lọc ra các bài hát yêu thích của người dùng từ dữ liệu API
                    const userFavoriteSongs = result.filter(song => user.favoriteSongs.includes(song.id));
                    setFavoriteSongs(userFavoriteSongs);
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu từ API', error);
            });
    }, [user]); // Chạy lại useEffect khi 'user' thay đổi



    const handleSongPress = async (songId) => {
        await AsyncStorage.setItem('audioState', JSON.stringify({ currentPosition: 0, isPlaying: true }));
        navigation.navigate('ChiTietBH', { songId: songId, data: favoriteSongs });
    };

    const handleRandomSongPress = async () => {
        // Get a random song ID from the data array
        const randomIndex = Math.floor(Math.random() * favoriteSongs.length);
        const randomSongId = favoriteSongs[randomIndex].id;

        // Save audio state to AsyncStorage
        await AsyncStorage.setItem('audioState', JSON.stringify({ currentPosition: 0, isPlaying: true }));

        // Navigate to ChiTietBH with the random song ID
        handUpdateCurrentTime(randomSongId)
        navigation.navigate('ChiTietBH', { songId: randomSongId, data: favoriteSongs });
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

        <View style={styles.container}>
            <View style={styles.body1}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons style={{ left: 7 }} name="chevron-back" size={26} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons style={{ left: 280, top: 4 }} name="ios-search-sharp" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons style={{ left: 300, top: 2 }} name="dots-horizontal" size={24} color="black" />
                </TouchableOpacity>

            </View>

            <View style={styles.body2}>
                <Text style={styles.text1}>Bài hát yêu thích</Text>
                <Text style={styles.text2}>{user.favoriteSongs.length} bài hát . Đã lưu vào thư viện</Text>
                <TouchableOpacity style={styles.tou1} onPress={handleRandomSongPress }>
                    <Text style={styles.text3}> PHÁT NGẪU NHIÊN</Text>

                </TouchableOpacity>
            </View>

            <View style={styles.body3}>
                <Entypo name="arrow-with-circle-down" size={22} color="black" />
                <Text style={styles.text4}>Tải xuống</Text>
            </View>

            <View style={styles.body4}>
                {user.favoriteSongs.length > 0 ? (
                    <ScrollView>
                        <FlatList
                            data={favoriteSongs}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.body5} onPress={() => {handUpdateCurrentTime(item.id),handleSongPress(item.id)}}>
                                <Image style={styles.img2} source={{ uri: item.img }} />
                                <View style={styles.body6}>
                                    <Text style={styles.text5}>{item.title}</Text>
                                    <Text style={styles.text5}>{item.artist}</Text>
                                </View>
                                <Ionicons style={{ right: 5, top: 5 }} name="heart" size={24} color="#8B3DF0" />
                                <MaterialCommunityIcons style={{ top: 5, left: 5 }} name="dots-horizontal" size={24} color="black" />
                            </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                ) : (
                    <View style={styles.noSongsContainer}>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderColor: 'gray', width: 40, height: 40, borderRadius: 10
                        }}>
                            <Icon name='music' size={20} /></View>
                        <Text style={styles.noSongsText}>Không có bài hát nào</Text>
                    </View>
                )}
            </View>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    body1: {
        flexDirection: "row",
        alignContent: "center",
        height: 30,
        paddingHorizontal: 10,
    },
    img1: {
        height: 5,
        width: 5
    },
    text1: {
        fontSize: 20,
        fontWeight: 700,
        alignItems: "center",
        left: 115
    },
    body2: {
        marginHorizontal: 10,
        height: 100,
    },
    text2: {
        fontSize: 11,
        fontWeight: 700,
        color: "#000000",
        top: 10,
        left: 110

    },
    tou1: {
        width: 171,
        height: 41,
        borderRadius: 15,
        backgroundColor: "#AB43AD",
        alignItems: 'center',
        justifyContent: "center",
        left: 110,
        top: 25
    },
    text3: {
        fontSize: 11,
        fontWeight: 700,
        color: "#FFFFFF"
    },
    body3: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
        marginTop: 20

    },
    text4: {
        fontSize: 14,
        fontWeight: 400,
        color: "#000000",
        left: 5,
    },
    body4: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10


    },
    body5: {
        flexDirection: 'row',
        marginBottom: 12
    },
    body6: {
        left: 10,
        top: -5,
        width: 220
    },
    img2: {
        height: 46,
        width: 65
    },
    text5: {
        fontSize: 14,
        padding: 3
    },
    noSongsText: {
        fontSize: 15,
        fontWeight: '500',

    },
    noSongsContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
