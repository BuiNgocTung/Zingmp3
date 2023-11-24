import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MusicByCategory({ navigation, route }) {
    const categoryImage = route.params.categoryImage;
    const categoryID = route.params.categoryID;
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
    const handleRandomSongPress = async () => {
        // Get a random song ID from the data array
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const randomSongId = filteredData[randomIndex].id;

        // Save audio state to AsyncStorage
        await AsyncStorage.setItem('audioState', JSON.stringify({ currentPosition: 0, isPlaying: true }));

        // Navigate to ChiTietBH with the random song ID
        handUpdateCurrentTime(randomSongId)
        navigation.navigate('ChiTietBH', { songId: randomSongId, data: data });
    };
    const filteredData = data.filter(item => item.categoryID === categoryID);

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
                <Image source={categoryImage} style={{ width: 400, height: 200 }} />
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', margin: 10 }}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>



            </View>

            <View style={styles.body2}>

                <TouchableOpacity style={styles.tou1} onPress={handleRandomSongPress}>
                    <Text style={styles.text3}> PHÁT NGẪU NHIÊN</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
            <View style={{ marginTop: 50 }}>
          
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.recentMusicItem} 
                        onPress={()=> {handUpdateCurrentTime(item.id),navigation.navigate("ChiTietBH",{ songId: item.id,data:filteredData})}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.img} style={styles.recentMusicImage} />

                                    <View>
                                        <Text style={{ fontSize: 13, fontWeight: '700' }}>{item.title}</Text>
                                        <Text>{item.artist}</Text>
                                    </View>
                                </View>
                                  <TouchableOpacity>
                                  <MaterialCommunityIcons  name="dots-horizontal" size={24} color="black" />
                                  </TouchableOpacity>
                              

                            </View>

                        </TouchableOpacity>
                    )} />
                   
            </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    body1: {


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
        height: 40,
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


    img2: {
        height: 46,
        width: 65
    },

    text5: {
        fontSize: 12
    },
    recentMusicItem: {
        width: 350,
        height: 50,


        margin: 5,
        marginLeft: 20
    },
    recentMusicImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5
    }
});