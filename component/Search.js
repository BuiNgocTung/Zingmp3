import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState,useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import unorm from 'unorm';
export default function App({ navigation }) {
    const [recentMusicData, setData] = useState([]);
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
    const [filteredMusic, setFilteredMusic] = useState([]);
        
    const handleSearchName = (text) => {
      
        if (text.trim() === "") {
            // Nếu chuỗi là rỗng, ẩn danh sách
            setFilteredMusic([]);
        } else {
            const fillMusic = recentMusicData.filter(item =>
                item.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredMusic(fillMusic.slice(0, 4));
        }
    }
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

                    <View style={styles.searchBar}>
                   
                        <Icon name='search' style={styles.searchIcon} size={20} />
                        <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input}
                            onChangeText={(text) => { handleSearchName(text) }}   />
                        <Icon name='mic' style={styles.microphoneIcon} size={20} />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Text>Hủy</Text>
                    </TouchableOpacity>
                </View>


                {/*List danh sach tim ra*/}
                {filteredMusic.length > 0 && (
                    <View style={{marginTop:50}}>
                        <FlatList
                            data={filteredMusic}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.recentMusicItem}
                                onPress={()=>{handUpdateCurrentTime(item.id),navigation.navigate("ChiTietBH",{songId:item.id,data:recentMusicData})}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={item.img} style={styles.recentMusicImage} />

                                            <View>
                                                <Text style={{ fontSize: 13, fontWeight: '700' }}>{item.title}</Text>
                                                <Text>{item.artist}</Text>
                                            </View>
                                        </View>

                                        <Icon name='play-arrow' size={25} color={'gray'} />
                                    </View>

                                </TouchableOpacity>
                            )} />
                    </View>)}

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
        marginLeft: 265,
        marginTop: 10,
    },
    input: {
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#F9D0DA',
        borderRadius: 140,
        width: 300,
        height: 37,
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
