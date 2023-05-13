import { ActivityIndicator, SafeAreaView, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Linking, Keyboard, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CostomerInfo from './CostomerInfo';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts, styles } from './Style';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font/build/FontHooks';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Netinfo from './netinfo/Netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ route }) => {

  const id = route.params._id




  const Whatsapp = (e) => {

    Linking.openURL(`whatsapp://send?text=Hello&phone=+91${e}`)
  }

  const Phone = (e) => {
    Linking.openURL(`tel:${e}`)
  }
  const navigation = useNavigation();

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [filterdata, setfilterdata] = useState([]);
  const [search, setsearch] = useState('');
  const [netinfo, setNetinfo] = useState(false);


  const getdata = async () => {

      try {
        // let x = await Network.getIpAddressAsync();
        const res = await fetch(`https://aufcart.com/api/getuser/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })

        const data = await res.json();
        if (!data) {
          window.alert('Server Error')
        }
        else {
          setdata(data.costomer)
          setfilterdata(data.costomer)
          await AsyncStorage.setItem('customer', JSON.stringify(data.costomer))
          await AsyncStorage.setItem('alldata', JSON.stringify(data))
          setloading(false)

        }

      } catch (e) {
        window.alert("Check Network Connection")
      }

  }




  useEffect(() => {
    getdata();
    Netinfo().then(res => {
      setNetinfo(res);
    })


    const focusHandler = navigation.addListener('focus', () => {
      Netinfo().then(res => {
        setNetinfo(res);
      })
      getdata();
    });
    return focusHandler;


  }, [route])



  const [Fontloaded] = useFonts({
    'Medium': require('./Font/Roboto-Medium.ttf'),
    'Bold': require('./Font/Roboto-Bold.ttf'),
    'Regular': require('./Font/Roboto-Regular.ttf'),
  })
  if (!Fontloaded) {
    return null
  }




  const searchdata = (text) => {

    if (text) {
      const newdata = data.filter((item) => {
        const itemdata = item.cname ? item.cname.toUpperCase()
          : ''.toUpperCase();
        const textdata = text.toUpperCase();
        return itemdata.indexOf(textdata) > -1;
      })

      setfilterdata(newdata);
      setsearch(text);
    }
    else {
      setfilterdata(data);
      setsearch(text);
    }
  }



  {
    if (loading == true) {

      return (


        <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

      )
    }
    else {


      return (
        <>
          <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>



            {
              netinfo ? <Text style={{ display: "none" }}></Text> :
                <View>
                  <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "#56BC1F", height: responsiveHeight(3), width: responsiveWidth(100), }}>

                    <Text style={{ color: "#fff" }}>Connection Lost</Text>
                  </View>
                </View>
            }
            <View style={[styles.flatlistheader]}>
              <View style={styles.headername}>
                <View>
                  <Text style={[styles.headernametext, { fontFamily: "Medium" }]}>Customers </Text>
                </View>


                <TouchableOpacity style={styles.headericon} onPress={() => {
                  navigation.navigate("Add Costomer", {
                    id: id
                  })
                }} >
                  <AntDesign name="plus" size={20} color="black" />
                  <Text style={[styles.link, { paddingHorizontal: responsiveWidth(1), fontFamily: "Regular" }]}>Add</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.flexstart, { marginTop: responsiveHeight(2.5) }]}>

                <TextInput style={[styles.input, { marginLeft: responsiveWidth(2), width: responsiveWidth(65), borderBottomLeftRadius: 5, borderTopLeftRadius: 5, fontFamily: "Regular" }]} onChangeText={(e) => searchdata(e)} value={search} placeholder="Search Customer" underlineColorAndroid="transparent" />

                <TouchableOpacity onPress={Keyboard.dismiss} style={{ width: responsiveWidth(15), display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#56BC1F", borderTopRightRadius: 5, borderBottomRightRadius: 5, paddingVertical: responsiveHeight(1.7) }}>
                  <AntDesign name="search1" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {
              filterdata != '' ?
                <FlatList
                  data={filterdata}
                  keyExtractor={item => item._id}
                  // inverted
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item }) =>
                  (

                    <View style={[styles.flatlistcontainer, styles.spacebetween]}>
                      <TouchableOpacity style={styles.flexstart} onPress={() => {
                        navigation.navigate('Costomer Detail', {
                          id: id,
                          obid: item._id

                        }),
                          setsearch('')
                      }}>


                        <Image style={[styles.avtar,{marginLeft:responsiveWidth(1)}]} source={require('../assets/14.png')} />

                        <View style={[styles.flatlisttext, { width: responsiveWidth(40), }]}>

                          <Text style={[styles.titletext, { fontFamily: "Regular", letterSpacing: .5 }]}> {item.cname} </Text>
                          <View style={[styles.flexstart, { marginTop: 2 }]}>
                            {/* <Ionicons name="location" size={14} color="black" /> */}
                            <Text style={{ fontFamily: "Regular", opacity: .7, letterSpacing: .5, fontSize: responsiveFontSize(1.5), marginLeft: responsiveWidth(.7) }}> {item.caddress} </Text>
                          </View>


                        </View>

                      </TouchableOpacity>

                      <View style={[styles.flatlistbtn, styles.flexstart]}>
                        <TouchableOpacity onPress={() => { Phone(item.cphone) }}>
                          <Feather name="phone-call" size={22} color="#4a4a48" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: responsiveWidth(5), marginRight: responsiveWidth(3) }} onPress={() => { Whatsapp(item.cphone) }}>

                          <FontAwesome name="whatsapp" size={24} color="#56BC1F" />
                        </TouchableOpacity>


                        {/* <TouchableOpacity style={styles.btn} onPress={() => {
                      navigation.navigate("Costomer Order", {
                        id: id,
                        obid: item._id

                      }),
                        setsearch('')
                    }}>
                    <MaterialIcons name="shopping-cart" size={26} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn,{marginLeft:responsiveWidth(5)}]} onPress={() => {
                      navigation.navigate("Measurements", {
                        id: id,
                        obid: item._id

                      }),
                        setsearch('')
                    }}>
                    <Ionicons name="md-speedometer" size={26} color="black" />                    
                    </TouchableOpacity> */}


                      </View>




                    </View>
                  )
                  }
                />

                :
                <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: responsiveHeight(55) }}>
                  <Text style={{ fontSize: responsiveFontSize(4), opacity: .4, fontFamily: "Regular" }}>No Customer Found</Text>
                  <TouchableOpacity style={{ width: responsiveWidth(74) }} onPress={() => {
                    navigation.navigate("Add Costomer", {
                      id: id,
                    })
                  }} >
                    <Text style={[{ textAlign: "center", marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), borderRadius: 10, padding: responsiveHeight(1), color: "#fff", fontFamily: "Regular", backgroundColor: "#56BC1F", }]}>Add Customer </Text>
                  </TouchableOpacity>
                </View>
            }


          </SafeAreaView>



        </>
      )
    }
  }






}

export default Home



