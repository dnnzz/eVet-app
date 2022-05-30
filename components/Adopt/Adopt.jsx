import { View } from 'react-native'
import React from 'react'
import { Input , Card ,Text ,Icon , makeStyles } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Adopt(props) {
    const { navigation } = props;
    const styles = useStyles(props);
    const handlePress = () => {
        navigation.navigate("PetScreen");
    }
  return (
    <View>
      <Input  leftIcon={{ type: 'ant-design', name: 'search1' }} placeholder='Ara...'/>
      <TouchableOpacity onPress={handlePress}>
      <Card wrapperStyle={styles.card}>
        <Icon name="paw" type='font-awesome' />
        <View style={styles.flex}>
          <Text>Tür : Kedi</Text>
          <Text>Cins :Ankara kedisi</Text>
          <Text>Cinsiyet :Dişi</Text>
          <Text>Yaş :2</Text>
        </View>
      </Card>
      </TouchableOpacity>
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
    }
  }))