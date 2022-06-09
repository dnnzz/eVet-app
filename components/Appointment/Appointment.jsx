import { View } from 'react-native'
import React from 'react'
import { Card, Text, Icon, makeStyles, Dialog } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
// Renders all appointments to screen 
export default function Appointment(props) {
  const { pet, type, hour, date, additionalMsg } = props.appointment;
  const styles = useStyles(props);
  // shows the dialog when we press on single appointment 
  // it'll displays additional appointment note if we press on appointment card
  const [showDialog, toggleDialog] = React.useState(false)
  // toggles dialog screen shown state
  const handlePress = () => {
    toggleDialog(!showDialog);
  }
  // localization for appointment type
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
      <TouchableOpacity onPress={handlePress}>
        <Card wrapperStyle={styles.card}>
          <Icon name="calendar" type='font-awesome' />
          <View style={styles.flex}>
            <Text>İsim : {pet}</Text>
            <Text>Tarih : {new Date(date).toLocaleDateString("tr-TR")
              .replace(/ /g, '-')}</Text>
            <Text>Saat : {hour}</Text>
            <Text>Yapılacak işlem : {setType(type)}</Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Dialog
        overlayStyle={{ backgroundColor: "white" }}
        isVisible={showDialog}
        onBackdropPress={handlePress}>
        <Dialog.Title>Detay</Dialog.Title>
        <Text style={styles.modalText}>{additionalMsg}</Text>
        <Dialog.Actions>
          <Dialog.Button title="Kapat" onPress={handlePress} />
        </Dialog.Actions>
      </Dialog>
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