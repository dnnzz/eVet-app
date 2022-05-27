import 'react-native-gesture-handler';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { createDrawerNavigator } from '@react-navigation/drawer';

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
      </Drawer.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
