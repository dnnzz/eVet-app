import { ScrollView, SafeAreaView, View } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker'
import { register, createUserProfileDocument } from '../../firebase/Firebase';


export default function Register(props) {
    const styles = useStyles(props);
    const logo = require("../../assets/yesil.png");
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        { label: 'Vet hasan', value: 'hasan' },
        { label: 'Vet ali', value: 'ali' },
        { label: 'Vet mehmet', value: 'mehmet' },
        { label: 'Şirin pati', value: 'sirinpati' },
        { label: 'Hayvan hastanesi', value: 'hayvanhastanesi' },
    ]);
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
        const { email, password } = userDataState;
        register(email, password)
        createUserProfileDocument(userDataState,{veteriner:value});
    }
    return (
        <SafeAreaView>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
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
                <View style={{ marginTop: 4 }}>
                    <DropDownPicker
                        listMode='SCROLLVIEW'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Veteriner seçiniz"
                        dropDownDirection='TOP'
                        dropDownContainerStyle={{
                            zIndex: 3, // works on ios
                            elevation: 3,
                        }}
                    />
                </View>
                <Button onPress={() =>handleSubmit()} buttonStyle={styles.button}>Kayıt ol</Button>
            </ScrollView>
        </SafeAreaView>
    )
}
const useStyles = makeStyles((theme, props) => ({
    container: {
        height: "100%",
        padding: 40,
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
        marginTop: 10,
        width: 285,
        backgroundColor: '#a7ecc7'
    },
    img: {
        height: 200,
        width: 200,
        marginBottom: 40
    }
}))