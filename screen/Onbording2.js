import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './Style'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const Onbording2 = () => {
  const navigation = useNavigation();
  return (
    
        <View style={[styles.container,{height:responsiveHeight(100)}]}>
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                
                </View>
                <Image style={styles.image} source={require('../assets/onbord1.png')} />
            </View>

            <View style={styles.content}>
              <Text style={styles.headingtext}>We Make, You Wear</Text>
              <Text style={styles.paratext}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi itaque. </Text>
            </View>

            <View style={styles.dotcontainer}>
                <View style={styles.dot}></View>
                <View style={[styles.dot,styles.active]}></View>
                <View style={styles.dot}></View>
            </View>

            <View style={styles.btngroup}>
              <TouchableOpacity  onPress={() => {navigation.navigate("Home")}}>
                <Text style={styles.btntext}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnactive,styles.active]}  onPress={() => {navigation.navigate("Onbording3")}}>
                <Text style={[styles.btntext,styles.active]}>Next</Text>
              </TouchableOpacity>
            </View>
        </View>
  )
}

export default Onbording2