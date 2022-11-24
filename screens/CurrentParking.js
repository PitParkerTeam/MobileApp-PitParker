import { View, Text } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import BottomBar from '../components/BottomBar'
import CurrPitCard from '../components/CurrPitCard'


export default function CurrentParking() {
  return (
    <View>
      <CurrPitCard />
      <Map />
      <BottomBar />
    </View>
  )
}