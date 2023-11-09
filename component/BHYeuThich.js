import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons'; 
export default function App({ navigation }) {
    const data = [
        {
            id: '0',
            image: require('../img/BHYeuThich/Rectangle 18.png'),
            name: 'Gương Mặt Lạ Lẫm',
            tg: 'Mr. Siro'
        
        },
        {
            id: '1',
            image: require('../img/BHYeuThich/Rectangle 19.png'),
            name: 'Hết Thương Cạn Nhớ',
            tg: 'Đức Phúc'
        
        },
        {
            id: '2',
            image: require('../img/BHYeuThich/Rectangle 20.png'),
            name: 'Còn Gì Đau Hơn Chữ Đã Từng',
            tg: 'Quân A.P'
        
        },
        {
            id: '3',
            image: require('../img/BHYeuThich/Rectangle 21.png'),
            name: 'Là Bạn Không Thể Yêu',
            tg: 'Lou Hoàng'
        
        },
        {
            id: '4',
            image: require('../img/BHYeuThich/Rectangle 22.png'),
            name: 'Bước Qua Đời Nhau',
            tg: 'Lê Bảo Bình'
        
        },
        {
            id: '5',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            tg: 'Mr. Siro'
        
        },
        {
            id: '6',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            tg: 'Trịnh Đình Quang'
        
        },
        {
            id: '7',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            tg: 'Mr. Siro'
        
        }

        ,
        {
            id: '8',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            tg: 'Mr. Siro'
        
        },
        {
            id: '9',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            tg: 'Trịnh Đình Quang'
        
        },
        {
            id: '10',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            tg: 'Mr. Siro'
        
        }
        ,
        {
            id: '11',
            image: require('../img/BHYeuThich/Rectangle 23.png'),
            name: 'Lời Yêu Ngây Dại',
            tg: 'Mr. Siro'
        
        },
        {
            id: '12',
            image: require('../img/BHYeuThich/Rectangle 24.png'),
            name: 'Buồn Làm Chi Em Ơi',
            tg: 'Trịnh Đình Quang'
        
        },
        {
            id: '13',
            image: require('../img/BHYeuThich/Rectangle 25.png'),
            name: 'Gương Mặt Lạ Lẫm',
            tg: 'Mr. Siro'
        
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.body1}>
                <TouchableOpacity onPress={()=>{navigation.navigate("ThuVien")}}>
                    <Ionicons style={{left:7}} name="chevron-back" size={26} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons style={{left:280, top:4}} name="ios-search-sharp" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons style={{left:300, top:2}} name="dots-horizontal" size={24} color="black" />
                </TouchableOpacity>
                
            </View>

            <View style={styles.body2}>
                <Text style={styles.text1}>Bài hát yêu thích</Text>
                <Text style={styles.text2}>77 bài hát . Đã lưu vào thư viện</Text>
                <TouchableOpacity style={styles.tou1}>
                   <Text style={styles.text3}> PHÁT NGẪU NHIÊN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.body3}>
                <Entypo name="arrow-with-circle-down" size={22} color="black" />
                <Text style={styles.text4}>Tải xuống</Text>
            </View>

            <View style={styles.body4}>
                <ScrollView>
                <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.body5}>
                    <Image style={styles.img2} source={item.image}/>
                    <View style={styles.body6}>
                        <Text style={styles.text5}>{item.name}</Text>
                        <Text style={styles.text5}>{item.tg}</Text>
                    </View>
                    <Ionicons  style={{left: 5, top: 5}} name="heart" size={24} color="#8B3DF0" />
                    <MaterialCommunityIcons style={{top: 5,left: 10}} name="dots-horizontal" size={24} color="black" />
                </TouchableOpacity>
                )}/>
                </ScrollView>
            </View>
     
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    body1:{
        flexDirection:"row",
        alignContent: "center",
        height: 30,
        paddingHorizontal: 10,
    },
    img1:{
        height: 5,
        width: 5
    },
    text1:{
        fontSize: 20,
        fontWeight: 700,
        alignItems: "center",
        left: 115
    },
    body2:{
        marginHorizontal: 10,
        height: 100,
    },
    text2:{
        fontSize: 11,
        fontWeight: 700,
        color:"#000000",
        top: 10,
        left: 110

    },
    tou1:{
        width:171,
        height: 41,
        borderRadius: 15,
        backgroundColor: "#AB43AD",
        alignItems: 'center',
        justifyContent: "center",
        left: 110,
        top: 25
    },
    text3:{
        fontSize: 11,
        fontWeight: 700,
        color: "#FFFFFF"
    },
    body3:{
        flexDirection:'row',
        marginHorizontal: 20,
        marginBottom: 5,
        marginTop: 20
        
    },
    text4:{
        fontSize: 14,
        fontWeight: 400,
        color: "#000000",
        left: 5,
    },
    body4:{
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10


    },
    body5:{
        flexDirection: 'row',
        marginBottom: 12
    },
    body6:{
        left: 10,
        top: -5,
        width: 260
    },
    img2:{
        height: 46,
        width: 65
    },
    text5:{
        fontSize: 14,
        padding: 3
    }

});
