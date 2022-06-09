import { View } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';
import { UserContext } from '../../firebase/Context';
export default function Login(props) {
  // get login function from user context that we provide data UserProvider
  const { contextLogin } = React.useContext(UserContext)
  const styles = useStyles(props);
  const logo = require("../../assets/yesil.png");
  // Keeps user input state to send login function
  const [userDataState, setUserDataState] = React.useState({
    email: "",
    password: ""
  })
  // handles input change if user press any key on keyboard above userDataState updates
  const handleChange = (text, type) => {
    setUserDataState({ ...userDataState, [type]: text });
  }
  // Uses context login to login user (if user is logged in it'll redirect to home screen)
  const handleSignIn = () => {
    const { email, password } = userDataState;
    contextLogin(email, password);
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
          autoCapitalize="none"
          placeholder='Email' />
        <Input
          onChangeText={(e) => handleChange(e, "password")}
          placeholderTextColor={"black"}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          leftIcon={{ type: 'entypo', name: 'lock' }}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Şifre' />
        <Button onPress={() => handleSignIn()} buttonStyle={styles.button}>Giriş yap</Button>
        <Button titleStyle={styles.registerBtn}
          title="Hesabınız yok mu ? Kaydolun" onPress={() => props.navigation.navigate("Register")} />
    </View>
  )
}
const useStyles = makeStyles((theme, props) => ({
  container: {
    marginTop: 10,
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