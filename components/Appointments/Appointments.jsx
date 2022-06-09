import { View, Text } from 'react-native'
import React from 'react'
import Appointment from '../Appointment/Appointment'
import { UserContext } from '../../firebase/Context';
import { getAppointmentsFromDB } from '../../firebase/Firebase';

export default function Appointments(props) {
  const [loading, setLoading] = React.useState(true);
  const [appointments, setAppointments] = React.useState([]);
  const { user , isDataChanged} = React.useContext(UserContext);
  const getInitial = async () => {
    let appointmentArr = await getAppointmentsFromDB(user.email, setLoading);
    setAppointments(appointmentArr)
  }
  React.useEffect(() => {
    getInitial()
  }, [])
  React.useEffect(() => {
    getInitial()
  }, [isDataChanged])
  return (
    <View>
      {loading ? <Text>Yükleniyor...</Text> : 
      appointments.map((appointment, index) => {
        return <Appointment key={index} user={user} appointment={appointment} />
      })}
    </View>
  )
}