import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, FlatList, ScrollView, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Category({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const data = [
    {
      id: '0',
      image: require('../img/category/TruTinh.jpg'),
      category: 'Trữ tình',
    },
    {
      id: '1',
      image: require('../img/category/Ballad.jpg'),
      category: 'Ballad',
    },
    {
      id: '2',
      image: require('../img/category/Remix.jpg'),
      category: 'Remix',
    },
    {
      id: '3',
      image: require('../img/category/CoDien.jpg'),
      category: 'Nhạc cổ điển',
    },
    {
      id: '4',
      image: require('../img/category/NhacKhongLoi.jpg'),
      category: 'Nhạc không lời',
    },
    {
      id: '5',
      image: require('../img/category/NhacPhim.jpg'),
      category: 'Nhạc phim',
    },
  ];

  const filteredData = data.filter(item => item.category.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon name={'arrow-left'} size={20} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Thể loại </Text>
        <TouchableOpacity>
          <Icon name='gear' size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Icon name='search' style={styles.searchIcon} size={20} />
        <TextInput
          placeholder='Trữ tình, nhạc thiếu nhi ...'
          style={styles.input}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <ScrollView>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ margin: 10, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  navigation.navigate('MusicByCategory', { categoryImage: item.image, category: item.category });
                }}
              >
                <Image source={item.image} style={{ width: 155, height: 100, borderRadius: 10 }} />
                <Text style={{ position: 'absolute', fontWeight: '700', fontSize: 13, color: 'white' }}>
                  {item.category.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchBar: {
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#D3D3D3',
    borderRadius: 140,
    width: 350,
    height: 30,
  },
  searchIcon: {
    position: 'absolute',
    color: '#8E86A8',
    marginRight: 300,
    marginTop: 5,
  },
});
