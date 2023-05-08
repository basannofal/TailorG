import { ActivityIndicator, Button, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const EditCustoMeasure = ({ route }) => {
  const [customer, setcustomer] = useState(Array);
  const [id, setid] = useState('');
  const [customerid, setcustomerid] = useState('');
  const [neak, setneak] = useState([]);
  const [loading, setloading] = useState(true);
  const [inputs, setInputs] = useState([]);
  const [clmesurement, setclmesurement] = useState('');
  const [impnote, setimpnote] = useState('');

  const obid = route.params.obid
  const mid = route.params.mid


  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    setInputs(_inputs);
  }




  const Save = async () => {
    try {
      const id = route.params.id
      const obid = route.params.obid
      const mid = route.params.mid

      const res = await fetch(`https://aufcart.com/api/editmeasurment/${id}/${obid}/${mid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs, clmesurement, impnote
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        confirmbox()
      }




    } catch (e) {
      window.alert("Something went Wrong")
    }

  }
  const getdata = async () => {

    try {
      const mainid = route.params.id
      const objectid = route.params.obid
      const mid = route.params.mid
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

        setInputs(route.params.temphooks);


        let measurmentarray = [Array]

        measurmentarray = data[0].costomer[0].cmeasure

        measurmentarray.filter((e) => {
          if (e._id === mid) {
            setneak(e.neak)
            setcustomer(e)
            setclmesurement(e.clmesurement)
            setimpnote(e.impnote)
          }
        })

        setloading(false)


      }

    } catch (e) {
      window.alert("Something went Wrong")
    }
  }





  const [iscofirm, setiscofirm] = useState(false);


  const confirmbox = () => {
    setiscofirm(!iscofirm);
  };

  const Gohome = () => {
    confirmbox()
    navigation.navigate("Measurement Detail", {
      id: id,
      obid: obid,
      mid: mid,
      sctdata: route.params.sctdata
    })
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={[styles.flatlistheader, { marginLeft: 0 }]}>
              <View style={[styles.headername, styles.spacebetween]}>



                <View style={styles.flexstart}>

                  <View style={{ width: responsiveWidth(12) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>


                      <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.headernametext}>{customer.clmesurement}</Text>
                    <Text style={{ fontSize: responsiveFontSize(2) }}>{customer.clothtype}</Text>
                  </View>
                </View>



              </View>


            </View>

            {/* <FlatList
            data={neak}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {



              return (<>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5), marginVertical: responsiveHeight(3) }}>
                  <Text style={[styles.modellabel, { color: "#000", opacity: 1, width: responsiveWidth(30) }]}>{item.name}</Text>

                  <TextInput style={[styles.input, { width: responsiveWidth(30), textAlign: "center" }]} keyboardType='numeric' editable={false} placeholderTextColor="#000" placeholder={item.value}  ></TextInput>
                </View>

              </>)

            }
            }
          /> */}



            <View style={{ marginHorizontal: responsiveWidth(8) }}>

              <Text style={styles.label}>New Measurment Name</Text>
              <TextInput style={[styles.input, { borderRadius: responsiveWidth(2), }]} placeholder="New Measurment Name" value={clmesurement} onChangeText={e => setclmesurement(e)} />

            </View>
            {
              inputs.map((e, i) => {
                return (

                  <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5), marginVertical: responsiveHeight(3) }} key={i}>
                    <Text style={[styles.modellabel, { color: "#000", opacity: 1, width: responsiveWidth(30) }]}>{e.name}</Text>
                    <TextInput style={[styles.input, { width: responsiveWidth(30), textAlign: "center" }]} keyboardType='numeric' value={e.value} onChangeText={(text) => inputHandler(text, i)}></TextInput>
                  </View>
                )

              })
            }

            <View style={[styles.inputfield, { marginTop: responsiveHeight(2), marginHorizontal: responsiveWidth(10) }]}>
              <Text style={[styles.label, { marginLeft: responsiveWidth(1.3) }]}>
                Special Note
              </Text>
              <TextInput placeholder='Special Note' value={impnote} onChangeText={e => setimpnote(e)} style={[styles.input, { borderRadius: responsiveWidth(2) }]} numberOfLines={3} textAlignVertical="top" multiline={true} />
            </View>

            <TouchableOpacity style={[styles.onlybtn, { backgroundColor: "#56BC1F", marginTop: responsiveHeight(3), }]} onPress={Save}  >
              <Text style={styles.onlybtntext}>Save</Text>
            </TouchableOpacity>





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


                  <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Measurment Updated Successfully</Text>


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
        </ScrollView>

      )

    }
  }
}

export default EditCustoMeasure