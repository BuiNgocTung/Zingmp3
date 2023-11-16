import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
export default function App({ navigation, route }) {
    const { user } = route.params || {};
    const userImage = user && user.img ? { uri: user.img } : require('../img/user/user.png');

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={{ fontSize: 20, fontWeight: '700' }}>Tài khoản cá nhân </Text>


                <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
                    <Icon name='gear' size={20} />

                </TouchableOpacity>




            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 55 }}>
                <Image source={userImage} style={{ width: 80, height: 80, borderRadius: 150, paddingLeft: 10 }} />
                <Text style={{ fontSize: 27, margin: 10 }}> {user.username}</Text>
            </View>
            {/* upgrade */}
            <View style={{ alignItems: 'center' }}>
                <View style={styles.upgrade}>
                    <Text>Bạn đang sử dụng gói nghe nhạc miễn phí, nâng cấp</Text>
                    <Text>tài khoản để trải nghiệm tốt hơn</Text>

                    <TouchableOpacity style={{
                        backgroundColor: '#FFD704', borderRadius: 30, width: 200, height: 40, alignItems: 'center',
                        justifyContent: 'center', marginTop: 20
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>Nâng cấp tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*  */}
            <View style={{ margin: 20 }}>

                <Text style={{ fontSize: 16, fontWeight: '700' }}> Cá nhân</Text>


                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                    <Icon name='user-plus' size={20} color={'gray'} />
                    <Text style={{ fontSize: 16, paddingLeft: 25 }}>Danh sách quan tâm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                    <Icon name='ban' size={20} color={'gray'} />
                    <Text style={{ fontSize: 16, paddingLeft: 30 }}>Danh sách chặn</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                    <Icon name='clock-o' size={20} color={'gray'} />
                    <Text style={{ fontSize: 16, paddingLeft: 30 }}>Danh sách tạm ẩn</Text>
                </TouchableOpacity>

                <View style={{ borderBlockColor: 'gray', borderBottomWidth: 2, width: 350, marginTop: 20 }}></View>

                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}
                    onPress={() => { navigation.navigate("Login") }}>
                    <Icon name='sign-out' size={20} color={'gray'} />
                    <Text style={{ fontSize: 16, paddingLeft: 30 }}>Đăng xuất tài khoản</Text>
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
    upgrade: {
        width: 350,
        height: 125,
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
        justifyContent: 'center',

    },

    input: {
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#F9D0DA',
        borderRadius: 140,
        width: 245,
        height: 37,
    },

});
