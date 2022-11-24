import { View, Text } from 'react-native'
import React from 'react'
import Map from './Map'

export default function LocationCard() {
  return (
    <View>
      <Map />
      <Text>Location Info</Text>
      <Text>Price Info</Text>
    </View>
  )
}