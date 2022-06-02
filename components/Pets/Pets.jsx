import { ScrollView } from 'react-native'
import React from 'react'
import { Card, Icon, Text, makeStyles } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getPetAppointmentFromDB, getPetsFromDB } from '../../firebase/Firebase'
import { UserContext } from '../../firebase/Context'
export default function Pets(props) {
    const { navigation } = props;
    const {user , isDataChanged} = React.useContext(UserContext);
    const styles = useStyles(props);
    const [pets,setPets] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const handlePress = async (petName) => {
        let arr = await getPetAppointmentFromDB(user.email,petName);
        if(arr.length){
            navigation.navigate('SelectedPetAppointment',{arr})
        }
    }
    const getInitial = async () => {
        let petArr = await getPetsFromDB(user.email,setLoading);
        setPets(petArr)
    }
    React.useEffect(() => {
        getInitial()
    },[])
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