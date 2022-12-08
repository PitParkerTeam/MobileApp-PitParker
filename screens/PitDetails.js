import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SmallMap } from '../components';
import { getPit } from '../api/firestore/pit_store';

export default function PitDetails( { route }) {
  useEffect(() => {
    const { id } = route.params;
    getPit(id).then((res) => setPit(res));
    return () => {};
  }, [route]);

  const [pit, setPit] = useState({});
  
  const { longitude, latitude, name, distance, area } = pit;
  return (
    <View>
      <SmallMap location={{ longitude, latitude }}/>
    </View>
  )
}