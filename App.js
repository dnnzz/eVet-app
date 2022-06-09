import 'react-native-gesture-handler';
import { Logs } from 'expo';
import { LogBox } from 'react-native';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { NavigationContainer , DefaultTheme } from "@react-navigation/native";
import { UserProvider } from './firebase/Context';
import AppStack from './AppStack';

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

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <UserProvider>
      <ThemeProvider theme={theme}>
        <AppStack />
      </ThemeProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
