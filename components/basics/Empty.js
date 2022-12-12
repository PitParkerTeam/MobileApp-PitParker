import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { COLORS, TEXT_STYLES } from "../../common"

export default function Empty({text}) {
  return (
    <View style={styles.empty}>
      <Text style={styles.text}>- {text} -</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    empty: {
        height:500,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        ...TEXT_STYLES.title[400],
        color:COLORS.BASE[80]
    }
})