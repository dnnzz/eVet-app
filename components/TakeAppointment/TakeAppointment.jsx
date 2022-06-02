import { View, ScrollView } from 'react-native'
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import {months,days} from '../Utils/Utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card, Text , Input , Button } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { getPetsFromDB , postAppointmentToDB} from '../../firebase/Firebase'
import { UserContext } from '../../firebase/Context'
export default function TakeAppointment() {
    const {user} = React.useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
      {label: 'Aşılama', value: 'vaccination'},
      {label: 'Traş', value: 'furcut'},
      {label: 'Kısırlaştırma', value: 'sterilization'},
      {label: 'Tırnak Kesimi', value: 'nail'},
      {label: 'Genel Kontrol', value: 'control'},
    ]);
    const [openPet, setOpenPet] = React.useState(false);
    const [pet, setPet] = React.useState(null);
    const [pets, setPets] = React.useState([]);
    const [hour,setHour] = React.useState("09:00");
    const [date,setDate] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    const [additionalMsg,setAdditionalMsg] = React.useState("");
    const getInitial = async () => {
        let petArr = await getPetsFromDB(user.email,setLoading);
        let dropDownArr = petArr.map(pet => ({label:pet.name,value:pet.name}))
        setPets(dropDownArr);
    }
    React.useEffect(() => {
        getInitial();
    } , []);
    const handlePress = (selectedHour) => {
        setHour(selectedHour)
    }
    const handleDateChange = (date) => {
        setDate(date)
    }
    const handleChange = (e) => {
        setAdditionalMsg(e);
    }
    const postAppointment = () => {
        const payload = {
            pet : pet,
            type : value,
            hour : hour,
            date : date.toString(),
            additionalMsg : additionalMsg
        }
        postAppointmentToDB(user.email,payload);
    }
  return ( 
    <ScrollView>
        <CalendarPicker
        weekdays={days}
        months={months}
        previousTitle={"Önceki"}
        nextTitle={"Sonraki"}
        selectedDayColor="#a7ecc7"
        onDateChange={handleDateChange}
        />
        <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => handlePress("09:00")}>
                <Card>
                   <Text>09:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("10:00")}>
                <Card>
                <Text>10:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("11:00")}>
                <Card>
                    <Text>11:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("12:00")}>
                <Card>
                   <Text>12:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("13:00")}>
                <Card>
                    <Text>13:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("14:00")}>
                <Card>
                    <Text>14:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("15:00")}>
                <Card>
                  <Text>15:00</Text>  
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("16:00")}>
                <Card>
                    <Text>16:00</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("17:00")}>
                <Card>
                    <Text>17:00</Text>
                </Card>
            </TouchableOpacity>
        </ScrollView> 
      <View style={{marginTop:30}}>
      <DropDownPicker
      listMode='SCROLLVIEW'
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Randevu türü"
      dropDownDirection='TOP'
      dropDownContainerStyle={{
        zIndex: 3, // works on ios
        elevation: 3,
      }}
    />
      </View>
      <View style={{marginTop:30}}>
     {!loading && <DropDownPicker
      listMode='SCROLLVIEW'
      open={openPet}
      value={pet}
      items={pets}
      setOpen={setOpenPet}
      setValue={setPet}
      setItems={setPets}
      placeholder="Randevu alınacak evcil hayvan"
      dropDownDirection='TOP'
      dropDownContainerStyle={{
        zIndex: 3, // works on ios
        elevation: 3,
      }}
    />}
      </View>
    <View>
    <Input
        onChangeText={(e) => handleChange(e)}
        placeholderTextColor={"black"}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        style={{
            height:100,
            borderWidth:1,
            backgroundColor:"white",
            marginTop:10
        }}
        placeholder='Ekstra mesaj yazmak için tıklayınız.' />
    </View>
    <Button
    titleStyle={{
        borderWidth:1,
        color:"black",
        width:150,
        height:40,
        fontWeight:"bold"
    }} 
      title="Randevu al" onPress={() => postAppointment()} />
    </ScrollView>
  )
}