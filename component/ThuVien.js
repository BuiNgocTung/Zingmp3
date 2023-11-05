import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image, TextInput,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import  Icon from 'react-native-vector-icons/FontAwesome'

export default function App({navigation}) {

  return (
    <View style={styles.container}>

    <View style ={styles.header}>

    <TouchableOpacity>
        <Image source={require('../img/user/tung.jpg')} style={{width:50,height:50,borderRadius:150,paddingLeft:10}}/>
        </TouchableOpacity>
      
        <View style={{flexDirection:'row'}}>
        <Icon name='search' style={styles.iconSearch} size={20}/>
      
        <TextInput placeholder='Tìm kiếm bài hát, nghệ sĩ...' style={styles.input}/>
        <Icon name= 'microphone' style={styles.iconSpeak} size={20}/>

        </View>
          <TouchableOpacity>
          <Icon name='gear'size={20}/>
          </TouchableOpacity>
       


    </View>

       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop:10
   
  },
  header:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
  
  },
  input:{
    paddingLeft:40,
    paddingRight:40,
    backgroundColor:'#F9D0DA',
    borderRadius:140,
    width:245,
    height:37,
  },
  iconSearch :{
  
    position:'absolute',
    marginLeft:10,
    marginTop:10,
    color:'#8E86A8',
    
    

  },
  iconSpeak :{
    color:'#8E86A8',
    position:'absolute',
    marginLeft:210,
    marginTop:10,
    

  }
});
