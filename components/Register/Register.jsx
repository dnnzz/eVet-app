import { ScrollView, SafeAreaView, View } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker'
import { getVeterinaryListFromDB, register, signOut } from '../../firebase/Firebase';
import { UserContext } from '../../firebase/Context';


export default function Register(props) {
    const { navigation } = props;
    const styles = useStyles(props);
    const {user,userDataState, setUserDataState, createUserProfile } = React.useContext(UserContext);
    const logo = require("../../assets/yesil.png");
    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [vetValue, setVetValue] = React.useState('');
    const handleChange = (text, type) => {
        setUserDataState({ ...userDataState, [type]: text });
    }
    const handleSubmit = () => {
        const { email, password } = userDataState;
        register(email, password)
        createUserProfile()
    }
    const getVeterinaryList= async ()=>{
        let vetArr = await getVeterinaryListFromDB(setLoading);
        let dropDownArr = vetArr.map((vet,index) => ({key:index,label:vet.name,value:vet.vetId}))
        setItems(dropDownArr);
    }
    React.useEffect(() => {
        setUserDataState({ ...userDataState, veterinary: vetValue })
    }, [vetValue]);
    React.useEffect(()=>{
        getVeterinaryList();
    },[]);
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
                    autoCapitalize='none'
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
                    {!loading && <DropDownPicker
                        listMode='SCROLLVIEW'
                        open={open}
                        value={vetValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setVetValue}
                        setItems={setItems}
                        placeholder="Veteriner seçiniz"
                        dropDownDirection='TOP'
                        dropDownContainerStyle={{
                            zIndex: 3, // works on ios
                            elevation: 3,
                        }}
                    />}
                </View>
                <Button onPress={() => handleSubmit()} buttonStyle={styles.button}>Kayıt ol</Button>
            </ScrollView>
        </SafeAreaView>
    )
}
const useStyles = makeStyles((theme, props) => ({
    container: {
        height: "100%",
        padding: 30,
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
        marginBottom: 10
    }
}))