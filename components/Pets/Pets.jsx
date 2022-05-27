import { View } from 'react-native'
import React from 'react'
import { Card, Icon, Text, makeStyles } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Pets(props) {
    const { navigation } = props;
    const styles = useStyles(props);
    const handlePress = () => {
        navigation.navigate("Appointment")
    }
    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Card wrapperStyle={styles.card}>
                    <Icon name="paw" type='font-awesome' />
                    <Text>Hayvan ismi : Maviş</Text>
                    <Text>Bilgi : Siyam Kedisi</Text>
                </Card>
            </TouchableOpacity>
        </View>
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