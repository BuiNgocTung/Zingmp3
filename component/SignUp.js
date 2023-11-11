import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,Image,TextInput,TouchableOpacity} from 'react-native';

export default function Login({navigation}) {
  return (
    <View style={styles.container}>

        
        <View style={{flexDirection:'row',marginTop:50}}>
        <Image source={require('../icon/load/name.png')} style={{width:227,height:67}}/>
        <Text style = {{fontSize:45 ,color:'#FFF',marginLeft:-90}}>mp3</Text>
        </View>

            <View style={{paddingTop:50}}>
            <TextInput placeholder='Tên đăng nhập' style={styles.input}  placeholderTextColor={'#978B8B'} ></TextInput>
             <TextInput placeholder='Mật khẩu ' style={styles.input}  placeholderTextColor={'#978B8B'} ></TextInput>
             <TextInput placeholder='Nhập lại mật khẩu' style={styles.input}  placeholderTextColor={'#978B8B'} ></TextInput>
            </View>

            <TouchableOpacity style={styles.customButton} onPress={()=>{navigation.navigate('Login')}}>
                 <Text style={{color:'white',fontSize:20}}>Đăng ký</Text>
             </TouchableOpacity>

            

       

             <Text style={{fontSize:15,color:'white',paddingTop:20}}>Bạn là thành viên?
             <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}> <Text style={{ color: '#4790FD' ,fontSize:15}}> Hãy đăng nhập</Text>
             </TouchableOpacity>

             </Text>

            {/* <Button title='Dang nhap' onPress={()=>{navigation.navigate("KhamPha")}}></Button> */}
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
  input: {

    width: 325,
    height: 65,
    marginBottom: 30,
    backgroundColor: '#DBC3DB',
    flexShrink: 0,
    paddingLeft: 10,
    borderRadius:10,
    fontSize:25


},
customButton: {
    backgroundImage: 'linear-gradient(90deg, #D479E3 0%, #785584 100%)',
    width: 325,
    height: 50,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 20,
},
icon:{

    width:46,height:46,
     margin:10
}

});
