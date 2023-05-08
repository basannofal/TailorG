import { FlatList, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Authcontext } from '../context/Context'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './Style';
import { MaterialIcons } from '@expo/vector-icons';

const CostomerInfoEdit = ({ route }) => {



  const [iscofirm, setiscofirm] = useState(false);


  const confirmbox = () => {
    setiscofirm(!iscofirm);
  };

  const Gohome = () => {
    confirmbox()

    navigation.navigate("Detail", {
      id: id,
      obid: obid
    })

  }


  const [cname, setcname] = useState('');
  const [ccity, setccity] = useState('');
  const [cphone, setcphone] = useState('');
  const [caddress, setcaddress] = useState('');
  const [cemail, setcemail] = useState('');
  const [optcphone, setoptcphone] = useState('');



  const ProfileSave = async () => {

    try {

      const res = await fetch(`https://aufcart.com/api/editProfil/${id}/${obid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cname, ccity, cphone, optcphone, cemail, caddress
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        setdata(data2);
        Gohome()
      }


    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }


  


  const id = route.params.id
  const obid = route.params.obid




  const navigation = useNavigation();

  const [data, setdata] = useState('');
  const [loading, setloading] = useState(true);

  const getdata = async () => {

    try {
      const res = await fetch(`https://aufcart.com/api/getuser/${id}/${obid}`, {
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
        setdata(data)
        cname, ccity, cphone, caddress, cemail
        setcname(data[0].costomer[0].cname);
        setccity(data[0].costomer[0].ccity);
        setcphone(data[0].costomer[0].cphone)
        setoptcphone(data[0].costomer[0].optcphone)
        setcemail(data[0].costomer[0].cemail);
        setcaddress(data[0].costomer[0].caddress);
        setloading(false)
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
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
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{backgroundColor:"#e4e4e4"}}>
            <View style={{ backgroundColor: "#e4e4e4", height: responsiveHeight(28), }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
               style={{  padding:responsiveWidth(4),paddingTop:responsiveHeight(2), position:"absolute",  }}>
                <MaterialIcons name="arrow-back" size={23} color="black" />
              </TouchableOpacity>
              <View style={{ display: "flex", top: 10, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="person-circle-sharp" size={104} color="#56BC1F" style={{}} />
                <Text style={{ textAlign: "center", top: 0, fontSize: 24, fontWeight: "bold" }}>{cname}</Text>
              </View>
            </View>


            <View style={[styles.container, {paddingHorizontal:responsiveWidth(7), paddingTop: responsiveHeight(3), borderTopLeftRadius: 50,
    borderTopRightRadius: 50, }]}>


              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer Name</Text>
              <TextInput value={cname} onChangeText={e => setcname(e)} style={styles.input} />


              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer City</Text>
              <TextInput value={ccity} onChangeText={e => setccity(e)} style={styles.input} />


              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer Phone 1</Text>
              <TextInput maxLength={10} value={`${cphone}`} onChangeText={e => setcphone(e)} keyboardType={'numeric'} style={styles.input} />

              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer Phone 2</Text>
              <TextInput maxLength={10} value={`${optcphone}`} onChangeText={e => setoptcphone(e)} keyboardType={'numeric'} style={styles.input} />


              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer Email</Text>
              <TextInput value={cemail} onChangeText={e => setcemail(e)} style={styles.input} />

              <Text style={[styles.label,{marginTop:responsiveHeight(2)}]}>Customer Address</Text>
              <TextInput value={caddress} onChangeText={e => setcaddress(e)} style={styles.input} />


          <TouchableOpacity style={[styles.onlybtn, { backgroundColor: "#56BC1F", marginHorizontal: responsiveWidth(7), marginTop:responsiveHeight(2) }]} onPress={confirmbox}>
            <View style={styles.flexstart}> 
                      
              <Text style={[styles.onlybtntext, { marginHorizontal: responsiveWidth(1) }]}>Save</Text>
            </View>
          </TouchableOpacity>

            </View>
          </View>



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


                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Customer Profile Updated Successfully</Text>


                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: responsiveWidth(20), marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5), }}>


                  <View style={[styles.modelAlertbtn, { paddingVertical: 10 }]}>
                    <TouchableOpacity onPress={ProfileSave} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Go Home</Text>
                    </TouchableOpacity>
                  </View>


                </View>

              </View>
            </View>
          </Modal>






        </ScrollView>
      )
    }
  }

}

export default CostomerInfoEdit

// const styles = StyleSheet.create({
//   mainview: {
//     borderTopWidth: 0,
//     borderBottomWidth: 0,
//     borderWidth: .5,
//     borderColor: "#515354",
//     backgroundColor: "#e4e4e4"
//   },
//   list: {
//     marginTop: 20
//   },



//   btn: {
//     backgroundColor: "#56BC1F",
//     borderRadius: 5,
//     padding: 10,
//     width: responsiveWidth(90),
//     borderWidth: 1,
//     borderColor: "#999999",
//     marginVertical: 10,
//     borderTopWidth: 0,
//     color: "#fff"
//   },
//   btngroup: {
//     marginTop: 30,
//     marginBottom: 10,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   info: {
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     backgroundColor: "white",

//   },

//  .label: {
//     fontSize: 20,
//     opacity: .8,
//     textAlign: "left",
//     marginLeft: "5%",
//     marginTop: 5
//   },


//   input: {
//     width: "90%",
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderColor: "rgba(0, 0, 0, 0.2)",
//     borderWidth: 1,
//     marginBottom: 8,
//     marginLeft: "5%",
//     marginTop: 10,
//     fontSize: 18,
//     opacity: .8
//   },



// })