import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, Linking, SafeAreaView, Image, Alert, TextInput, Modal } from 'react-native'
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';


const Orderedit = ({ route }) => {
  const navigation = useNavigation()
  let custData;

  const mainid = route.params.id
  const objectid = route.params.obid
  const orid = route.params.orid

  let orderData = [];
  const [loading, setloading] = useState(true);
  const [customer, setcustomer] = useState(Array);
  const [order, setorder] = useState({});

  const [checked, setChecked] = useState('No');
  const [gender, setgender] = useState('male');
  const [specialNote, setspecialNote] = useState("");
  const [prize, setprize] = useState("");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [ddate, setddate] = useState('');
  const [dmonth, setdmonth] = useState('');
  const [dyear, setdyear] = useState('');

  const showPicker = () => {
    setIsPickerShow(true);
  };


  
 


  const [iscofirm, setiscofirm] = useState(false);


  const confirmbox = () => {
    setiscofirm(!iscofirm);
  };

  const Gohome = () => {
    
  const id = route.params.id
  const obid = route.params.obid
    confirmbox()
    
    navigation.navigate("Order Detail", {
      id: id,
      obid: obid,
      orid: orid,
    })

  }

  const onChange = (event, value) => {
    setDate(value);
    setddate(value.getDate())
    setdmonth(value.getMonth() + 1)
    setdyear(value.getFullYear())

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const getdata = async () => {


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

                if (orderData.prize === null) {
                  setprize(orderData.dvalue)
                }
                else {

                  let x = orderData.prize
                  let y = x.toString()
                  setprize(y)
                }


                setspecialNote(orderData.specialNote)
                setddate(orderData.deliveryDate)
                setdmonth(orderData.deliveryMonth)
                setdyear(orderData.deliveryYear)
                setChecked(orderData.orderUrgent)
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

              if (ele.prize === null) {
                setprize(ele.dvalue)
              }
              else {

                let x = ele.prize
                let y = x.toString()
                setprize(y)
              }
              setspecialNote(ele.specialNote)
              setddate(ele.deliveryDate)
              setdmonth(ele.deliveryMonth)
              setdyear(ele.deliveryYear)
              setChecked(ele.orderUrgent)
            }
          })



          setloading(false)
        }

      } catch (e) {
        window.alert("Something Went Wrong")
      }

    }


  }



  const Saveorder = async () => {

    try {
      const id = route.params.id
      const obid = customer._id
      const orid = order._id

      const res = await fetch(`https://aufcart.com/api/editorder/${id}/${obid}/${orid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prize, specialNote, ddate, dmonth, dyear, checked
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






        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>

          <ScrollView showsVerticalScrollIndicator={false}>




            <View style={[styles.headerwithline, { flexDirection: "row" }]} >

            <View style={{ width: responsiveWidth(12) }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>


                <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
              </TouchableOpacity>
            </View>
              <View style={{ width: responsiveWidth(80), }}>

                <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Order Edit Form</Text>
              </View>


            </View>
            <View style={styles.line70}></View>




            <View style={[styles.form, { marginTop: responsiveHeight(4) }]}>




              <View style={styles.inputfield}>
                <Text style={styles.label}>
                  Price
                </Text>

                <TextInput placeholder='Price' style={[styles.input, { borderRadius: responsiveWidth(2) }]} keyboardType='numeric' value={prize} onChangeText={e => setprize(e)}></TextInput>
              </View>

              <View style={styles.inputfield}>
                <Text style={styles.label}>
                  Special Note
                </Text>
                <TextInput placeholder='Special Note' value={specialNote} onChangeText={e => setspecialNote(e)} style={[styles.input, { borderRadius: responsiveWidth(2) }]} numberOfLines={3} textAlignVertical="top" multiline={true} />
              </View>


              <View style={styles.inputfield}>
                <Text style={styles.label}>
                  Delivery Date
                </Text>
                <View style={styles.datebox}>

                  <Text style={styles.inputdate}>{ddate}</Text>

                  <Text style={styles.inputdate}>{dmonth}</Text>
                  <Text style={styles.inputyear}>{dyear}</Text>



                  <View style={styles.datePicker}>
                    {!isPickerShow && (
                      <View style={styles.btnContainer}>
                        <FontAwesome5 name="calendar-alt" size={30} color="black" onPress={showPicker} />
                      </View>
                    )}

                    {isPickerShow && (
                      <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onChange}
                        style={styles.datePicker}
                      />
                    )}
                  </View>


                </View>
              </View>



              <View style={[styles.inputfield, { marginTop: responsiveHeight(2) }]}>
                <Text style={[styles.label, { top: responsiveHeight(.8) }]}>
                  Urgent Order
                </Text>

                <View style={{ display: "flex", flexDirection: "row", }}>
                  <RadioButton
                    value="Yes"
                    status={checked === 'Yes' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('Yes')}
                    color="#56BC1F"
                    uncheckedColor='#56BC1F'

                  />
                  <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>Yes</Text>

                  <View style={{ marginLeft: 10 }}>

                    <RadioButton
                      value="No"
                      status={checked === 'No' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('No')}
                      color="#56BC1F"
                      uncheckedColor='#56BC1F'

                    />
                  </View>
                  <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>No</Text>
                </View>
              </View>

            </View>

          </ScrollView>

          <TouchableOpacity style={[styles.onlybtn, { backgroundColor: "#56BC1F", marginHorizontal: responsiveWidth(7) }]} onPress={Saveorder}>
            <View style={styles.flexstart}>

              <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Save</Text>
            </View>
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


                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Order Detail Updated Successfully</Text>


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

export default Orderedit