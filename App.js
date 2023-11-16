import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Load from "./component/Load";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

import KhamPha from "./component/KhamPha";
import ThuVien from "./component/ThuVien";
import User from "./component/User";
import Setting from "./component/Setting";
import Search from "./component/Search";
import ZingChart from "./component/ZingChart";
import Radio from "./component/Radio";
import BHYeuThich from "./component/BHYeuThich";
import Category from "./component/Category";
import MusicByCategory from "./component/MusicByCategory";
import ChiTietBH from "./component/ChiTietBH";
import MiniPlay from "./component/MiniPlay.js";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native-web';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
    
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="ChiTietBH" component={ChiTietBH} />
        {/* <Stack.Screen name="MiniPlay" component={MiniPlay} /> */}
        <Stack.Screen name="Tab" component={TabNavigator} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabThuVien() {
  return (
    <Stack.Navigator initialRouteName="ThuVien" screenOptions={{ headerShown: false, }} >

      <Stack.Screen name="ThuVien" component={ThuVien}  />
      <Stack.Screen name="BHYeuThich" component={BHYeuThich} />
     
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>

  );
};
function TabKhamPha() {
  return (
    <Stack.Navigator initialRouteName="KhamPha" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="KhamPha" component={KhamPha} />
      <Stack.Screen name="Category" component={Category} />

      <Stack.Screen name="MusicByCategory" component={MusicByCategory} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>

  );
};

function TabZingChart() {
  return (
    <Stack.Navigator initialRouteName="zingchart" screenOptions={{ headerShown: false, }}>


      <Stack.Screen name="zingchart" component={ZingChart} />
     
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>

  );
};
function TabRadio() {
  return (
    <Stack.Navigator initialRouteName="Radio" screenOptions={{ headerShown: false, }}>


      <Stack.Screen name="Radio" component={Radio} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>

  );
};
// const MiniPlayer = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="ChiTietBH" component={ChiTietBH} />
//         <Tab.Screen
//           name="MiniPlay"
//           component={MiniPlay} // Đổi tên thành MiniPlayer hoặc tên khác
//           options={{ tabBarLabel: () => null, tabBarIcon: () => null }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

function TabUser() {
  return (
    <Stack.Navigator initialRouteName="User" screenOptions={{ headerShown: false, }}>


      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>

  );
};

function TabNavigator({route}) {

  const [currentTab, setCurrentTab] = useState();
  return (
    <Tab.Navigator
      initialRouteName='Thư viện'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Thư viện') {
            iconName = 'library-music';
          } else if (route.name === 'Khám phá') {
            iconName = 'pageview';
          }
          else if (route.name === '#zingchart') {
            iconName = 'stacked-line-chart';
          }
          else if (route.name === 'Radio') {
            iconName = "radio";
          }
          else if (route.name === 'User') {
            iconName = "person";
          }
          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={size} color={color} style={styles.icon} />
            </View>
          );
        }, headerShown: false,
        tabBarButton: (props) => (<TouchableOpacity
          {...props}
          onPress={() => {
            setCurrentTab(route.name);
            props.onPress();
          }} 
        />) ,
      })}  >
      <Tab.Screen name="Thư viện" component={TabThuVien}  />
      <Tab.Screen name="Khám phá" component={TabKhamPha} />
      <Tab.Screen name="#zingchart" component={TabZingChart} />
      <Tab.Screen name="Radio" component={TabRadio} />
      <Tab.Screen name="User" component={TabUser} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});