import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './Style'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight } from 'react-native-responsive-dimensions'


const Onbording3 = () => {
  const navigation = useNavigation();
  return (
    
        <View style={[styles.container,{height:responsiveHeight(100)}]}>
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                
                </View>
                <Image style={styles.image3} source={require('../assets/onbord2.png')} />
            </View>

            <View style={styles.content}>
              <Text style={styles.headingtext}>We Crafting Dreams</Text>
              <Text style={styles.paratext}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi itaque. </Text>
            </View>

            <View style={styles.dotcontainer}>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={[styles.dot,styles.active]}></View>
            </View>

            <View style={styles.btngroup}>
              <TouchableOpacity style={[styles.btnactive,styles.active]}  onPress={() => {navigation.navigate("Login")}}>
                <Text style={[styles.fullbtn,styles.active]}>Get Started</Text>
              </TouchableOpacity>
            </View>
        </View>
  )
}

export default Onbording3
