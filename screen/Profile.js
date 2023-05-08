import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ActivityIndicator, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Authcontext } from '../context/Context'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './Style';

const Profile = ({ route }) => {
  const { signout } = React.useContext(Authcontext)

  const ProfileEdit = () => {
    navigation.navigate("Profile Edit", {
      id: id
    })
  }



  const id = route.params._id




  const navigation = useNavigation();

  const [data, setdata] = useState('');
  const [loading, setloading] = useState(true);

  const getdata = async () => {

    try {
      const res = await fetch(`https://aufcart.com/api/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const data = await res.json();
      if (!data) {
        window.alert('error in get data')
      }
      else {
        setdata(data)
        setloading(false)
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }





  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getdata();
    });
    return focusHandler;

  }, [route])


  {
    if (loading == true) {
      return (


        <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

      )
    }
    else {
      return (













        <ScrollView showsVerticalScrollIndicator={false}>

          <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, height: responsiveHeight(100) }}>


            <View>

              <View style={[styles.protop, { display: "flex", justifyContent: "center", alignItems: "center" }]}>


                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Image style={[styles.profilepic]} source={require('../assets/a1.png')} />
                  <Text style={[styles.titletext, { marginTop: responsiveHeight(2), marginBottom: responsiveHeight(1) }]}>{data.name}</Text>
                  <Text style={styles.desctext}>+91 {data.phone}</Text>
                </View>

              </View>
              <View style={{ marginHorizontal: responsiveWidth(10), marginTop: responsiveHeight(1.3) }}>

                <TouchableOpacity onPress={() => { navigation.navigate("Order") }}>

                  <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                    <View style={styles.flexstart}>
                      <Text style={styles.proicon}>

                        <MaterialCommunityIcons name="clipboard-text" size={20} color="black" />
                      </Text>
                      <Text style={styles.prolistfont}>Orders</Text>
                    </View>
                    <Text><AntDesign name="right" size={16} color="black" /></Text>
                  </View>
                </TouchableOpacity>




                <TouchableOpacity onPress={() => { navigation.navigate("Cloth Type", { id: id }) }}>

                  <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                    <View style={styles.flexstart}>
                      <Text style={styles.proicon}>
                        <Ionicons name="ellipsis-horizontal-circle" size={20} color="black" />
                      </Text>
                      <Text style={styles.prolistfont}>Dress Type</Text>
                    </View>
                    <Text><AntDesign name="right" size={16} color="black" /></Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("Cloth Type Part", { id: id }) }}>

                  <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                    <View style={styles.flexstart}>
                      <Text style={styles.proicon}>
                        <Fontisto name="nav-icon-grid" size={20} color="black" />

                      </Text>
                      <Text style={styles.prolistfont}>Measurments Type</Text>
                    </View>
                    <Text><AntDesign name="right" size={16} color="black" /></Text>
                  </View>
                </TouchableOpacity>


                <View style={{ borderWidth: .5, borderColor: "#d9d9d9", marginVertical: responsiveHeight(2) }}></View>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('Profile Info', {
                    id: id
                  })
                }}>

                  <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                    <View style={styles.flexstart}>
                      <Text style={styles.proicon}>

                        <MaterialCommunityIcons name="account" size={20} color="black" />
                      </Text>
                      <Text style={styles.prolistfont}>Profile</Text>
                    </View>
                    <Text><AntDesign name="right" size={16} color="black" /></Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { signout() }}>

                  <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                    <View style={styles.flexstart}>
                      <Text style={styles.proicon}>
                        <Entypo name="log-out" size={18} color="black" />
                      </Text>
                      <Text style={styles.prolistfont}>Logout</Text>
                    </View>
                    <Text><AntDesign name="right" size={16} color="black" /></Text>
                  </View>
                </TouchableOpacity>


              </View>
            </View>

          </SafeAreaView>
        </ScrollView>
      )
    }
  }

}

export default Profile

