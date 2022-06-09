import { View } from 'react-native'
import React from 'react'
import { Card, Text, Icon, makeStyles, Dialog } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {cancelAppointment} from '../../firebase/Firebase';
import {UserContext} from '../../firebase/Context';
// same as appointment screen just for selected pet 
export default function SelectedPetAppointments(props) {
    const styles = useStyles(props);
    const [showDialog, toggleDialog] = React.useState(false)
    const {user ,setIsDataChanged , isDataChanged} = React.useContext(UserContext);
    const handlePress = () => {
        toggleDialog(!showDialog);
    }
    const handleCancel = (id,pet) => {
        cancelAppointment(user.email,id,pet)
        toggleDialog(!showDialog);
        setIsDataChanged(!isDataChanged)
    }
    const setType = (type) => {
        switch (type) {
            case "vaccination":
                return "Aşılama"
            case "furcut":
                return "Traş"
            case "sterilization":
                return "Kısırlaştırma"
            case "nail":
                return "Tırnak Kesimi"
            case "control":
                return "Genel Kontrol"
            default:
                return ""
        }
    }
    return (
        <View>
            {props.route.params.arr.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={handlePress}>
                        <Card wrapperStyle={styles.card}>
                            <Icon name="calendar" type='font-awesome' />
                            <View style={styles.flex}>
                                <Text>İsim : {item.pet}</Text>
                                <Text>Tarih : {new Date(item.date).toLocaleDateString("tr-TR")
                                    .replace(/ /g, '-')}</Text>
                                <Text>Saat : {item.hour}</Text>
                                <Text>Yapılacak işlem : {setType(item.type)}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <Dialog
                        overlayStyle={{ backgroundColor: "white" }}
                        isVisible={showDialog}
                        onBackdropPress={handlePress}>
                        <Dialog.Title>Detay</Dialog.Title>
                        <Text style={styles.modalText}>{item.additionalMsg || "Not bulunmamaktadır."}</Text>
                        <Dialog.Actions>
                            <Dialog.Button title="Kapat" onPress={handlePress} />
                            <Dialog.Button title="İptal et" onPress={() => handleCancel(item.id,item.pet)} />
                        </Dialog.Actions>
                    </Dialog>
                </View>
            )
            )
            }
        </View>
    )
}
const useStyles = makeStyles((theme, props) => ({
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    flex: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        marginLeft: 50
    },
    modal: {
        backgroundColor: "white"
    },
    modalText: {
        textAlign: "center"
    }
}))