import { View, Text } from 'react-native'
import React from 'react'
import Appointment from '../Appointment/Appointment'

export default function Appointments() {
  const dummy = [<Appointment />,<Appointment />,<Appointment />,<Appointment />]
  return (
    <View>
      {dummy.map(i => i)}
    </View>
  )
}