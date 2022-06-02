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
  const [isLoading,setLoading] = React.useState(true);
  const styles = useStyles(props);
  const handlePress = (routeName) => {
    navigation.navigate(routeName)
  }
  const getData = async (vetId) => {
    let vet = await(getSingleVeterinaryFromDB(vetId,setLoading)).data();
    console.log(vet)
  }
  const getCurrentUserVeterinary= async ()=>{
    let userDoc = (await getUserDocument(user.email)).data();
    return getData(userDoc.veterinary) 
  }
  const zoomToMarker = () => {
    console.log(vet);
    const region = {
      latitude: 36.8583502,
      longitude: 30.7409362,
      latitudeDelta: 0.007,
      longitudeDelta: 0.004
    }
   mapRef ? mapRef.animateToRegion(region, 2500) : null
  }
  React.useEffect(()=>{
    getCurrentUserVeterinary();
  },[isLoading])
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
        <FlipCard
        onFlipEnd={()=> zoomToMarker()} 
        style={styles.flipCardView}>
          <View style={styles.face}>
            <Text>Veteriner adı : Patiler</Text>
            <Text>Hekim İsim Soyisim : Kadir Elkin</Text>
            <Text>Telefon : +905321234567</Text>
            <Text>Email : pati@gmail.com</Text>
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
          latitude: 36.8583502,
          longitude: 30.7409362,
        }}
        key={1}
        title="Klinik"
        description={"Adres"}
        resizeMode='contain'
      />
            </MapView>
            <Text style={{textAlign:"center",marginTop:10}}>Yazıya tıklayarak adres kısmına geçebilirsiniz.</Text>
            </TouchableOpacity>
          </View>
        </FlipCard>
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