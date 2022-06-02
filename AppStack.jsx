import { Logs } from 'expo';
import { LogBox } from 'react-native';
import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Pets from './components/Pets/Pets';
import Appointment from './components/Appointment/Appointment';
import SelectedPetAppointment from './components/Appointment/SelectedPetAppointments';
import Appointments from './components/Appointments/Appointments';
import Adopt from './components/Adopt/Adopt';
import PetScreen from './components/Adopt/PetScreen/PetScreen';
import TakeAppointment from './components/TakeAppointment/TakeAppointment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from './firebase/Context';
import { addPetToDB, signOut } from './firebase/Firebase';
import { Text, Dialog, Input } from '@rneui/themed';
// Logs.disableExpoCliLogging();
// LogBox.ignoreAllLogs();
const Drawer = createDrawerNavigator();
function setDrawerOptions(routeName) {
  return routeName === "Giriş" && routeName === "Kayıt ol" ? {
    title: routeName,
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: "#a7ecc7",
    headerTintColor: "black",
    unmountOnBlur: true,
  } : routeName === "Randevular" || routeName === "Detay" ? {
    title: routeName,
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: "#a7ecc7",
    headerTintColor: "black",
    unmountOnBlur: true,
    drawerItemStyle:{
      display:"none"
    }
  }:{
    title: routeName,
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: "#a7ecc7",
    headerTintColor: "black",
    unmountOnBlur: true,
  }
}
export default function AppStack(props) {
  const [petData, setPetData] = React.useState({
    name: "",
    info: ""
  })
  const handleChange = (text, type) => {
    setPetData({ ...petData, [type]: text });
  }
  const { user, setIsDataChanged, isDataChanged } = React.useContext(UserContext);
  const render = React.useCallback(
    props => <Register {...props} />,
    []
  );
  const [showDialog, toggleDialog] = React.useState(false)
  const handlePress = () => {
    toggleDialog(!showDialog);
  }
  const handleAddPet = () => {
    toggleDialog(!showDialog);
    addPetToDB(user.email, petData);
    setPetData({ name: "", info: "" });
    setIsDataChanged(!isDataChanged);
  }
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Çıkış yap" onPress={() => {
          signOut();
        }} />
      </DrawerContentScrollView>
    );
  }
  const renderAddScreen = () => (
    <>
      <TouchableOpacity onPress={handlePress} style={{ marginRight: 30 }}>
        <Text>Ekle</Text>
      </TouchableOpacity>
      <Dialog
        overlayStyle={{ backgroundColor: "white" }}
        isVisible={showDialog}
        onBackdropPress={handlePress}>
        <Dialog.Title>Evcil Hayvan Ekle</Dialog.Title>
        <Input onChangeText={(e) => handleChange(e, "name")} placeholderTextColor={"black"} placeholder='İsim' />
        <Input onChangeText={(e) => handleChange(e, "info")} placeholderTextColor={"black"} placeholder='Bilgi' />
        <Dialog.Actions>
          <Dialog.Button title="Kapat" onPress={handlePress} />
          <Dialog.Button title="Ekle" onPress={handleAddPet} />
        </Dialog.Actions>
      </Dialog>
    </>
  )
  const unAuthenticatedScreens = () => (
    <>
    <Drawer.Navigator useLegacyImplementation
      initialRouteName={"Login"}>
      <Drawer.Screen options={setDrawerOptions("Giriş")} name="Login" component={Login} />
      <Drawer.Screen options={setDrawerOptions("Kayıt ol")} name="Register" component={render} />
      </Drawer.Navigator>
    </>
  )
  const authenticatedScreens = () => (
    <>
    <Drawer.Navigator useLegacyImplementation
      initialRouteName={"Home"}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen options={setDrawerOptions("Ana Ekran")} name="Home" component={Home} />
      <Drawer.Screen options={{
        ...setDrawerOptions("Hayvanlarım"),
        headerRight: () => renderAddScreen()
      }} name="Pets" component={Pets} />
      <Drawer.Screen options={setDrawerOptions("Randevular")} name="SelectedPetAppointment" component={SelectedPetAppointment} />
      <Drawer.Screen options={setDrawerOptions("Tüm randevular")} name="Appointments" component={Appointments} />
      <Drawer.Screen options={setDrawerOptions("Sahiplenme")} name="Adopt" component={Adopt} />
      <Drawer.Screen options={setDrawerOptions("Detay")} name="PetScreen" component={PetScreen} />
      <Drawer.Screen options={setDrawerOptions("Randevu al")} name="TakeAppointment" component={TakeAppointment} />
    </Drawer.Navigator>
    </>
  )
  return (
  <>
  {!user ? unAuthenticatedScreens() : authenticatedScreens()}
  </>);
}
