import { Button, ActivityIndicator, Modal, TextInput, SafeAreaView, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './Style';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const CostomerMeasure = ({ route }) => {

  const [customer, setcustomer] = useState(Array);
  const [order, setorder] = useState(Array);
  const [id, setid] = useState('');
  const [customerid, setcustomerid] = useState('');
  const [loading, setloading] = useState(true);
  const [sct, setsct] = useState([]);
  const [Ordertype, setOrdertype] = useState('');
  const [imgurl, setImgurl] = useState('');

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
        setcustomer(data[0].costomer[0].cmeasure)

        setloading(false)
      }

    } catch (e) {
      window.alert("Something Went wrong")

    }
  }


  const Dropdowndata = async () => {

    try {
      const mainid = await route.params.id
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
        setsct(data.ctype)

      }

    } catch (e) {
      window.alert("Something Went wrong")
    }
  }
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [clothname, setclothname] = useState("");

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };




  const navigation = useNavigation()




  const Savecloth = () => {
    toggleModalVisibility()

    let temp = []
    sct.filter((e) => {
      if (e.clname === Ordertype) {
        temp = e.cltype
      }
    })



    const _inputs = [];

    temp.map((e, i) => {
      _inputs.push({ name: e.cltpartname, value: '' });

    })

    navigation.navigate("Add Measurment", {
      id: id,
      obid: customerid,
      otype: Ordertype,
      temp: temp,
      temphooks: _inputs,
      onlymeasurment: "onlymeasurment",
      imgurl: imgurl
    })
  }
  useEffect(() => {
    setid(route.params.id)
    setcustomerid(route.params.obid)
    getdata();
    Dropdowndata()

    const focusHandler = navigation.addListener('focus', () => {
      setid(route.params.id)
      setcustomerid(route.params.obid)
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
          <View style={[styles.flatlistheader, { marginLeft: 0 }]}>
            <View style={[styles.headername,]}>

              <View style={styles.flexstart}>

                <View style={{ width: responsiveWidth(12) }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>


                    <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.headernametext}>Measurment</Text>
                </View>

              </View>

              <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]} onPress={toggleModalVisibility} >
                <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
                <Text style={[styles.link,]}>Add</Text>
              </TouchableOpacity>


              <Modal animationType="slide"
                transparent visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                  <View style={styles.modalView}>
                    <Text style={[styles.modellabel, { marginBottom: responsiveHeight(2) }]}>Select Cloth Type</Text>

                    <SelectDropdown
                      data={sct}
                      onSelect={(selectedItem, index) => {
                        setOrdertype(selectedItem.clname)
                        setImgurl(selectedItem.imgurl)
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.clname
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.clname
                      }} defaultButtonText={"Select Cloth Type"}



                      buttonStyle={{ width: responsiveWidth(70), marginHorizontal: responsiveWidth(5), borderRadius: 5, backgroundColor: "#f5f5f5", }}
                      buttonTextStyle={{ fontSize: 18, color: "#b3b3b3", fontWeight: "bold", textAlign: "center", }}
                      selectedRowTextStyle={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", opacity: 1 }}
                      dropdownStyle={{ borderRadius: 5, }}
                      selectedRowStyle={{ backgroundColor: "#56BC1F" }}
                      rowTextStyle={{ fontWeight: "bold", fontSize: 18, opacity: .6 }}


                      renderDropdownIcon={() => { return (<AntDesign name="down" size={14} color="black" />) }}
                    />



                    <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                      <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                        <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                        <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                        </TouchableOpacity>
                      </View>


                    </View>


                    {/* <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: 30, marginBottom: 20 }}>
                      <View style={[styles.modelbtn, { backgroundColor: "#ff4444", marginRight: 20, paddingVertical: 10 }]}>
                        <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={[ styles.modelbtn, { marginLeft: 20, paddingVertical: 10 }]}> 
                        <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                        </TouchableOpacity>
                      </View>


                    </View> */}

                  </View>
                </View>
              </Modal>


            </View>


          </View>
          {
            customer != '' ?

              <FlatList
                data={customer}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {

                  let url = `../assets/measurmentImage/${item.imgurl}`


                  return (<>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("Measurement Detail", {
                        id: id,
                        obid: customerid,
                        mid: item._id,
                        sctdata: sct
                      })
                    }}>




                      <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), height: responsiveHeight(10), }]}>

                        <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", }]}>

                          <View style={[styles.flatlisttext, { marginTop: 5, width: '65%', }]}>

                            <Text style={[styles.titletext, { marginBottom: 2 }]}>{item.clmesurement}</Text>
                            <Text style={{ fontSize: 12 }}>{item.clothtype}  </Text>
                            {
                              item.date == '' ? <Text></Text> : <View style={[styles.flexstart, { paddingVertical: responsiveHeight(.4) }]}>
                                <Ionicons name="time-outline" size={14} color="black" style={{ top: responsiveHeight(.3), paddingRight: responsiveWidth(1) }} />
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.date}</Text>
                              </View>

                            }
                          </View>
                          <View>

                            {
                              item.imgurl === '' || item.imgurl === undefined ?
                                <Image style={[styles.avtar, { borderRadius: 5, height: responsiveHeight(10), width: responsiveWidth(21) }]} source={require('../assets/measurmentImage/noimg.png')} />
                                :
                                <Image style={[styles.avtar, { borderRadius: 5, height: responsiveHeight(10), width: responsiveWidth(21) }]} source={{ uri: url}} />
                            }
                          </View>
                        </View>
                      </View>




                    </TouchableOpacity>





                  </>)

                }
                }
              />
              :
              <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: responsiveHeight(70) }}>
                <Text style={{ fontSize: responsiveFontSize(4), opacity: .4, fontFamily: "Regular" }}>No Measurment Found</Text>
                <TouchableOpacity style={{ width: responsiveWidth(74) }} onPress={toggleModalVisibility}>
                  <Text style={[{ textAlign: "center", marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), borderRadius: 10, padding: responsiveHeight(1), color: "#fff", fontFamily: "Regular", backgroundColor: "#56BC1F", }]}>Add Measurment </Text>
                </TouchableOpacity>
              </View>
          }






        </SafeAreaView>










      )
    }
  }
}

export default CostomerMeasure


{/* <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
    <View style={{marginVertical:0, marginTop:15}}>
        
          <Button
            title="Add Measurment"
            onPress={() => {
              navigation.navigate("Add Measurment1", {
                id: id,
                obid: customerid
              })
            }}
          />
        </View>

    <FlatList
          data={customer}
          keyExtractor={item => item._id}
          inverted
          renderItem={({ item }) =>
          <View style={styles.orderframe}>
        <TouchableOpacity onPress={() => {navigation.navigate("Measurement Detail", {
          id : id,
          obid : customerid,
          mid : item._id
        })}}>
          <View style={styles.ordercontainer}>
            <Text style={styles.orderHeading}>{item.clmesurement} </Text>
            <Text style={[styles.orderHeading, {fontSize:16, opacity:.5}]}>{item.clothtype} </Text>

           
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <EvilIcons name="clock" size={16} color="black" style={{paddingHorizontal:2}} />
              <Text style={styles.orderTime}>20/03/2022</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
          }
        />

    </View>
  </ScrollView> */}