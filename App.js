import * as React from 'react';
import {  Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Load from "./component/Load";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

import KhamPha from "./component/KhamPha";
import ThuVien from "./component/ThuVien";
import User from "./component/User";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Load" screenOptions={{headerShown:false,}}>
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="User" component={User} />

        <Stack.Screen name="KhamPha" component={TabNavigator} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {

  return (
    <Tab.Navigator initialRouteName='Thư viện' 
    screenOptions={{headerShown:false}}>
      
         <Tab.Screen name="Thư viện" component={ThuVien} 
         options={{  tabBarIcon:()=><Image source={require('./icon/tab/music_video.png')}
          style={{width:24,height:24}} resizeMode='stretch'/> }  } />
         <Tab.Screen name="Khám phá" component={KhamPha} />

    
    
     
    </Tab.Navigator>
  );
}
