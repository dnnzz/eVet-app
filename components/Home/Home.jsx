import { View , ScrollView } from 'react-native'
import React from 'react';
import { Card, Button, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {UserContext} from '../../firebase/Context'
import FlipCard from 'react-native-flip-card';
import MapView , {Marker} from 'react-native-maps';
import { getUserDocument ,getSingleVeterinaryFromDB } from '../../firebase/Firebase';
export default function Home(props) {
  var mapRef;
  const { navigation } = props;
  const {user} =  React.useContext(UserContext);
  const [vetInfo,setVetInfo]= React.useState(null);
  const styles = useStyles(props);
  const handlePress = (routeName) => {
    navigation.navigate(routeName)
  }
  const getCurrentUserVeterinary= async ()=>{
    let userDoc = (await getUserDocument(user.email)).data();
    let vet = await getSingleVeterinaryFromDB(userDoc.veterinary);
    vet.forEach(element => {
      setVetInfo(element.data());
    })
  }
  const zoomToMarker = () => {
    const region = {
      latitude: vetInfo.lat,
      longitude: vetInfo.lon,
      latitudeDelta: 0.007,
      longitudeDelta: 0.004
    }
   mapRef ? mapRef.animateToRegion(region, 2500) : null
  }
  React.useEffect(()=>{
    getCurrentUserVeterinary();
  },[])
  return (
    <ScrollView contentContainerStyle={styles.view}>
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
        {vetInfo && <FlipCard
        onFlipEnd={()=> zoomToMarker()} 
        style={styles.flipCardView}>
          <View style={styles.face}>
            <Text>Veteriner adı : {vetInfo.name}</Text>
            <Text>Hekim İsim Soyisim : {vetInfo.vetName}</Text>
            <Text>Telefon : {vetInfo.phone}</Text>
            <Text>Email : {vetInfo.email}</Text>
            <Text>Adres: {vetInfo.address}</Text>
            <Text style={{textAlign:"center",padding:10}}>Yazıya tıklayarak harita görünümüne geçebilirsiniz.</Text>
          </View>
          <View style={styles.back}>
            <TouchableOpacity>
            <MapView
            ref={(ref)=> { mapRef = ref }}
             initialRegion={{
              latitude: 39.925533,
              longitude: 32.866287,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            style={styles.back}
            >
               <Marker
        coordinate={{
          latitude: vetInfo.lat,
          longitude: vetInfo.lon,
        }}
        key={1}
        title={vetInfo.name}
        description={vetInfo.address}
        resizeMode='contain'
      />
            </MapView>
            <Text style={{textAlign:"center",marginTop:10}}>Yazıya tıklayarak adres kısmına geçebilirsiniz.</Text>
            </TouchableOpacity>
          </View>
        </FlipCard>}
      </View>
    </ScrollView>
  )
}
const useStyles = makeStyles((theme, props) => ({
  flipCardView:{
    marginLeft:60,
    marginTop:30
  },
  face:{
    height:200,
    width:250,
  },
  back:{
    height:200,
    width:250,  
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 30,
    marginTop: 80
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