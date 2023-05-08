import { ScrollView, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, SafeAreaView, Image, Linking, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Authcontext } from '../context/Context'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font/build/FontHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CostomerInfo = ({ route }) => {




  // alert 
  const alertvisible = () => {
    setisalertvisible(!isalertvisible);
  };



  // contact info

  const Whatsapp = (e) => {

    Linking.openURL(`whatsapp://send?text=Hello&phone=+91${e}`)
  }

  const Phone = (e) => {
    Linking.openURL(`tel:${e}`)
  }



  /// variable declaration

  const [isalertvisible, setisalertvisible] = useState(false);
  const [customer, setcustomer] = useState(Array);
  const [order, setorder] = useState(Array);
  const [id, setid] = useState('');
  const [customerid, setcustomerid] = useState('');
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);




  const getdata = async () => {

    let dcust = await AsyncStorage.getItem('customer');

    if (dcust) {
      let dacust = JSON.parse(dcust);
      setdata(dacust);
      console.log(dacust);
      dacust.filter((e) => {
        if (e._id === route.params.obid) {
          setcustomer(e)
          console.log(e);
          setloading(false)
        }
      })
    }
    else {

      try {
        const mainid = route.params.id
        const objectid = route.params.obid
        const res = await fetch(`https://aufcart.com/api/getuser/${mainid}/${objectid}`, {
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
          setcustomer(data[0].costomer[0])
          setdata(data)
          setloading(false)
        }

      } catch (e) {
        window.alert("Something Went Wrong")
      }
    }
  }


  const Deletecustomer = async () => {
    alertvisible()
    try {
      const mainid = route.params.id
      const objectid = route.params.obid
      const res = await fetch(`https://aufcart.com/api/customerdelete/${mainid}/${objectid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const data = await res.json();
      if (!data) {
        window.alert('error in get data')
      }
      else {
        await AsyncStorage.setItem('alldata', JSON.stringify(data))
        navigation.navigate("Home", {
          id: id
        })
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }
  const navigation = useNavigation();

  useEffect(() => {
    setid(route.params.id)
    setcustomerid(route.params.obid)
    getdata();


    const focusHandler = navigation.addListener('focus', () => {
      setid(route.params.id)
      setcustomerid(route.params.obid)
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



  {
    if (loading == true) {
      return (


        <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

      )
    }
    else {
      return (

        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
          <View>

            <View style={[styles.protop, { height: responsiveHeight(45), }]}>
              <View style={[styles.flatlistheader, { marginLeft: 0 }]}>
                <View style={[styles.headername, styles.spacebetween]}>

                  <View style={styles.flexstart}>

                    <View style={{ width: responsiveWidth(12) }}>
                      <TouchableOpacity onPress={() => navigation.goBack()}>


                        <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: responsiveWidth(65) }}>
                      <Text style={[styles.headernametext, { fontSize: responsiveFontSize(2.5), color: "#333232", fontFamily: "Regular" }]}>Profile</Text>
                    </View>

                  </View>

                  {/* <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]} onPress={() => {
          navigation.navigate("Add Measurment1", {
            id: id,
            obid: customerid
          })
        }}>
          <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
          <Text style={[styles.link,]}>Add Measurment</Text>
        </TouchableOpacity> */}

                  <View style={[styles.flexstart]}>
                    <TouchableOpacity style={[styles.headericon,]} onPress={() => {
                      navigation.navigate('Costomer Detail Edit', {
                        id: id,
                        obid: customerid
                      })
                    }}>
                      <Feather name="edit" size={24} color="#575555" />

                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(2) }]} onPress={alertvisible} >
                      <Feather name="trash-2" size={24} style={{ marginHorizontal: responsiveWidth(.5), }} color="#575555" />
                    </TouchableOpacity>

                  </View>
                </View>


              </View>


              {/* <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Image style={[styles.profilepic]} source={require('../assets/a1.png')} />
                  <Text style={[styles.titletext, { marginTop: responsiveHeight(2), marginBottom: responsiveHeight(1) }]}>{customer.cname}</Text>
                  <Text style={styles.desctext}>+91 {customer.cphone}</Text>
                </View>

              </View> */}

              <View style={{ marginHorizontal: responsiveWidth(8), marginTop: responsiveHeight(1) }}>
                <Text style={[styles.titletext, { marginBottom: responsiveHeight(1), fontSize: responsiveFontSize(4), color: "#333232", fontFamily: "Regular" }]}>{customer.cname} </Text>


                <View style={{ marginTop: responsiveHeight(2) }}>

                  <Text style={[styles.desctext, { color: "#333232", fontFamily: "Medium", fontSize: responsiveFontSize(2) }]}>Mobile Number</Text>
                  {

                    (customer.cphone === null) ?
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>No Number</Text>
                      </View>
                      :
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1), }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>+91 {customer.cphone}</Text>
                        <TouchableOpacity style={{ marginLeft: responsiveWidth(2) }} onPress={() => { Phone(customer.cphone) }}>
                          <Feather name="phone-call" size={18} color="#4a4a48" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3) }} onPress={() => { Whatsapp(customer.cphone) }}>

                          <FontAwesome name="whatsapp" size={18} color="#56BC1F" />
                        </TouchableOpacity>
                      </View>
                  }

                  {
                    (customer.optcphone === null) ?
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>No Number</Text>
                      </View>
                      :

                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>+91 {customer.optcphone}</Text>
                        <TouchableOpacity style={{ marginLeft: responsiveWidth(2) }} onPress={() => { Phone(customer.optcphone) }}>
                          <Feather name="phone-call" size={18} color="#4a4a48" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: responsiveWidth(3), marginRight: responsiveWidth(3) }} onPress={() => { Whatsapp(customer.optcphone) }}>

                          <FontAwesome name="whatsapp" size={18} color="#56BC1F" />
                        </TouchableOpacity>
                      </View>
                  }

                </View>

                <View style={{ marginTop: responsiveHeight(2) }}>
                  <Text style={[styles.desctext, { color: "#333232", fontFamily: "Medium", fontSize: responsiveFontSize(2) }]}>Email</Text>

                  {
                    (customer.cemail === '') ? <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                      <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>No Email</Text>
                    </View>
                      :
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>{customer.cemail}</Text>

                      </View>
                  }
                </View>


                <View style={{ marginTop: responsiveHeight(2) }}>
                  <Text style={[styles.desctext, { color: "#333232", fontFamily: "Medium", fontSize: responsiveFontSize(2) }]}>Address</Text>

                  {
                    (customer.caddress === '') ?
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>No Address</Text>
                      </View>
                      :
                      <View style={[styles.flexstart, { marginLeft: responsiveWidth(4), marginTop: responsiveHeight(1) }]}>
                        <Text style={[styles.desctext, { fontSize: responsiveFontSize(2), color: "#333232", fontFamily: "Regular" }]}>{customer.caddress}</Text>

                      </View>
                  }
                </View>


              </View>

            </View>
            <View style={{ marginHorizontal: responsiveWidth(10), marginTop: responsiveHeight(1.3) }}>
              <View style={{ borderWidth: .5, borderColor: "#d9d9d9", marginVertical: responsiveHeight(2) }}></View>

              <TouchableOpacity onPress={() => { navigation.navigate("Order") }}>

                <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                  <View style={styles.flexstart}>
                    <Text style={styles.proicon}>

                      <MaterialCommunityIcons name="clipboard-text" size={20} color="black" />
                    </Text>
                    <Text style={[styles.prolistfont, { color: "#333232", fontFamily: "Regular" }]}>{customer.cname} Orders</Text>
                  </View>
                  <Text><AntDesign name="right" size={16} color="black" /></Text>
                </View>
              </TouchableOpacity>


              <View style={{ borderWidth: .5, borderColor: "#d9d9d9", marginVertical: responsiveHeight(2) }}></View>



              <TouchableOpacity onPress={() => { navigation.navigate("Measure") }}>

                <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                  <View style={styles.flexstart}>
                    <Text style={styles.proicon}>
                      <Fontisto name="nav-icon-grid" size={20} color="black" />

                    </Text>
                    <Text style={[styles.prolistfont, { color: "#333232", fontFamily: "Regular" }]}>{customer.cname} Measurments</Text>
                  </View>
                  <Text><AntDesign name="right" size={16} color="black" /></Text>
                </View>
              </TouchableOpacity>


              <View style={{ borderWidth: .5, borderColor: "#d9d9d9", marginVertical: responsiveHeight(2) }}></View>

              <Modal animationType="slide"
                transparent visible={isalertvisible}
                presentationStyle="overFullScreen"
                onDismiss={alertvisible}>
                <View style={styles.viewWrapper}>
                  <View style={styles.modalView}>
                    <View style={styles.modelicon}>
                      <MaterialCommunityIcons name="delete-circle" size={65} color="#ff4444" />
                    </View>


                    <Text style={[styles.modelAlertlabel]}>Are you sure ?</Text>


                    <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Delete {customer.cname} ?</Text>


                    <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                      <View style={[styles.modelAlertbtn, { backgroundColor: "#fff", borderColor: "#ff4444", borderWidth: 1, marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                        <TouchableOpacity onPress={alertvisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: responsiveFontSize(2), color: "#000", fontWeight: "bold", }}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                        <TouchableOpacity onPress={Deletecustomer} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: responsiveFontSize(2), color: "#ffffff", fontWeight: "bold", }} >Delete</Text>
                        </TouchableOpacity>
                      </View>


                    </View>

                  </View>
                </View>
              </Modal>

              {/* <TouchableOpacity onPress={() => {
                navigation.navigate('Profile Info', {
                  id: id
                })
              }}>

                <View style={[styles.spacebetween, { marginVertical: responsiveHeight(2) }]}>
                  <View style={styles.flexstart}>
                    <Text style={styles.proicon}>

                      <MaterialCommunityIcons name="account" size={20} color="black" />
                    </Text>
                    <Text style={[styles.prolistfont,{color:"#333232",fontFamily:"Regular"}]}>{customer.cname} Profile</Text>
                  </View>
                  <Text><AntDesign name="right" size={16} color="black" /></Text>
                </View>
              </TouchableOpacity> */}






            </View>
          </View>


          {/* <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(5) }}>

            <TouchableOpacity style={[styles.onlybtn, { width: responsiveWidth(40), }]} onPress={() => {
              navigation.navigate('Costomer Detail Edit', {
                id: id,
                obid: customerid
              })
            }}>
              <View style={styles.flexstart}>
                <AntDesign name="close" size={18} style={{ fontWeight: "bold", top: responsiveHeight(.1), }} color="#fff" />
                <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Edit</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={Deletecustomer} style={[styles.onlybtn, { width: responsiveWidth(40), backgroundColor: "#B63F3F" }]}>
              <View style={styles.flexstart}>

                <Ionicons name="trash-outline" size={22} style={{ fontWeight: "bold", top: responsiveHeight(.3), }} color="#fff" />
                <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Delete</Text>
              </View>
            </TouchableOpacity>

          </View> */}
        </SafeAreaView>

      )

    }
  }
}

export default CostomerInfo




