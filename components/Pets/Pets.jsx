import { ScrollView } from 'react-native'
import React from 'react'
import { Card, Icon, Text, makeStyles } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getPetAppointmentFromDB, getPetsFromDB } from '../../firebase/Firebase'
import { UserContext } from '../../firebase/Context'
export default function Pets(props) {
    // gets navigation prop from AppStack navigation
    const { navigation } = props;
    // gets user info and global isDataChanged state from UserContext
    // that we provide it from AppStack <UserContext.Provider>
    const {user , isDataChanged} = React.useContext(UserContext);
    const styles = useStyles(props);
    // default empty current user's pet state
    const [pets,setPets] = React.useState([]);
    // loading state for db process if loading we don't show any card on screen
    const [loading,setLoading] = React.useState(true);
    // if user press on single pet card this function will take pet's appointment
    // info from db and navigates AppointmentScreen
    const handlePress = async (petName) => {
        let arr = await getPetAppointmentFromDB(user.email,petName);
        if(arr.length){
            navigation.navigate('SelectedPetAppointment',{arr})
        }
    }
    // initial function for fetching pets from db and passing setLoading state
    // to actual fetching state (firebase.js) 
    // in firebase getPEtsFromDB setLoading is using for handling state change
    const getInitial = async () => {
        let petArr = await getPetsFromDB(user.email,setLoading);
        setPets(petArr)
    }
    // works only once to get pets from db
    React.useEffect(() => {
        getInitial()
    },[])
    // if user adds new pet we call initial again to show actual pet list that currently added 
    // this use effect is using for ui experience 
    React.useEffect(() => {
        getInitial();
    },[isDataChanged])
    return (
        <ScrollView>
        {loading ? 
        <Text>Yükleniyor...</Text> 
        :
        pets?.map((pet,index) => (<TouchableOpacity key={index} onPress={() => handlePress(pet.name)}>
            <Card wrapperStyle={styles.card}>
                <Icon name="paw" type='font-awesome' />
                <Text>Hayvan ismi : {pet.name}</Text>
                <Text>Bilgi : {pet.info}</Text>
            </Card>
        </TouchableOpacity>))}
        </ScrollView>
    )
}
const useStyles = makeStyles((theme, props) => ({
    card: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between",
    height:100,
    alignItems:"center" 
}
}))