import { View, Text } from 'react-native'
import React from 'react'
import LocationCard from '../components/LocationCard'
import PitButton from '../components/PitButton'


export default function ParkingLotDetails() {
  return (
    <View>
      <Text>Back Button</Text>
      <LocationCard />
      <PitButton />
    </View>
  )
}