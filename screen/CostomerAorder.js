import { Button,ActivityIndicator,SafeAreaView, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import SelectDropdown from 'react-native-select-dropdown'
import { styles } from './Style';


const CostomerAorder = ({ route }) => {

  const [loading, setloading] = useState(true);
  const [customer, setcustomer] = useState(Array);
  const [found, setfound] = useState('');
  const [id, setid] = useState('');
  const [customerid, setcustomerid] = useState('');
  const [Ordertype, setOrdertype] = useState('Active');

  const countries = ["Active", "Delivered",]

  const getdata = async () => {

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
        setcustomer(data[0].costomer[0].corder)
        setloading(false)
        // allorder.filter((e) => {
        //   if (e.status === "true")
        //   {
        //     setfound(1)
        //     return
        //   }
        // })

      }

    } catch (e) {
      console.log(e);
      window.alert(e)
      window.alert("failed")
    }
  }



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

  const navigation = useNavigation();

  {
    if (loading == true) {
      return (


        <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

      )
    }
    else {
      return (

        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={[styles.flatlistheader]}>
            <View style={[styles.headername,]}>
              <View>
                <Text style={styles.headernametext}>Orders</Text>
              </View>

             
            <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]}  onPress={() => {
                navigation.navigate("Add Order", {
                  id: id,
                  obid: customerid
                })
              }}>
              <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
              <Text style={[styles.link,]}>Add Order</Text>
            </TouchableOpacity>


              <View style={{ width: responsiveWidth(78), height: responsiveHeight(5), marginLeft: responsiveWidth(0), flexDirection: "row", alignItems: "center" }}>
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    setOrdertype(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // console.log(item)
                    return item
                  }}
                  defaultValue={"Active"}



                  buttonStyle={{ backgroundColor: "#fff", width: "41%", right: 0 }}
                  buttonTextStyle={{ fontSize: 14, color: "#56BC1F", fontWeight: "bold", textAlign: "center", }}
                  selectedRowTextStyle={{ fontSize: 14, fontWeight: "bold", color: "#56BC1F", opacity: 1 }}
                  dropdownStyle={{ marginTop: -10, borderRadius: 5, }}
                  rowTextStyle={{ fontSize: 14 }}

                  renderDropdownIcon={() => { return (<AntDesign name="down" size={14} color="black" />) }}
                />

              </View>
            </View>


          </View>

          {
            Ordertype === 'Active' ?
              
              <FlatList
                data={customer}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (item.status === "true") {
                    return (<>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate("Order Detail", {
                          id: id,
                          obid : "nofal",
                          orid: item._id,
                        })
                      }}>
                        <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), height: responsiveHeight(13), }]}>

                          <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>
                            <View>
                              <Image style={[styles.avtar, { borderRadius: 10, height: responsiveHeight(13), width: responsiveWidth(22) }]} source={require('../assets/jens.jpg')} />

                            </View>

                            <View style={[styles.flatlisttext, { marginTop: 5, width: '65%', }]}>

                              <Text style={[styles.titletext, { marginBottom: 2 }]}>{item.clothType}</Text>
                              <Text style={{ fontSize: 12 }}>Lorem ipsum dolor sit amet sfssdf  sit amet consectetur   </Text>

                              <View style={[styles.spacebetween, { alignItems: "flex-start", marginTop: 5 }]}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs.{item.prize}</Text>
                              </View>


                            </View>
                          </View>
                        </View>

                      </TouchableOpacity>

                    </>)

                  }
                }
                }
              />

              : <FlatList
                data={customer}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (item.status === "false") {
                    return (<>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate("Order Detail", {
                          id: id,
                          obid : "nofal",
                          orid: item._id
                        })
                      }} >
                        <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), height: responsiveHeight(13), }]}>

                          <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>
                            <View>
                              <Image style={[styles.avtar, { borderRadius: 10, height: responsiveHeight(13), width: responsiveWidth(22) }]} source={require('../assets/jens.jpg')} />

                            </View>

                            <View style={[styles.flatlisttext, { marginTop: 5, width: '65%' }]}>

                              <Text style={[styles.titletext, { marginBottom: 2 }]}>{item.clothType}</Text>
                              <Text style={{ fontSize: 12 }}>Lorem ipsum dolor sit amet sfssdf  sit amet consectetur   </Text>

                              <View style={[styles.spacebetween, { alignItems: "flex-start", marginTop: 5 }]}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs.{item.prize}</Text>
                              </View>


                            </View>
                          </View>
                        </View>

                      </TouchableOpacity>

                    </>)

                  }
                }
                }
              />
          }
        </SafeAreaView>










      )
    }
  }
}

export default CostomerAorder

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,

//   },
//   orderframe: {
//     marginVertical: 5,

//   },
//   ordercontainer: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderWidth: .9,
//     borderColor: "#777777",
//     borderRadius:10,
//     backgroundColor:"#f0f0f0",
//     marginVertical: 5,
   
//   },
//   orderHeading: {
//     fontSize: 20,
//     opacity: .8,
//     fontWeight: "bold",
//     paddingVertical: 5,
//     textTransform: "capitalize"
//   },
//   orderprize: {
//     fontSize: 15,
//     opacity:.6,
//     fontWeight: "400",
//     marginBottom: 3,
//     marginLeft: 3
//   },
//   orderTime: {
//     fontSize: 15,
//     opacity:.6,
//     fontWeight: "400",
//     marginBottom: 1,
//     marginLeft: 3
//   },
//   orderDesc: {
//     fontSize: 15,
//     opacity:.6,
//     fontWeight: "400",
//     marginBottom: 1,
//     marginLeft: 3,
//   },

//   containernew:
//   {
//     marginTop: 10,
//   }


// })