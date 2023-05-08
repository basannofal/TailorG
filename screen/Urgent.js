import { ActivityIndicator, ScrollView, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, View, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Urgent = ({ route }) => {

  const navigation = useNavigation();

  const [loading, setloading] = useState(true);
  const [order, setorder] = useState(Array);
  const [allorder, setallorder] = useState([]);
  const [check, setcheck] = useState('');

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
        
        // allorder.filter((e) => {
        //   if (e.orderUrgent === "Yes" && e.status === "true")
        //   {
        //     setcheck(1)
        //     return
        //   }
        // })
        setloading(false)
        
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }


  const header = () => {


    return (
      <>



        <View style={[styles.flatlistheader,]}>
          <View style={styles.headername}>
            <View>
              <Text style={styles.headernametext}>Urgent Order</Text>
            </View>
          </View>


        </View>
      </>
    )
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
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={[styles.flatlistheader,]}>
            <View style={styles.headername}>
              <View>
                <Text style={styles.headernametext}>Urgent Order</Text>
              </View>
            </View>


          </View>
       
        
            <FlatList
            data={allorder}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}

            renderItem={({ item }) => {
              if (item.orderUrgent === "Yes" && item.status === "true") {
                return (<>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate("Order Detail", {
                      id: id,
                      orid: item._id
                    })
                  }}>
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
          

       {/* <TouchableOpacity onPress={() => navigation.navigate("Onbording1")}>
          </TouchableOpacity>

          <Button title='Onbording1' onPress={() => navigation.navigate("Onbording1")}>
          </Button>


          <Button title='Extra' onPress={() => navigation.navigate("extra")}>


          </Button> */}

        </SafeAreaView>
      )
    }
  }
}

export default Urgent











// <View style={styles.container}>
// <FlatList
//   data={allorder}
//   keyExtractor={item => item._id}
//   inverted
//   renderItem={({ item }) => {
//     if (item.orderUrgent === "Yes") {
//       return (
//         <TouchableOpacity onPress={() => {
//           navigation.navigate("Order Detail", {
//             id: id,
//             orid: item._id
//           })
//         }}>
//           <View style={styles.ordercontainer}>
//             <Text style={styles.orderHeading}>{item.clothType}</Text>
//             <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
//               <FontAwesome name="rupee" size={16} color="black" style={{ opacity: .6, paddingHorizontal: 5 }} />
//               <Text style={styles.orderprize}>{item.prize}</Text>
//             </View>
//             <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
//               <MaterialCommunityIcons name="list-status" size={16} color="black" style={{ opacity: .6, paddingHorizontal: 2 }} />
//               <Text style={styles.orderDesc}>{item.status === 'true' ? "Order Recived" : "Order Delevered"}</Text>
//             </View>

//             <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
//               <EvilIcons name="clock" size={16} color="black" style={{ paddingHorizontal: 2 }} />
//               <Text style={styles.orderTime}>{item.deliveryDate === '' ? "" : `${item.deliveryDate}/${item.deliveryMonth}/${item.deliveryYear}`}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )
//     }
//     else {


//     }

//   }
//   }
// />

// <TouchableOpacity onPress={() => navigation.navigate("Onbording1")}>
//   <Text>HEllo </Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => navigation.navigate("Onbording1")}>
// </TouchableOpacity>

// <Button title='Onbording1' onPress={() => navigation.navigate("Onbording1")}>
// </Button>

//   <Text>HEllo </Text>

//   <Button title='Extra' onPress={() => navigation.navigate("extra")}>


//   </Button>
// </View>
// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginTop: 20,
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