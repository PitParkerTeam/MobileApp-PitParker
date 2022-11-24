import { View, Text } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import BottomBar from '../components/BottomBar'



export default function Main() {
  return (
    <View>
      <Map />
      <BottomBar />
    </View>
  )
}