import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
export default function MusicByCategory({ navigation, route }) {
    const categoryImage = route.params.categoryImage;
    const data = [
        {
            id: '0',
            image: require('../img/BHYeuThich/Rectangle 18.png'),
            name: 'Gương Mặt Lạ Lẫm',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        },
        {
            id: '1',
            image: require('../img/BHYeuThich/Rectangle 19.png'),
            name: 'Hết Thương Cạn Nhớ',
            category: 'Trữ tình',
            tg: 'Đức Phúc'

        },
        {
            id: '2',
            image: require('../img/BHYeuThich/Rectangle 20.png'),
            name: 'Còn Gì Đau Hơn Chữ Đã Từng',
            category: 'Ballad',
            tg: 'Quân A.P'

        },
        {
            id: '3',
            image: require('../img/BHYeuThich/Rectangle 21.png'),
            name: 'Là Bạn Không Thể Yêu',
            category: 'Ballad',
            tg: 'Lou Hoàng'

        },
        {
            id: '4',
            image: require('../img/BHYeuThich/Rectangle 22.png'),
            name: 'Bước Qua Đời Nhau',
            category: 'Remix',
            tg: 'Lê Bảo Bình'

        },
        {
            id: '5',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        },
        {
            id: '6',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            category: 'Trữ tình',
            tg: 'Trịnh Đình Quang'

        },
        {
            id: '7',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        }

        ,
        {
            id: '8',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        },
        {
            id: '9',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            category: 'Trữ tình',
            tg: 'Trịnh Đình Quang'

        },
        {
            id: '10',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        }
        ,
        {
            id: '11',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        },
        {
            id: '12',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            category: 'Trữ tình',
            tg: 'Trịnh Đình Quang'

        },
        {
            id: '13',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            category: 'Trữ tình',
            tg: 'Mr. Siro'

        }
    ];
    const category = route.params.category;
    const filteredData = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
    return (
        <View style={styles.container}>
            <View style={styles.body1}>
                <Image source={categoryImage} style={{ width: 400, height: 200 }} />
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', margin: 10 }}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>



            </View>

            <View style={styles.body2}>

                <TouchableOpacity style={styles.tou1}>
                    <Text style={styles.text3}> PHÁT NGẪU NHIÊN</Text>
                </TouchableOpacity>
            </View>




         



            <ScrollView>
            <View style={{ marginTop: 50 }}>
          
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.recentMusicItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.image} style={styles.recentMusicImage} />

                                    <View>
                                        <Text style={{ fontSize: 13, fontWeight: '700' }}>{item.name}</Text>
                                        <Text>{item.tg}</Text>
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