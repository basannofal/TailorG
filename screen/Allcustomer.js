import { ActivityIndicator, SafeAreaView, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CostomerInfo from './CostomerInfo';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './Style';
import { useFonts } from 'expo-font/build/FontHooks';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const Allcustomer = ({ route }) => {
    const id = route.params.id



    const navigation = useNavigation();

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    const [filterdata, setfilterdata] = useState([]);
    const [search, setsearch] = useState('');

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
                setdata(data.costomer)
                setfilterdata(data.costomer)
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



    const [Fontloaded] = useFonts({
        'Medium': require('./Font/Roboto-Medium.ttf'),
        'Bold': require('./Font/Roboto-Bold.ttf'),
        'Regular': require('./Font/Roboto-Regular.ttf'),
    })
    if (!Fontloaded) {
        return null
    }




    const searchdata = (text) => {

        if (text) {
            const newdata = data.filter((item) => {
                const itemdata = item.cname ? item.cname.toUpperCase()
                    : ''.toUpperCase();
                const textdata = text.toUpperCase();
                return itemdata.indexOf(textdata) > -1;
            })

            setfilterdata(newdata);
            setsearch(text);
        }
        else {
            setfilterdata(data);
            setsearch(text);
        }
    }





    {
        if (loading == true) {

            return (


                <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

            )
        }
        else {


            return (
                <>
                    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>



                        <View style={[styles.flatlistheader]}>
                            <View style={styles.headername}>
                                <View>
                                    <Text style={[styles.headernametext, { fontFamily: "Regular" }]}>Select Customer</Text>
                                </View>


                                <TouchableOpacity style={styles.headericon} onPress={() => {
                                    navigation.navigate("Add Costomer", {
                                        id: id
                                    })
                                }} >
                                    <AntDesign name="plus" size={20} color="black" />
                                    <Text style={[styles.link, { paddingHorizontal: responsiveWidth(1), fontFamily: "Regular" }]}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput style={[styles.input, { marginTop: responsiveHeight(2.5), marginHorizontal: responsiveWidth(2), borderRadius: 5, fontFamily: "Regular" }]} onChangeText={(e) => searchdata(e)} value={search} placeholder="Search Customer" underlineColorAndroid="transparent" />

                        </View>


                        <FlatList
                            data={filterdata}
                            keyExtractor={item => item._id}
                            // inverted
                            showsVerticalScrollIndicator={false}

                            renderItem={({ item }) =>
                            (

                                <TouchableOpacity style={[styles.flatlistcontainer, styles.spacebetween,{ marginTop:0, paddingVertical:responsiveHeight(.5)}]} onPress={() => {
                                    navigation.navigate('Costomer Detail', {
                                        id: id,
                                        obid: item._id
                                    }),
                                        setsearch('')
                                }} >
                                    <View style={styles.flexstart}>


                                        <Image style={[styles.avtar, { width: responsiveWidth(12), height: responsiveWidth(12), marginLeft:responsiveWidth(3) }]} source={require('../assets/14.png')} />

                                        <View style={[styles.flatlisttext,{marginLeft:responsiveWidth(5)}]}>

                                            <Text style={[styles.titletext, { fontFamily: "Regular" }]}> {item.cname} </Text>
                                            <View style={[styles.flexstart, { marginTop: 2 }]}>
                                                <Ionicons name="location" size={14} color="black" />
                                                <Text style={{ fontFamily: "Regular", fontSize: responsiveFontSize(1.5) }}> {item.caddress} </Text>
                                            </View>


                                        </View>

                                    </View>

                                    {/* <View style={[styles.flatlistbtn, styles.flexstart]}>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                      navigation.navigate("Costomer Order", {
                        id: id,
                        obid: item._id

                      }),
                        setsearch('')
                    }}>
                    <MaterialIcons name="shopping-cart" size={26} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn,{marginLeft:responsiveWidth(5)}]} onPress={() => {
                      navigation.navigate("Measurements", {
                        id: id,
                        obid: item._id

                      }),
                        setsearch('')
                    }}>
                    <Ionicons name="md-speedometer" size={26} color="black" />                    
                    </TouchableOpacity>
                    

                  </View> */}




                                </TouchableOpacity>
                            )
                            }
                        />

                    </SafeAreaView>



                </>
            )
        }
    }

}

export default Allcustomer