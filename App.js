import 'react-native-gesture-handler';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Pets from './components/Pets/Pets';
import Appointment from './components/Appointment/Appointment';
import Appointments from './components/Appointments/Appointments';


const theme = createTheme({
  colors: {
    background: "white"
  },
  lightColors: {},
  darkColors: {},
});
const Drawer = createDrawerNavigator();
function setDrawerOptions(routeName){
  return {
    title:routeName,
    drawerActiveTintColor:"white",
    drawerActiveBackgroundColor:"#a7ecc7",
    headerTintColor:"black"
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
      <Drawer.Navigator
      useLegacyImplementation
      initialRouteName='Login'>
        <Drawer.Screen options={setDrawerOptions("Giriş")} name="Login" component={Login} />
        <Drawer.Screen  options={setDrawerOptions("Kayıt ol")} name="Register" component={Register} />
        <Drawer.Screen  options={setDrawerOptions("Ana Ekran")} name="Home" component={Home} />
        <Drawer.Screen  options={setDrawerOptions("Hayvanlarım")} name="Pets" component={Pets} />
        <Drawer.Screen  options={setDrawerOptions("Randevular")} name="Appointment" component={Appointment} />
        <Drawer.Screen  options={setDrawerOptions("Tüm randevular")} name="Appointments" component={Appointments} />
      </Drawer.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
