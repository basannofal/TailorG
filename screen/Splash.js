import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.avtar} source={require('../assets/splash.png')} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#56BC1F"
  },
  avtar: {
   height:responsiveHeight(100),
   width:responsiveWidth(100)
  }
})