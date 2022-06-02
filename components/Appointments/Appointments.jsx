import { View, Text } from 'react-native'
import React from 'react'
import Appointment from '../Appointment/Appointment'
import { UserContext } from '../../firebase/Context';
import { getAppointmentsFromDB } from '../../firebase/Firebase';

export default function Appointments(props) {
  const [loading, setLoading] = React.useState(true);
  const [appointments, setAppointments] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const getInitial = async () => {
    let appointmentArr = await getAppointmentsFromDB(user.email, setLoading);
    setAppointments(appointmentArr)
  }
  React.useEffect(() => {
    getInitial()
  }, [])
  return (
    <View>
      {loading ? <Text>Yükleniyor...</Text> : 
      appointments.map((appointment, index) => {
        return <Appointment key={index} appointment={appointment} />
      })}
    </View>
  )
}