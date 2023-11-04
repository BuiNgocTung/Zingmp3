import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Load from "./component/Load";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

import KhamPha from "./component/KhamPha";
import ThuVien from "./component/ThuVien";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Load" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="KhamPha" component={TabNavigator} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Khám phá' screenOptions={{headerShown:false}}>
      
         <Tab.Screen name="Thư viện" component={ThuVien} />
         <Tab.Screen name="Khám phá" component={KhamPha} />

    
    
     
    </Tab.Navigator>
  );
}
