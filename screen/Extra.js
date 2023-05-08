import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Entypo } from '@expo/vector-icons';


const Extra = ({ route }) => {
  const countries = ["Active", "Delivered",]


  const id = '63064232cf92b07e37090e0a'

  const navigation = useNavigation();


  const [ddate, setddate] = useState('');
  const [dmonth, setdmonth] = useState('');
  const [dyear, setdyear] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  const [gender, setgender] = useState('male');
  const [urgent, seturgent] = useState('Yes');


  const [isPickerShow, setIsPickerShow] = useState(false);

  const [checked, setChecked] = useState('Old');
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);


  // This is to manage TextInput State
  const [clothname, setclothname] = useState("");

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const Savecloth = () => {
    navigation.navigate("Choose Measurment", {
      clothname: clothname,
      gender: gender,
      id: id,
      obid: customerid
    })
  }

  const [Ordertype, setOrdertype] = useState('');


  const getdata = async () => {

    try {
      let x = await Network.getIpAddressAsync();
      const res = await fetch(`http://192.168.43.220:8000/getuser/${id}`, {
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
        setdata(data.costomer)
        setloading(false)
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setddate(value.getDate())
    setdmonth(value.getMonth() + 1)
    setdyear(value.getFullYear())

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };


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
          <View style={[styles.flatlistheader]}>
            <View style={[styles.headername,]}>
              <View>
                <Text style={styles.headernametext}>Cloth Type</Text>
              </View>


              <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]} onPress={() => {
                navigation.navigate("Add Measurment1", {
                  id: id,
                  obid: customerid
                })
              }}>
                <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
                <Text style={[styles.link,]}>Add</Text>
              </TouchableOpacity>


            </View>


          </View>

          <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), }]}>


            <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>


              <View style={[styles.flatlisttext, styles.spacebetween, { marginTop: 5, width: '90%', }]}>

                <View style={[{ paddingVertical: responsiveHeight(1) }]}>
                  <View style={styles.spacebetween}>
                    <View style={{width:responsiveWidth(70)}}>

                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Pathani</Text>
                      <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>male</Text>
                    </View>

                    <TouchableOpacity>

                    <View style={{width:responsiveWidth(20)}}>
                    
                    <FontAwesome name="trash-o" size={24} color="#B63F3F" />
                    </View>
                    </TouchableOpacity>

                  </View>
                </View>



              </View>
            </View>

          </View>



        </SafeAreaView>




      )
    }
  }


}

export default Extra






