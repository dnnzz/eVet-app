import { View } from 'react-native'
import React from 'react'
import { Card, Text, Icon, makeStyles, Dialog } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Appointment(props) {
  const { navigation } = props;
  const styles = useStyles(props);
  const [showDialog,toggleDialog] = React.useState(false)
  const handlePress = () => {
    toggleDialog(!showDialog);
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
      <Card wrapperStyle={styles.card}>
        <Icon name="calendar" type='font-awesome' />
        <View style={styles.flex}>
          <Text>Tarih : 15.05.2022</Text>
          <Text>Yapılan işlem :Aşı</Text>
        </View>
      </Card>
      </TouchableOpacity>
      <Dialog
      overlayStyle={{backgroundColor:"white"}}
      isVisible={showDialog}
      onBackdropPress={handlePress}>
        <Dialog.Title>Detay</Dialog.Title>
        <Text style={styles.modalText}>Karma aşısı yapıldı.Genel kontrol yapıldı.</Text>
        <Dialog.Actions>
        <Dialog.Button title="Kapat" onPress={handlePress}/>
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
  modal:{
    backgroundColor:"white"
  },
  modalText:{
    textAlign:"center"
  }
}))