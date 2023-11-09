import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation }) {
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
        {
            id: 3,
            category: "ballad",
            name: "Gương Mặt Lạ Lẩm",
            image: require("../img/list/GuongMatLaLam.jpg"),
            time: '5:34',
        },
        {
            id: 4,
            category: "ballad",
            name: "Gương Mặt Lạ Lẩm",
            image: require("../img/list/GuongMatLaLam.jpg"),
            time: '5:34',
        },
    ];

    useEffect(() => {
        // Set default selected radio to "Xone"
        setSelectedRadio(dataRadio.find(radio => radio.name === "Xone"));
    }, []); // Empty dependency array to run the effect only once

    const handleRadioPress = (item) => {
        setSelectedRadio(item);
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Thanh header */}
                <View style={styles.header}>

                    <TouchableOpacity onPress={() => { navigation.navigate("User") }}>
                        <Image source={require('../img/user/tung.jpg')} style={styles.userImage} />

                    </TouchableOpacity>

                    <View style={styles.searchBar}>

                        <TouchableOpacity onPress={() => { navigation.navigate("Search") }}>
                            <Icon name='search' style={styles.searchIcon} size={20} />
                            <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input} editable={false} />
                        </TouchableOpacity>
                        <Icon name='microphone' style={styles.microphoneIcon} size={20} />
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate("Setting") }}>
                        <Icon name='gear' size={20} />
                    </TouchableOpacity>
                </View>
                {/*  */}


                {selectedRadio && (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image source={selectedRadio.image} style={{ width: '390px', height: '360px' }} />
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
                <View style={{ margin: 20 }}>
                    <Text style={styles.recentMusicTitle}>Có thể bạn muốn nghe</Text>
                    <FlatList
                        horizontal={true}
                        data={recentMusicData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.recentMusicItem}>
                                <Image source={item.image} style={[styles.recentMusicImage, { width: 120, height: 125, }]} />

                                <Text>Live</Text>
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
        justifyContent: 'center',
        height: 180,


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
        borderRadius: 10,
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
