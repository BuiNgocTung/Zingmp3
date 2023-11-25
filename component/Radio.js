import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App({ navigation,route }) {
    const { user } = route.params || {};
    const userImage = user && user.img ? { uri: user.img } : require('../img/user/user.png');
    const [selectedRadio, setSelectedRadio] = useState(null);
    const dataRadio = [
        {
            id: 0,
            name: "Rap Việt",
            image: require("../img/radio/RapViet.jpg"),
            time: '20:00 - 23:00'

        },
        {
            id: 1,
            name: "Xone",
            image: require("../img/radio/Xone-logo.jpg"),
            time: '15:00 - 18:00'

        },
        {
            id: 2,
            name: "Vpop",
            image: require("../img/radio/Vpop.png"),
            time: '18:00 - 20:00'

        },
    ]

   
    

    useEffect(() => {
        // Set default selected radio to "Xone"
        setSelectedRadio(dataRadio.find(radio => radio.name === "Xone"));
    }, []); // Empty dependency array to run the effect only once

    const handleRadioPress = (item) => {
        setSelectedRadio(item);
    };

    //list bai hat đề cử
    const [randomData, setRandomData] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu GET đến API
        fetch('http://localhost:3001/song')
            .then(response => response.json())
            .then(result => {
                // Khởi tạo một Set để lưu trữ các chỉ mục đã chọn
                const randomIndexes = new Set();
                const randomSongs = [];
                const maxRandomItems = 5; // Số lượng phần tử ngẫu nhiên cần lấy
      
                // Lặp để chọn các chỉ mục ngẫu nhiên không trùng lặp
                while (randomIndexes.size < maxRandomItems) {
                    const randomIndex = Math.floor(Math.random() * result.length);
                    randomIndexes.add(randomIndex);
                }
      
                // Lấy các phần tử từ chỉ mục đã chọn
                randomIndexes.forEach(index => {
                    randomSongs.push(result[index]);
                });
      
                setRandomData(randomSongs);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu từ API', error);
            });
      }, []);
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
                {/* Thanh header */}
                <View style={styles.header}>

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
                {/*  */}


                {selectedRadio && (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image source={selectedRadio.image} style={{ width:390, height: 360 }} />
                    </View>
                )}


                {/* Danh sách Live*/}
                <View style={{ marginTop: -100, marginLeft: 10 }}>
                    <FlatList
                        horizontal={true}
                        data={dataRadio}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (

                            <TouchableOpacity
                                style={[
                                    styles.recentMusicItem,
                                    {
                                        marginLeft: 10,
                                        borderColor: selectedRadio && selectedRadio.id === item.id ? 'red' : 'transparent',
                                    },
                                ]}
                                onPress={() => handleRadioPress(item)}
                            >
                                <Image source={item.image} style={[styles.recentRadio, { width: 110, height: 115, }]} />

                                <Image source={item.image} style={[{
                                    width: 42, height: 42,
                                    position: 'absolute', borderRadius: '100%', marginLeft: 80, marginTop: 40
                                }]} />

                                <View style={{
                                    backgroundColor: 'red', width: 50, height: 20, alignItems: 'center', justifyContent: 'center',
                                    borderRadius: 20, position: 'absolute', marginTop: 120, marginLeft: -20
                                }}>
                                    <Text style={{ color: 'white', fontWeight: '500' }}>LIVE</Text>
                                </View>

                            </TouchableOpacity>

                        )} />
                </View>
                {/* Text  */}
                {selectedRadio && (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontWeight: '700', fontSize: 17 }}>{selectedRadio.name} - Digital Radio</Text>
                        <Text style={{ fontWeight: '700', fontSize: 17 }}>MOOD BOOSTER | {selectedRadio.time}</Text>


                    </View>
                )}
                {/* Danh sách có thể bạn muốn nghe */}
                <View style={{ margin: 20}}>
               
                    <Text style={styles.recentMusicTitle}>Có thể bạn muốn nghe</Text>
                    <FlatList style={{marginTop:20}}
                        horizontal={true}
                        data={randomData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (

                            <TouchableOpacity style={styles.recentMusicItem}
                            onPress={()=> {handUpdateCurrentTime(item.id),navigation.navigate("ChiTietBH",{ songId: item.id,data:randomData})}}>
                                <Image source={item.img} style={[styles.recentMusicImage, { width: 120, height: 125, }]} />
                                <Text>{item.title}</Text>
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



    recentMusicTitle: {
        fontSize: 21,
        fontWeight: '700',

    },
    recentMusicItem: {
        alignItems: 'center',
        // justifyContent: 'center',
        height: 180,
        width:130,
        marginRight:20

    },
    recentRadio: {
        marginRight: 5,

        borderRadius: "100%",
        borderColor: '#DAC6C6',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderWidth: 5,
        borderColor: 'red'

    },
    recentMusicImage: {

        marginRight:10,
        borderRadius: 30,
        borderColor: '#DAC6C6',
        borderWidth: 1,
        backgroundColor: '#FFF',

    },

    upgradeItem: {
        width: 37,
        height: 37,
        borderRadius: 20,
        marginBottom: 5,
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

});
