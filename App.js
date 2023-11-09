  import * as React from 'react';
  import { StyleSheet, Image,View } from 'react-native';

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

  import Icon from 'react-native-vector-icons/MaterialIcons';


  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();


  export default function App() {
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="BHYeuThich" screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Load" component={Load} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ThuVien" component={ThuVien} />
          <Stack.Screen name="Setting" component={Setting} />

          <Stack.Screen name="Tab" component={TabNavigator} options={{ title: 'Home' }} />

          <Stack.Screen name="BHYeuThich"  component={BHYeuThich} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  function TabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName='Khám Phá'headerMode='none'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Thư viện') {
              iconName = 'library-music';
            } else if (route.name === 'Khám Phá') {
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

        })}
      >
        <Tab.Screen name="Thư viện" component={ThuVien} />
        <Tab.Screen name="Khám Phá" component={KhamPha} />
        <Tab.Screen name="#zingchart" component={ZingChart} />
        <Tab.Screen name="Radio" component={Radio} />
        <Stack.Screen name="User" component={User} />
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