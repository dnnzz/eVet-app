import { ScrollView, SafeAreaView, View } from 'react-native'
import React from 'react'
import { Image, Input, Button, makeStyles } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker'
import { getVeterinaryListFromDB, register } from '../../firebase/Firebase';
import { UserContext } from '../../firebase/Context';


export default function Register(props) {
    const styles = useStyles(props);
    // global userDataState and for setting global userDataState we take setUserDataState from useState
    // createUserProfile for if user is registered it'll write user info to firestore collection
    const {userDataState, setUserDataState, createUserProfile } = React.useContext(UserContext);
    const logo = require("../../assets/yesil.png");
    // These three state are used for dropdown picker
    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    //------------------------------------------------
    // sets selected dropdown value state for payload
    const [vetValue, setVetValue] = React.useState('');
    // handles change for specific field if user writes key on email input field
    // this will update userDataState.email 
    const handleChange = (text, type) => {
        setUserDataState({ ...userDataState, [type]: text });
    }
    // this sends email and password that coming from userDataState to firebase 
    // register function , and calls createUserProfile if  user registered successfully
    const handleSubmit = () => {
        const { email, password } = userDataState;
        register(email, password)
        createUserProfile()
    }
    // this will fetch all veterinary list from firestore database
    const getVeterinaryList= async ()=>{
        let vetArr = await getVeterinaryListFromDB(setLoading);
        let dropDownArr = vetArr.map((vet,index) => ({key:index,label:vet.name,value:vet.vetId}))
        setItems(dropDownArr);
    }
    // updates when user select veterinary from dropdown
    React.useEffect(() => {
        setUserDataState({ ...userDataState, veterinary: vetValue })
    }, [vetValue]);
    // get vet List from db only once when component is mounted to screen
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