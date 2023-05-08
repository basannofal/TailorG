import { ActivityIndicator, SafeAreaView, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { styles } from './Style';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const ActiveOrder = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setloading] = useState(true);
  const [order, setorder] = useState(Array);
  const [allorder, setallorder] = useState([]);
  const [Ordertype, setOrdertype] = useState('Active');

  const countries = ["Active", "Delivered",]



  const id = route.params._id


  const getdata = async () => {
    let neworderarr = [];

    try {
      const res = await fetch(`https://aufcart.com/api/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const data = await res.json();
      if (!data) {
      }
      else {
        setorder(data.costomer)
        let allurorder = [];
        allurorder = data.costomer;
        allurorder.map((e) => {
          const arraobj = e.corder
          for (let i = 0; i < arraobj.length; i++) {
            neworderarr = [...neworderarr, arraobj[i]]
          }
        })

        setallorder(neworderarr)
        setloading(false)


      }

    } catch (e) {
      window.alert("SomeThing Went Wrong")
    }
  }



  const header = () => {


    return (
      <>



        <View style={[styles.flatlistheader,]}>
          <View style={[styles.headername,]}>
            <View>
              <Text style={styles.headernametext}>Orders</Text>
            </View>

            {/* 
            <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(5) }]} onPress={() => {
              navigation.navigate("Add Costomer", {
                id: id
              })
            }} >
              <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
              <Text style={[styles.link,]}>Add Order</Text>
            </TouchableOpacity> */}


            <View style={{ width: responsiveWidth(78), height: responsiveHeight(5), marginLeft: responsiveWidth(28), flexDirection: "row", alignItems: "center" }}>
              <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                  setOrdertype(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
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
      </>
    )
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
          <View style={[styles.flatlistheader]}>
            <View style={[styles.headername,]}>
              <View>
                <Text style={styles.headernametext}>Orders</Text>
              </View>

              
            <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]} onPress={() => {
              navigation.navigate("Customers", {
                id: id
              })
            }} >
              <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
              <Text style={[styles.link,]}>Add Order</Text>
            </TouchableOpacity>


              <View style={{ width: responsiveWidth(78), height: responsiveHeight(5), flexDirection: "row", alignItems: "center", }}>
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    setOrdertype(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
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
                data={allorder}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (item.status === "true") {
                    return (<>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate("Order Detail", {
                          id: id,
                          orid: item._id,
                        })
                      }}>
                        <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), height: responsiveHeight(13), }]}>

                          <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start",  }]}>
                            <View>
                              <Image style={[styles.avtar, { borderRadius: 10, height: responsiveHeight(13), width: responsiveWidth(22) }]} source={require('../assets/jens.jpg')} />

                            </View>

                            <View style={[styles.flatlisttext, { marginTop: 5, width: '65%', }]}>

                              <Text style={[styles.titletext, { marginBottom: 2 }]}>{item.clothType}</Text>
                              <Text style={{ fontSize: 12 }}>Lorem ipsum dolor sit amet sfssdf  sit amet consectetur   </Text>

                              <View style={[styles.spacebetween, { alignItems: "flex-start", marginTop: 5 }]}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs.{ item.prize === null ? item.dvalue :  item.prize}</Text>
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
                data={allorder}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  if (item.status === "false") {
                    return (<>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate("Order Detail", {
                          id: id,
                          orid: item._id
                        })
                      }} >
                        <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), height: responsiveHeight(13), }]}>

                          <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start",  }]}>
                            <View>
                              <Image style={[styles.avtar, { borderRadius: 10, height: responsiveHeight(13), width: responsiveWidth(22) }]} source={require('../assets/jens.jpg')} />

                            </View>

                            <View style={[styles.flatlisttext, { marginTop: 5, width: '65%' }]}>

                              <Text style={[styles.titletext, { marginBottom: 2 }]}>{item.clothType}</Text>
                              <Text style={{ fontSize: 12 }}>Lorem ipsum dolor sit amet sfssdf  sit amet consectetur   </Text>

                              <View style={[styles.spacebetween, { alignItems: "flex-start", marginTop: 5 }]}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs.{ item.prize === null ? item.dvalue :  item.prize}</Text>
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

export default ActiveOrder

{/* <View style={styles.container}>
<FlatList
  data={allorder}
  keyExtractor={item => item._id}
  inverted
  renderItem={({ item }) => {
    if (item.status === "true") {
      return (
        <TouchableOpacity onPress={() => {
          navigation.navigate("Order Detail", {
            id: id,
            orid: item._id
          })
        }}>
          <View style={styles.ordercontainer}>
            <Text style={styles.orderHeading}>{item.clothType}</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <FontAwesome name="rupee" size={16} color="black" style={{ opacity: .6, paddingHorizontal: 5 }} />
              <Text style={styles.orderprize}>{item.prize}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <MaterialCommunityIcons name="list-status" size={16} color="black" style={{ opacity: .6, paddingHorizontal: 2 }} />
              <Text style={styles.orderDesc}>{item.status === 'true' ? "Order Recived" : "Order Delevered"}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <EvilIcons name="clock" size={16} color="black" style={{ paddingHorizontal: 2 }} />
              <Text style={styles.orderTime}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    else {


    }

  }
  }
/>
</View> */}




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
//     borderRadius: 10,
//     backgroundColor: "#f0f0f0",
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
//     opacity: .6,
//     fontWeight: "400",
//     marginBottom: 3,
//     marginLeft: 3
//   },
//   orderTime: {
//     fontSize: 15,
//     opacity: .6,
//     fontWeight: "400",
//     marginBottom: 1,
//     marginLeft: 3
//   },
//   orderDesc: {
//     fontSize: 15,
//     opacity: .6,
//     fontWeight: "400",
//     marginBottom: 1,
//     marginLeft: 3,
//   },

//   containernew:
//   {
//     marginTop: 10,
//   }


// })