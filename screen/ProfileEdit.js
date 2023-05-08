import { FlatList, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Modal, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';

const ProfileEdit = ({ route }) => {

  const [sname, setsname] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');






  const [iscofirm, setiscofirm] = useState(false);


  const confirmbox = () => {
    setiscofirm(!iscofirm);
  };

  const Gohome = () => {
    confirmbox()
    navigation.navigate("Home")

  }



  const ProfileSave = async () => {

    try {

      const res = await fetch(`https://aufcart.com/api/editProfil/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sname, name, phone, email
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
      window.alert("Something Went Wrong")
    }
  }



  const id = route.params.id




  const navigation = useNavigation();

  const [data, setdata] = useState('');
  const [loading, setloading] = useState(true);

  const getdata = async () => {

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
        setdata(data)
        setsname(data.sname);
        setname(data.name);
        setphone(data.phone)
        setemail(data.email);
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

          <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, height: responsiveHeight(100) }}>

            <View style={[styles.flatlistheader, { marginLeft: 0 }]}>
              <View style={[styles.headername, styles.spacebetween]}>
                <View style={styles.flexstart}>

                  <View style={{ width: responsiveWidth(12) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>


                      <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={[styles.headernametext, { fontFamily: "Regular" }]}>Profile Edit</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.headericon} onPress={() => {
                  navigation.navigate('Profile Info', {
                    id: id
                  })
                }}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>

              </View>

            </View>

            <View style={{ paddingHorizontal: responsiveWidth(8), marginTop: responsiveHeight(2) }}>
              <View style={{ paddingTop: responsiveHeight(3) }}>
                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Name </Text>
                <View style={[styles.flexstart,]}>
                  <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Feather name="user" size={24} color="black" /></Text>

                  <View style={{ width: responsiveWidth(70) }}>
                    <TextInput style={{ color: "#000", borderWidth: 1, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(4), borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={name} onChangeText={e => setname(e)} />
                  </View>
                </View>
              </View>

              <View style={{ paddingTop: responsiveHeight(3) }}>
                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Email </Text>
                <View style={[styles.flexstart,]}>
                  <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Fontisto name="email" size={24} color="black" /></Text>

                  <View style={{ width: responsiveWidth(70) }}>
                    <TextInput style={{ color: "#000", borderWidth: 1, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(4), borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={email} onChangeText={e => setemail(e)} />
                  </View>
                </View>
              </View>


              <View style={{ paddingTop: responsiveHeight(3) }}>
                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Shop Name </Text>
                <View style={[styles.flexstart,]}>
                  <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><MaterialIcons name="storefront" size={24} color="black" /></Text>

                  <View style={{ width: responsiveWidth(70) }}>
                    <TextInput style={{ color: "#000", borderWidth: 1, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(4), borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={sname} onChangeText={e => setsname(e)} />
                  </View>
                </View>
              </View>


              <View style={{ paddingTop: responsiveHeight(3) }}>
                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Phone </Text>
                <View style={[styles.flexstart,]}>
                  <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Feather name="phone-call" size={24} color="black" /></Text>

                  <View style={{ width: responsiveWidth(70) }}>
                    <TextInput style={{ color: "#000", borderWidth: 1, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(4), borderRadius: responsiveWidth(2), marginTop: responsiveHeight(1), borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={`${phone}`} onChangeText={e => setphone(e)} keyboardType={'numeric'} />
                  </View>
                </View>
              </View>




            </View>

            <TouchableOpacity style={[styles.onlybtn, { marginTop: responsiveHeight(5) }]} onPress={() => { ProfileSave() }}   >
              <Text style={styles.onlybtntext}>Save</Text>
            </TouchableOpacity>


          </SafeAreaView>


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


                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Profile Successfully Updated</Text>


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

        </ScrollView>
      )
    }
  }

}

export default ProfileEdit

// const styles = StyleSheet.create({
//   mainview: {
//     borderTopWidth: 0,
//     borderWidth: 0,paddingVertical:responsiveHeight(1),paddingHorizontal:responsiveWidth(4), borderRadius:responsiveWidth(2),marginTop:responsiveHeight(1),
//     borderWidth: .5,
//     borderColor: "#515354",
//     backgroundColor: "#ece9ff"
//   },
//   list: {
//     marginTop: 20
//   },



//   btn: {
//     backgroundColor: "#ece9ff",
//     borderRadius: 5,
//     padding: 10,
//     width: 250,
//     borderWidth: 1,
//     borderColor: "#999999",
//     marginVertical: 10,
//     borderTopWidth: 0,
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

//   inputlabel: {
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

// <View style={styles.mainview}>
// <View style={{ backgroundColor: "#ece9ff", height: 200, }}>
//   <View style={{ display: "flex", top: 10, flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <Ionicons name="person-circle-sharp" size={104} color="#866ee1" style={{}} />
//     <Text style={{ textAlign: "center", top: 0, fontSize: 24, fontWeight: "bold" }}>{sname}</Text>
//   </View>
// </View>


// <View style={[styles.info, { paddingTop: 50 }]}>


//   <Text style={styles.inputlabel}>Shop Name</Text>
//   <TextInput value={sname} onChangeText={e => setsname(e)} style={styles.input} />


//   <Text style={styles.inputlabel}>Name</Text>
//   <TextInput value={name} onChangeText={e => setname(e)} style={styles.input} />


//   <Text style={styles.inputlabel}>Phone</Text>
//   <TextInput value={`${phone}`} onChangeText={e => setphone(e)} keyboardType={'numeric'} style={styles.input} />

//   <Text style={styles.inputlabel}>Email</Text>
//   <TextInput value={email} onChangeText={e => setemail(e)} style={styles.input} />





//   <View style={styles.btngroup}>




//     <TouchableOpacity style={styles.btn} onPress={() => { ProfileSave() }}>

//       <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", letterSpacing: 1, opacity: .7 }}> Save </Text>
//     </TouchableOpacity>


//   </View>


// </View>
// </View>