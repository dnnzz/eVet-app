import { View , ScrollView } from 'react-native'
import React from 'react';
import { Card, Button, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {UserContext} from '../../firebase/Context'
import FlipCard from 'react-native-flip-card';
import MapView , {Marker} from 'react-native-maps';
import { getUserDocument ,getSingleVeterinaryFromDB } from '../../firebase/Firebase';
// Home screen
export default function Home(props) {
  // variable for mapRef that we show on flip card 
  var mapRef;
  // taken navigation prop from AppStack navigation 
  const { navigation } = props;
  // User info that providing from UserContext
  const {user} =  React.useContext(UserContext);
  // veterinary detailed info state for flip card fields
  // this will fetching from db and set to state
  const [vetInfo,setVetInfo]= React.useState(null);
  const styles = useStyles(props);
  // handles which screen we want to show on screen
  // routeName is -> "PetScreen" ex. if user press it'll show PetScreen
  // routeName is parameter that we pass to navigation.navigate
  const handlePress = (routeName) => {
    navigation.navigate(routeName)
  }
  // fetching veterinary info from db according to current users email 
  // the user email is provided from UserContext
  const getCurrentUserVeterinary= async ()=>{
    let userDoc = (await getUserDocument(user.email)).data();
    // fetching vet info from db 
    let vet = await getSingleVeterinaryFromDB(userDoc.veterinary);
    // vet info is array db sends that information 
    vet.forEach(element => {
      setVetInfo(element.data());
    })
  }
  // Using mapRef and animates zoom animation to marker
  // region latitude and longitude coming from above getCurrentUserVEterinary function (from db)
  const zoomToMarker = () => {
    const region = {
      latitude: vetInfo.lat,
      longitude: vetInfo.lon,
      latitudeDelta: 0.007,
      longitudeDelta: 0.004
    }
   mapRef ? mapRef.animateToRegion(region, 2500) : null
  }
  // fetching current user veterinary info from db only once 
  // cuz use effect's second parameter is empty array [] 
  // meaning that this empty array not related any other state just works only once
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