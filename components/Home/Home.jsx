import { View } from 'react-native'
import React from 'react';
import { Card , Text , makeStyles } from '@rneui/themed';

export default function Home(props) {
  const styles = useStyles(props);
  const handlePress = () =>{
    console.log("adsadjkl")
  }
  return (
    <View style={styles.container}>
      <Card onPress={handlePress} containerStyle={{display:"flex",justifyContent:"center",height:150,width:150}}>
        <View>
          <Text style={styles.text}>Hayvanlarım</Text>
        </View>
      </Card>
      <Card containerStyle={styles.container}>
        <View>
          <Text style={styles.text}>Sahiplenme</Text>
        </View>
      </Card>
      <Card containerStyle={styles.container}>
        <View>
          <Text style={styles.text}>Randevu al</Text>
        </View>
      </Card>
      <Card containerStyle={styles.container}>
        <View>
          <Text style={styles.text}>Randevularım</Text>
        </View>
      </Card>
    </View>
  )
}
const useStyles = {
  container:{
    display:"flex",
    justifyContent:"center",
    height:150,
    width:150
  },
  text:{
    textAlign:"center"
  }
}