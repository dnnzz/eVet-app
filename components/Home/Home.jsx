import { View } from 'react-native'
import React from 'react';
import { Card, Button, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FlipCard from 'react-native-flip-card';

export default function Home(props) {
  const {navigation} = props;
  const styles = useStyles(props);
  const handlePress = (routeName) => {
     navigation.navigate(routeName)
  }
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => handlePress("Pets")}>
        <Card containerStyle={styles.container}>
          <Button>
            <Text style={styles.text}>Hayvanlarım</Text></Button>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Ownership")}>
      <Card containerStyle={styles.container}>
          <Text style={styles.text}>Sahiplenme</Text>
      </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("TakeAppointment")}>
      <Card containerStyle={styles.container}>
          <Text style={styles.text}>Randevu al</Text>
      </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Appointments")}>
      <Card containerStyle={styles.container}>
          <Text style={styles.text}>Randevularım</Text>
      </Card>
      </TouchableOpacity>
      <View>
        {/* <FlipCard /> */}
      </View>
    </View>
  )
}
const useStyles = makeStyles((theme, props) => ({
  view: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 30,
    marginTop: 130
  },
  container: {
    display: "flex",
    justifyContent: "center",
    height: 150,
    width: 150
  },
  text: {
    textAlign: "center",
    color: "#000000",
  }
}))