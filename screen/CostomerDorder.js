import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CostomerDorder = ({ route }) => {
  const [customer, setcustomer] = useState(Array);
  const [order, setorder] = useState(Array);
  const [id, setid] = useState('');
  const [customerid, setcustomerid] = useState('');

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
        // console.log(customer);
        console.log('data goted by api');
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

  }, [])

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>


        <FlatList
          data={customer}
          keyExtractor={item => item._id}
          inverted
          renderItem={({ item }) => {
            if(item.status === 'true') {
            }
            else{
              return(
              <TouchableOpacity onPress={() => { navigation.navigate("Order Detail", {
                id: id,
                obid: customerid,
                orid: item._id
              }) }}>
                <View style={styles.ordercontainer}>
                  <Text style={styles.orderHeading}>{item.clothType}</Text>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <FontAwesome name="rupee" size={16} color="black" style={{ paddingHorizontal: 5 }} />
                    <Text style={styles.orderprize}>{item.prize}</Text>
                  </View>

                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <MaterialCommunityIcons name="list-status" size={16} color="black" style={{ paddingHorizontal: 2 }} />
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

export default CostomerDorder

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
    borderRadius: 2,
    marginVertical: 5
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
    fontWeight: "400",
    marginBottom: 3,
    marginLeft: 3
  },
  orderTime: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 1,
    marginLeft: 3
  },
  orderDesc: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 1,
    marginLeft: 3
  }
})