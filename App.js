import 'react-native-gesture-handler';
import { Logs } from 'expo';
import { LogBox } from 'react-native';
import React from "react";
import { createTheme, Text, ThemeProvider } from "@rneui/themed";
import { NavigationContainer , DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Pets from './components/Pets/Pets';
import Appointment from './components/Appointment/Appointment';
import Appointments from './components/Appointments/Appointments';
import Adopt from './components/Adopt/Adopt';
import PetScreen from './components/Adopt/PetScreen/PetScreen';
import TakeAppointment from './components/TakeAppointment/TakeAppointment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserProvider } from './firebase/Context';
// Logs.disableExpoCliLogging();
// LogBox.ignoreAllLogs();
const theme = createTheme({
  colors: {
    background: "white"
  },
  lightColors: {},
  darkColors: {},
});
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const Drawer = createDrawerNavigator();
function setDrawerOptions(routeName){
  return {
    title:routeName,
    drawerActiveTintColor:"white",
    drawerActiveBackgroundColor:"#a7ecc7",
    headerTintColor:"black",
  }
}
export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <UserProvider>
      <ThemeProvider theme={theme}>
      <Drawer.Navigator
      useLegacyImplementation
      initialRouteName='Login'>
        <Drawer.Screen options={setDrawerOptions("Giriş")} name="Login" component={Login} />
        <Drawer.Screen  options={setDrawerOptions("Kayıt ol")} name="Register" component={Register} />
        <Drawer.Screen  options={setDrawerOptions("Ana Ekran")} name="Home" component={Home} />
        <Drawer.Screen  options={{...setDrawerOptions("Hayvanlarım"),
       headerRight: () => (
        <TouchableOpacity style={{marginRight:30}}>
          <Text>Ekle</Text>
        </TouchableOpacity>
      )}} name="Pets" component={Pets} />
        <Drawer.Screen  options={setDrawerOptions("Randevular")} name="Appointment" component={Appointment} />
        <Drawer.Screen  options={setDrawerOptions("Tüm randevular")} name="Appointments" component={Appointments} />
        <Drawer.Screen  options={setDrawerOptions("Sahiplenme")} name="Adopt" component={Adopt} />
        <Drawer.Screen  options={setDrawerOptions("Detay")} name="PetScreen" component={PetScreen} />
        <Drawer.Screen  options={setDrawerOptions("Randevu al")} name="TakeAppointment" component={TakeAppointment} />
      </Drawer.Navigator>
      </ThemeProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
