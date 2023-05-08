import { ActivityIndicator, Button, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Choose_Measurment = ({ route }) => {

  const [gender, setgender] = useState('');
  const [clothname, setclothname] = useState('');
  const [id, setid] = useState('');
  const [data, setdata] = useState('');
  const [customer, setcustomer] = useState([]);
  const [dvalue, setdvalue] = useState('');
  const [imgmeasurment, setImgmeasurment] = useState('');
  const [loading, setloading] = useState(true);






  const [iscofirm, setiscofirm] = useState(false);


  const confirmbox = () => {
    setiscofirm(!iscofirm);
  };

  const Gohome = () => {
    confirmbox()

    if (where === "cameOrder") {
      navigation.navigate("Add Order", {
        id: id,
        obid: route.params.obid
      })
    }
    else {
      navigation.navigate("Cloth Type", {
        id: id
      })
    }

  }



  const [isalertvisible, setisalertvisible] = useState(false);


  const alertvisible = () => {
    setisalertvisible(!isalertvisible);
  };


  const navigation = useNavigation()





  const getdata = async () => {

    try {
      const mainid = route.params.id
      const objectid = route.params.obid
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

        setselect(data.cltpart);
        setloading(false)


      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }


  const [select, setselect] = useState([]);
  const [measure, setmeasure] = useState({});
  const [customerid, setcustomerid] = useState('');
  const [cltpartname, setcltpartname] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [where, setwhere] = useState('');




  useEffect(() => {
    setid(route.params.id)
    setgender(route.params.gender)
    setclothname(route.params.clothname)
    setcustomerid(route.params.obid)
    setwhere(route.params.cameOrder)
    setdvalue(route.params.dvalue)
    setImgmeasurment(route.params.imgmeasurment)
    getdata();

  }, [])

  const handleonpress = (item) => {
    const newitem = select.map((val) => {
      const date = Date.now()
      const stringdate = date.toString()
      if (val._id === item._id) {
        val = { ...val, id: stringdate }
        return { ...val, selected: !val.selected }
      }
      else {
        return val;
      }
    })
    setselect(newitem)
  }

  const Submit = async () => {
    alertvisible()
    let newArray = select.filter((val, i) => {
      if (val.selected) {
        return val.cltpartname;
      }
    })

    try {

      const res = await fetch(`https://aufcart.com/api/Addnewclothtype/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gender, clothname, newArray, dvalue, imgmeasurment
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        setdata(data2);

        confirmbox()


      }


    } catch (e) {
      console.log(e);
      window.alert("Something Went Wrong")
    }




  }


  const Addclothtypepart = async () => {
    try {
      setloading(true)
      const res = await fetch(`https://aufcart.com/api/Addnewclothtypepart/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cltpartname
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        setdata(data2);
        toggleModalVisibility()
        setcltpartname('')
        getdata()
        setloading(false)
      }


    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }


  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const header = () => {
    return (
      <TouchableOpacity style={{ flexDirection: "row", justifyContent: "flex-end", marginHorizontal: responsiveWidth(8), alignItems: "center", marginVertical: responsiveHeight(1) }} onPress={() => { navigation.navigate("Cloth Type Part", { id: id }) }}>

        <AntDesign name="setting" style={{ marginHorizontal: responsiveWidth(1), }} size={12} color="#56BC1F" />
        <Text style={styles.link}>Manage</Text>
      </TouchableOpacity>
    )
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

          <View style={[styles.headerwithline, { flexDirection: "row", paddingBottom: responsiveHeight(2) }]} >

            <View style={{ width: responsiveWidth(12) }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>


                <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: responsiveWidth(75), }}>

              <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Select Cloths Type</Text>
            </View>

            <TouchableOpacity onPress={toggleModalVisibility} >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>

            <Modal animationType="slide"
              transparent visible={isModalVisible}
              presentationStyle="overFullScreen"
              onDismiss={toggleModalVisibility}>
              <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                  <Text style={styles.modellabel}>Measurment Name</Text>
                  <TextInput placeholder="Measurment Name"
                    value={cltpartname} style={styles.modalinput}
                    onChangeText={(value) => setcltpartname(value)} />


                  <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                      <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                      <TouchableOpacity onPress={Addclothtypepart} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                      </TouchableOpacity>
                    </View>


                  </View>



                </View>
              </View>
            </Modal>


          </View>




          <FlatList
            data={select}
            keyExtractor={(item, index) => item._id}
            numColumns={2}
            scrollEnabled
            ListHeaderComponent={header}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleonpress(item)}>
                  <View style={[styles.Checkbox, { borderColor: item.selected ? "#56BC1F" : "black", borderWidth: item.selected ? 2 : 0.5 }]}>
                    <Text style={styles.checkboxname}>{item.cltpartname}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />








          <View style={[{ marginTop: responsiveHeight(3) },]}>
            <TouchableOpacity style={styles.onlybtn} onPress={alertvisible} >
              <Text style={styles.onlybtntext}>Add</Text>
            </TouchableOpacity>
          </View>





          <Modal animationType="slide"
            transparent
            visible={isalertvisible}
            presentationStyle="overFullScreen"
            onDismiss={alertvisible}>
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <View style={styles.modelicon}>

                  <AntDesign name="questioncircle" size={55} color="#f0aa02" />
                </View>


                <Text style={[styles.modelAlertlabel]}>{clothname}</Text>


                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Are you sure ?</Text>


                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                  <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                    <TouchableOpacity onPress={alertvisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                    <TouchableOpacity onPress={Submit} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                    </TouchableOpacity>
                  </View>


                </View>

              </View>
            </View>
          </Modal>




          <Modal animationType="slide"
            transparent visible={iscofirm}
            presentationStyle="overFullScreen"
            onDismiss={confirmbox}>
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <View style={styles.modelicon}>


                  <AntDesign name="checkcircle" size={55} color="#56BC1F" />
                </View>


                <Text style={[styles.modelAlertlabel]}>Congratulations</Text>


                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>New Dress Type Added</Text>


                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: responsiveWidth(20), marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5), }}>


                  <View style={[styles.modelAlertbtn, { paddingVertical: 10 }]}>
                    <TouchableOpacity onPress={Gohome} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Go Home</Text>
                    </TouchableOpacity>
                  </View>


                </View>

              </View>
            </View>
          </Modal>




        </SafeAreaView>




      )
    }
  }

}

export default Choose_Measurment

// const styles = StyleSheet.create({
//   checkboxcontainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   checkbox: {
//     padding: 30,
//     width: 149,
//     height: 149,
//     marginVertical: 10,
//     marginHorizontal: 10,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//     opacity: .6
//   },
//   btn: {
//     paddingVertical: 15,
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: .7,
//     borderColor: "#777777",
//     marginVertical: 10,
//     marginHorizontal: 10,
//     borderRadius: 3,
//     backgroundColor: "#866ee1"
//   },
//   btnText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     opacity: .9,
//     color: "#ffffff"
//   }
// })