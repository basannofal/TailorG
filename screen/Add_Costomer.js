import { ScrollView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Netinfo from './netinfo/Netinfo';

const Add_Costomer = ({ route }) => {
  const [checked, setChecked] = useState('male');
  const [cname, setcname] = useState("");
  const [cphone, setcphone] = useState("");
  const [optcphone, setoptcphone] = useState('');
  const [ccity, setccity] = useState("");
  const [caddress, setcaddress] = useState("");
  const [cemail, setcemail] = useState("");
  const [netinfo, setNetinfo] = useState(Boolean);
  const [tempcustomer, setTempcustomer] = useState([]);


  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };






  const id = route.params.id

  const [data, setdata] = useState('');

  const navigation = useNavigation()

  const postdata = async () => {

    // 63064232cf92b07e37090e0a
    toggleModalVisibility()
    if (!netinfo) {
      let duplidata = await AsyncStorage.getItem('addCustomer')
      let dacust = [];
      dacust = JSON.parse(duplidata)
      console.log(dacust);

      let arr = {
        'cname': cname,
        'cphone': cphone,
        'optcphone': optcphone,
        'cemail': cemail,
        'caddress': caddress,
        'ccity': ccity,
        'gen': checked
      };
      if (dacust == null) {
        dacust = [arr]
      }
      else {
        dacust.push(arr);
      }
      await AsyncStorage.setItem('addCustomer', JSON.stringify(dacust))
    } else {

      try {
        // const data = { cname, cphone, ccity, caddress, cemail, checked }

        const res = await fetch(`https://aufcart.com/api/Newcustomer/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cname, cphone, optcphone, ccity, caddress, cemail, checked
          })
        })

        const data = await res.json();

        if (!data) {
        }
        else {
          await AsyncStorage.setItem('alldata', JSON.stringify(data))
          setdata(data);
          navigation.navigate("Home", {
            _id: id
          })
        }


      } catch (e) {
        window.alert("SomeThing Went Wrong")
      }
    }

  }

  const checkPredata = async () => {

    let dacust = JSON.parse(await AsyncStorage.getItem('addCustomer'));
    console.log(dacust.length);
    if (dacust != null) {

      while (dacust.length > 0) {
        console.log(")))))))))) RE<O((((((((((((");
        setcname(dacust[0].cname);
        setcphone(dacust[0].cphone);
        setoptcphone(dacust[0].optcphone);
        setcemail(dacust[0].cemail);
        setcaddress(dacust[0].caddress);
        setChecked(dacust[0].gen);
        setccity(dacust[0].ccity);



        dacust.splice(0, 1)



        // console.log(dacust);
        console.log(")))))))))) upper((((((((((((");

        await AsyncStorage.setItem('addCustomer', JSON.stringify(dacust))

      }
      console.log("over");
    }
  }

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      Netinfo().then(res => {
        setNetinfo(res);
        if (res) {
          checkPredata()
        }
      })
    });
    return focusHandler;
  }, [route]);
  return (






    <ScrollView style={{ backgroundColor: "#fff", }} showsVerticalScrollIndicator={false}>


      <Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <View style={styles.modelicon}>

              <AntDesign name="questioncircle" size={55} color="#f0aa02" />
            </View>


            <Text style={[styles.modelAlertlabel]}>{cname}</Text>


            <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Are you sure ?</Text>


            <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
              <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                <TouchableOpacity onPress={postdata} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Add</Text>
                </TouchableOpacity>
              </View>


            </View>

          </View>
        </View>
      </Modal>


      <View style={[styles.headerwithline, { flexDirection: "row", }]}>

        <View style={{ width: responsiveWidth(12) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>


            <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
          </TouchableOpacity>
        </View>
        <View style={{ width: responsiveWidth(80), }}>

          <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Add New Customer</Text>
        </View>


      </View>


      <View style={styles.line70}></View>

      <View style={[styles.form, { marginTop: responsiveHeight(4) }]}>
        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Customer Name
          </Text>
          <TextInput placeholder='Customer Name' style={[styles.input, { borderRadius: responsiveWidth(2) }]} value={cname} onChangeText={e => setcname(e)} />
        </View>


        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Mobile Number 1
          </Text>
          <TextInput placeholder='Mobile Number 1' style={[styles.input, { borderRadius: responsiveWidth(2) }]} maxLength={10} keyboardType='numeric' value={cphone} onChangeText={e => setcphone(e)} />
        </View>

        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Mobile Number 2 (optional)
          </Text>
          <TextInput placeholder='Mobile Number 2' style={[styles.input, { borderRadius: responsiveWidth(2) }]} maxLength={10} keyboardType='numeric' value={optcphone} onChangeText={e => setoptcphone(e)} />
        </View>


        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput placeholder='Email' style={[styles.input, { borderRadius: responsiveWidth(2) }]} value={cemail} onChangeText={e => setcemail(e)} />
        </View>


        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Address
          </Text>
          <TextInput placeholder='Address' style={[styles.input, { borderRadius: responsiveWidth(2) }]} numberOfLines={3} textAlignVertical="top" multiline={true} value={caddress} onChangeText={e => setcaddress(e)} />
        </View>


        <View style={{ display: "flex", flexDirection: "row", paddingVertical: 20 }}>
          <RadioButton
            value="male"
            status={checked === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('male')}
            color="#56BC1F"
            uncheckedColor='#56BC1F'

          />
          <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>Male</Text>

          <View style={{ marginLeft: 10 }}>

            <RadioButton
              value="female"
              status={checked === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('female')}
              color="#56BC1F"
              uncheckedColor='#56BC1F'

            />
          </View>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>Female</Text>
        </View>



        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Pincode
          </Text>
          <TextInput placeholder='Pincode' style={[styles.input, { borderRadius: responsiveWidth(2) }]} value={ccity} keyboardType='numeric' maxLength={6} onChangeText={e => setccity(e)} />
        </View>


      </View>
      <View style={[{ marginTop: responsiveHeight(3) },]}>

        {
          cname === '' ?
            <TouchableOpacity style={[styles.onlybtn, { marginBottom: responsiveHeight(5), opacity: .5 }]} disabled>
              <Text style={styles.onlybtntext}>Add</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.onlybtn, { marginBottom: responsiveHeight(5) }]} onPress={toggleModalVisibility}>
              <Text style={styles.onlybtntext}>Add</Text>
            </TouchableOpacity>



        }

      </View>

    </ScrollView>

  )
}

export default Add_Costomer

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     marginTop: 30,
//   },
//   form: {
//     marginTop: 20,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   input: {
//     paddingVertical: 15,
//     fontSize: 16,
//     borderWidth: .5,
//     borderColor: "#666666",
//     paddingHorizontal: 15,
//     marginVertical: 8,
//     borderRadius: 10,

//   },
//   btngroup: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     width: "100%"
//   },
//   btntext: {
//     textAlign: "center",
//     fontSize: 20,
//     color: "#ffffff",

//   },
//   btn: {
//     width: "100%",
//     backgroundColor: "#866ee1",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#777777",
//     borderRadius: 10,

//   }
// })



// <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

// <Text style={[styles.heading, { color: "#866ee1", opacity: 1 }]}>Wellcome, <Text style={[styles.heading, { color: "#666666", }]}> New Costomer </Text></Text>
// <View style={styles.form}>
//   <TextInput placeholder='Costomer Name' style={styles.input} value={cname} onChangeText={e => setcname(e)}></TextInput>
//   <TextInput placeholder='Costomer Contact Number' style={styles.input} keyboardType='numeric' value={cphone} onChangeText={e => setcphone(e)}></TextInput>
//   <TextInput placeholder='Costomer City' style={styles.input} value={ccity} onChangeText={e => setccity(e)}></TextInput>
//   <TextInput placeholder='Costomer Address' style={styles.input} value={caddress} onChangeText={e => setcaddress(e)}></TextInput>
//   <TextInput placeholder='Costomer Email' style={styles.input} value={cemail} onChangeText={e => setcemail(e)}></TextInput>



//   <View style={{ display: "flex", flexDirection: "row", paddingVertical: 20 }}>
//     <Text style={{ textAlign: "center", marginTop: 6, opacity: .5, fontSize: 18, marginLeft: 5 }}>Male</Text>
//     <RadioButton
//       value="male"
//       status={checked === 'male' ? 'checked' : 'unchecked'}
//       onPress={() => setChecked('male')}
//     />
//     <Text style={{ textAlign: "center", marginTop: 6, opacity: .5, fontSize: 18, marginLeft: 20 }}>Female</Text>
//     <RadioButton
//       value="female"
//       status={checked === 'female' ? 'checked' : 'unchecked'}
//       onPress={() => setChecked('female')}
//     />
//   </View>

// </View>

// <View style={styles.btngroup}>
//   <TouchableOpacity onPress={postdata} style={styles.btn}>
//     <Text style={styles.btntext}> Add Costomer</Text>
//   </TouchableOpacity>
// </View>

// </ScrollView>