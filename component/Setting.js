import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
export default function App({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon name={'arrow-left'} size={20} />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: '700' }}>Thiết lập </Text>


                <TouchableOpacity>
                    <Icon name='gear' size={20} />
                </TouchableOpacity>

            </View>


            <View style={{ margin: 20 }}>



                <TouchableOpacity style={styles.icon}>
                    <Icon name='play' size={20} color={'gray'} />
                    <Text style={{ fontSize: 16, paddingLeft: 25 }}>Trình phát nhạc</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='download' size={20} color={'gray'} />
                    <Text style={styles.text}>Tải nhạc</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='list-ul' size={20} color={'gray'} />
                    <Text style={styles.text}>Thư viện</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='video-camera' size={20} color={'gray'} />
                    <Text style={styles.text}>Video</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='headphones' size={20} color={'gray'} />
                    <Text style={styles.text}>Tai nghe và bluetooth</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='bell' size={20} color={'gray'} />
                    <Text style={styles.text}>Thông báo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='cogs' size={20} color={'gray'} />
                    <Text style={styles.text}>Giao diện</Text>
                </TouchableOpacity>

                <View style={{ borderBlockColor: 'gray', borderBottomWidth: 2, width: 350, marginTop: 20 }}></View>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='info' size={20} color={'gray'} />
                    <Text style={styles.text}>Kiểm tra phiên bản mới</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='question' size={20} color={'gray'} />
                    <Text style={styles.text}>Trợ giúp</Text>
                </TouchableOpacity>


                {/* <TouchableOpacity style={styles.icon}>
                    <Icon name='exclamation' size={20} color={'gray'} />
                    <Text style={styles.text}>Góp ý kiến báo lỗi</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.icon}>
                    <Icon name='star' size={20} color={'gray'} />
                    <Text style={styles.text}>Bình chọn cho Zing mp3</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Icon name='book' size={20} color={'gray'} />
                    <Text style={styles.text}>Điều khoản sử dụng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Icon name='shield' size={20} color={'gray'} />
                    <Text style={styles.text}>Chính sách bảo mật</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingTop: 10

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },


    input: {
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#F9D0DA',
        borderRadius: 140,
        width: 245,
        height: 37,
    },
    icon:{
        flexDirection: 'row', marginTop: 20, marginLeft: 10
    },
    text:{
        fontSize: 18, paddingLeft: 20 
    }
});
