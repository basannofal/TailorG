import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DeliveredOrder = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setloading] = useState(true);
  const [order, setorder] = useState(Array);
  const [allorder, setallorder] = useState([]);


  const id = route.params.id


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
        window.alert('error in get data')
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
      window.alert("Something Went Wrong")
    }
  }


  useEffect(() => {
      getdata();
  }, [])

  {
    if (loading == true) {
      return (


        <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

      )
    }
    else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <FlatList
              data={allorder}
              keyExtractor={item => item._id}
              inverted
              renderItem={({ item }) => {
                if (item.status === "true") {
               
                }
                else {
                  return (
                    <TouchableOpacity onPress={() => { navigation.navigate("Order Detail") }}>
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

              }
              }
            />
          </View>
        </ScrollView>
      )
    }
  }
}

export default DeliveredOrder

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,

  },
  orderframe: {
    marginVertical: 5,

  },
  ordercontainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: .9,
    borderColor: "#777777",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,

  },
  orderHeading: {
    fontSize: 20,
    opacity: .8,
    fontWeight: "bold",
    paddingVertical: 5,
    textTransform: "capitalize"
  },
  orderprize: {
    fontSize: 15,
    opacity: .6,
    fontWeight: "400",
    marginBottom: 3,
    marginLeft: 3
  },
  orderTime: {
    fontSize: 15,
    opacity: .6,
    fontWeight: "400",
    marginBottom: 1,
    marginLeft: 3
  },
  orderDesc: {
    fontSize: 15,
    opacity: .6,
    fontWeight: "400",
    marginBottom: 1,
    marginLeft: 3,
  },

  containernew:
  {
    marginTop: 10,
  }


})