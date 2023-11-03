import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image} from 'react-native';
import React, { useEffect } from 'react';
export default function App({navigation}) {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [navigation]);
  return (
    <View style={styles.container}>
        <Image source={require('../icon/load/logo.png')} style={{width:123,height:121}}/>
        
        <View style={{flexDirection:'row',marginTop:54}}>
        <Image source={require('../icon/load/name.png')} style={{width:227,height:67}}/>
        <Text style = {{fontSize:45 ,color:'#FFF',marginLeft:-90}}>mp3</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB43AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
