import { View } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';
import { UserContext } from '../../firebase/Context';
import { auth , signOut } from '../../firebase/Firebase';
export default function Login(props) {
  const { contextLogin  } = React.useContext(UserContext)
  const styles = useStyles(props);
  const logo = require("../../assets/yesil.png");
  const [userDataState, setUserDataState] = React.useState({
    email: "",
    password: ""
  })
  const handleChange = (text, type) => {
    setUserDataState({ ...userDataState, [type]: text });
  }
  const handleSignIn = () => {
    const { email, password } = userDataState;
    contextLogin(auth, email, password);
  }
  return ( 
    <View style={styles.container}>
      <Image style={styles.img} source={logo} />
      <Input
        onChangeText={(e) => handleChange(e, "email")}
        placeholderTextColor={"black"}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        leftIcon={{ type: 'material-community', name: 'email' }}
        style={styles.input}
        placeholder='Email' />
      <Input
        onChangeText={(e) => handleChange(e, "password")}
        placeholderTextColor={"black"}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        leftIcon={{ type: 'entypo', name: 'lock' }}
        style={styles.input}
        placeholder='Şifre' />
      <Button onPress={() => handleSignIn()} buttonStyle={styles.button}>Giriş yap</Button>
      <Button onPress={() => signOut()} buttonStyle={styles.button}>çık</Button>
      <Button titleStyle={styles.registerBtn}
        title="Hesabınız yok mu ? Kaydolun" onPress={() => props.navigation.navigate("Register")} />
    </View>
  )
}
const useStyles = makeStyles((theme, props) => ({
  container: {
    marginTop: 30,
    padding: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    color: "black"
  },
  button: {
    padding: 10,
    width: 285,
    backgroundColor: '#a7ecc7'
  },
  img: {
    height: 200,
    width: 200,
    marginBottom: 50
  },
  registerBtn: {
    marginTop: 30,
    color: "#a7ecc7",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center"
  }
}))