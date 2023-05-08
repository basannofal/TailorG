import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, Linking, SafeAreaView, Image, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Entypo } from '@expo/vector-icons';
import { styles } from './Style';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const OrderDetail = ({ route }) => {

  const navigation = useNavigation()
  let custData;

  const phoneNumber = 9427628497

  const check = "deliver"


  // const Contact = () => {

  //   Linking.openURL(`tel: ${customer.cphone}`)
  // }
  // const WhatsApp = () => {
  //   Linking.openURL(`whatsapp://send?text=&phone=${customer.cphone}`)

  // }

  const mainid = route.params.id
  const objectid = route.params.obid
  const orid = route.params.orid

  let customerData = [];
  let orderData = [];
  const [loading, setloading] = useState(true);
  const [customer, setcustomer] = useState(Array);
  const [order, setorder] = useState({});
  const [status, setstatus] = useState('');
  const getdata = async () => {


    // try {
    //   const mainid =  route.params.id
    //   const objectid = route.params.obid
    //   const orid = route.params.orid
    //   const res = await fetch(`https://aufcart.com/api/getuser/${mainid}/${objectid}/${orid}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //   })

    //   const data = await res.json();
    //   if (!data) {
    //     window.alert('error in get data')
    //   }
    //   else {
    //     //  setcustomer(data[0].costomer[0].corder)
    //   }

    // } catch (e) {
    //   window.alert("Something Went Wrong")
    // }
    const mainid = route.params.id
    const objectid = route.params.obid
    const orid = route.params.orid

    if (objectid == undefined) {
      try {

        const res = await fetch(`https://aufcart.com/api/getuser/${mainid}`, {
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
          custData = data.costomer

          custData.filter((e) => {
            let allorderid = e.corder
            for (let i = 0; i < allorderid.length; i++) {

              if (allorderid[i]._id == orid) {
                setcustomer(e);
                orderData = allorderid[i]
                setorder(orderData)
              }

            }

          })
          setloading(false)
        }

      } catch (e) {
        window.alert("Something Went Wrong")
      }
    }
    else {
      try {


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
          custData = data[0].costomer[0]
          setcustomer(custData)
          let custoArr = data[0].costomer[0].corder

          custoArr.filter((ele) => {
            if (ele._id == orid) {
              setorder(ele)
            }
          })


          setloading(false)
        }

      } catch (e) {
        window.alert("Something Went Wrong")
      }

    }


  }


  const DeleteOrder = async () => {
    try {
      const mainid = route.params.id
      const objectid = route.params.obid
      const orid = route.params.orid

      const res = await fetch(`https://aufcart.com/api/orderdelete/${mainid}/${orid}`, {
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
        deletevisible()
        navigation.navigate("Order", {
          id: mainid,
          obid: route.params.obid
        })
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }








  const [isdelete, setisdelete] = useState(false);


  const deletevisible = () => {
    setisdelete(!isdelete);
  };




  const [isalertvisible, setisalertvisible] = useState(false);


  const alertvisible = () => {
    setisalertvisible(!isalertvisible);
  };




  const confirmDelivered = async () => {
    try {
      var x;

      if (order.status === "true") {
        x = false
      }
      else {
        x = true
      }



      const mainid = route.params.id
      const objectid = customer._id
      const orid = route.params.orid
      const res = await fetch(`https://aufcart.com/api/editStatus/${mainid}/${objectid}/${orid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          x
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        alertvisible()
        getdata()
      }



    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }


  useEffect(() => {

    getdata();

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






        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>

          <ScrollView showsVerticalScrollIndicator={false}>


            <Modal animationType="slide"
              transparent visible={isdelete}
              presentationStyle="overFullScreen"
              onDismiss={deletevisible}>
              <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                  <View style={styles.modelicon}>
                    <MaterialCommunityIcons name="delete-circle" size={65} color="#ff4444" />
                  </View>


                  <Text style={[styles.modelAlertlabel]}>Are you sure ?</Text>


                  <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Delete {customer.cname} ?</Text>


                  <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                    <View style={[styles.modelAlertbtn, { backgroundColor: "#fff", borderColor: "#ff4444", borderWidth: 1, marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                      <TouchableOpacity onPress={deletevisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#000", fontWeight: "bold", }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                      <TouchableOpacity onPress={DeleteOrder} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Delete</Text>
                      </TouchableOpacity>
                    </View>


                  </View>

                </View>
              </View>
            </Modal>



            <Modal animationType="slide"
              transparent visible={isalertvisible}
              presentationStyle="overFullScreen"
              onDismiss={alertvisible}>
              <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                  <View style={styles.modelicon}>

                    <AntDesign name="questioncircle" size={55} color="#f0aa02" />
                  </View>

                  {
                    order.status === 'true' ?
                      <>

                        <Text style={[styles.modelAlertlabel]}>{order.clothType}</Text>


                        <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Are you want to deliver ?</Text>
                      </>

                      :
                      <>

                        <Text style={[styles.modelAlertlabel]}>{order.clothType}</Text>


                        <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Getting back order ?</Text>
                      </>

                  }

                  <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                      <TouchableOpacity onPress={alertvisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                      <TouchableOpacity onPress={confirmDelivered} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                      </TouchableOpacity>
                    </View>


                  </View>

                </View>
              </View>
            </Modal>

            <View style={{ display: "flex", }}>
              <Image style={[styles.orderphoto]} source={require('../assets/order.png')} />
              <TouchableOpacity onPress={() => {
                navigation.navigate("Edit Order", {
                  id: mainid,
                  obid: objectid,
                  orid: orid
                })
              }} style={{ bottom: responsiveHeight(44), left: responsiveWidth(88), paddingTop: responsiveWidth(2), paddingBottom: responsiveWidth(3.5), paddingHorizontal: responsiveWidth(4), backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", borderBottomLeftRadius: responsiveWidth(10), position: "absolute" }}>
                <FontAwesome name="edit" size={24} color="#575555" />
              </TouchableOpacity>


              <TouchableOpacity onPress={() => navigation.goBack()}
               style={{ bottom: responsiveHeight(45), left:responsiveWidth(2), padding:responsiveWidth(1), backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: responsiveWidth(10), position: "absolute" }}>
                <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", }} />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: responsiveWidth(6), marginTop: responsiveHeight(2) }}>
            <View style={styles.spacebetween}>

              <View style={styles.flexstart}>
                <Entypo name="shopping-cart" size={16} color="#56BC1F" />
                <Text style={[styles.link, { marginHorizontal: responsiveWidth(1) }]}>Order</Text>
              </View>
              <TouchableOpacity style={[styles.flexstart]} onPress={() => navigation.navigate("Order Measurment",{
                id : route.params.id,
                obid : customer._id,
                mid : order.mid
              })}>
              <MaterialCommunityIcons name="eye" size={20} style={{marginHorizontal:responsiveWidth(1)}} color="#56BC1F" />
              <Text style={styles.link}>View Measurment</Text>
              </TouchableOpacity>
            </View>

              <View style={{ paddingVertical: responsiveHeight(1) }}>
                <Text style={[styles.headingtext, { color: "#000" }]}>{order.clothType}</Text>
                <Text>{order.specialNote}</Text>
              </View>

              <View>
                <Text style={[styles.titletext, { fontSize: responsiveFontSize(2.3) }]}>Customer Detail</Text>

                <View style={{ marginHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(1) }}>

                  <View style={[styles.flexstart,]}>
                    <Ionicons name="person" size={14} color="black" />
                    <Text style={{ marginHorizontal: responsiveWidth(2) }}>{customer.cname}</Text>
                  </View>

                  <View style={[styles.flexstart, { marginTop: responsiveHeight(.6) }]}>
                    <FontAwesome5 name="phone-alt" size={14} color="black" />
                    <Text style={{ marginHorizontal: responsiveWidth(2) }}>{customer.cphone}</Text>
                  </View>

                  <View style={[styles.flexstart, { marginTop: responsiveHeight(.6) }]}>
                    <MaterialIcons name="location-on" size={14} color="black" />
                    <Text style={{ marginHorizontal: responsiveWidth(2) }}>{customer.caddress}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.line90, { marginVertical: responsiveHeight(.8) }]}></View>

              <View style={[styles.flexstart, { marginHorizontal: responsiveWidth(2) }]}>
                <FontAwesome name="rupee" size={20} color="black" style={{ top: responsiveHeight(.3) }} />
                <Text style={[styles.titletext, { marginHorizontal: responsiveWidth(1) }]}>{order.prize === null ? order.dvalue : order.prize}</Text>
              </View>
            </View>


          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5) }}>

            <TouchableOpacity style={[styles.onlybtn, { width: responsiveWidth(40), backgroundColor: "#B63F3F" }]} onPress={deletevisible}>
              <View style={styles.flexstart}>
                <AntDesign name="close" size={18} style={{ fontWeight: "bold", top: responsiveHeight(.1), }} color="#fff" />
                <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Delete</Text>
              </View>
            </TouchableOpacity>


            {
              order.status === "true" ?
                <TouchableOpacity onPress={alertvisible} style={[styles.onlybtn, { backgroundColor: "#fbff12", width: responsiveWidth(40) }]}>
                  <View style={styles.flexstart}>
                    <Feather name="check" size={18} style={{ fontWeight: "bold", top: responsiveHeight(.3), }} color="#000" />
                    <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1), color: "#000" }]}>Deliver</Text>
                  </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={alertvisible} style={[styles.onlybtn, { width: responsiveWidth(40) }]}>
                  <View style={styles.flexstart}>

                    <Ionicons name="checkmark-done-circle" size={22} style={{ fontWeight: "bold", top: responsiveHeight(.3), }} color="#fff" />
                    <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Delivered</Text>
                  </View>
                </TouchableOpacity>
            }
          </View>



        </SafeAreaView>

      )

    }

  }
}

export default OrderDetail
