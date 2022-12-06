import { View, Text } from 'react-native'
import React from 'react'
import { SmallMap } from '../components';

export default function ParkingPitDetails( { route }) {
  const { pit } = route.params;
  const { longitude, latitude, name, distance, area } = pit;
  return (
    <View>
      <SmallMap location={{ longitude, latitude }}/>
    </View>
  )
}