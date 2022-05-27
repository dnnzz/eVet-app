import { ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';

export default function Register(props) {
    const styles = useStyles(props);
    const logo = require("../../assets/yesil.png");
    const [userDataState, setUserDataState] = React.useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })
    const handleChange = (text, type) => {
        setUserDataState({ ...userDataState, [type]: text });
    }
    const handleSubmit = () => {
        console.log(userDataState);
       // props.navigation.push("Home")
    }
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={styles.img} source={logo} />
                <Input
                    onChangeText={(e) => handleChange(e, "email")}
                    placeholderTextColor={"black"}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: 'material-community', name: 'email' }}
                    style={styles.input}
                    placeholder='Email' />
                <Input
                    onChangeText={(e) => handleChange(e, "name")}
                    placeholderTextColor={"black"}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: 'ionic-icons', name: 'person' }}
                    style={styles.input}
                    placeholder='Ad' />
                <Input
                    onChangeText={(e) => handleChange(e, "surname")}
                    placeholderTextColor={"black"}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: 'ionic-icons', name: 'person' }}
                    style={styles.input}
                    placeholder='Soyad' />
                <Input
                    onChangeText={(e) => handleChange(e, "password")}
                    placeholderTextColor={"black"}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: 'entypo', name: 'lock' }}
                    style={styles.input}
                    placeholder='Şifre' />
                <Button onPress={handleSubmit} buttonStyle={styles.button}>Kayıt ol</Button>
            </ScrollView>
        </SafeAreaView>
    )
}
const useStyles = makeStyles((theme, props) => ({
    container: {
        height:"100%",
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
    }
}))