import { ActivityIndicator, Button, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const MeasurmentImage = () => {


    const [id, setid] = useState('');
    // const [gender, setgender] = useState('');
    // const [clothname, setclothname] = useState('');
    // const [data, setdata] = useState('');
    // const [customer, setcustomer] = useState([]);
    // const [dvalue, setdvalue] = useState('');






    const icon = [
        {
            id: 1,
            url: "shirt.png"
        },
        {
            id: 2,
            url: "shirt1.png"
        },
        {
            id: 3,
            url: "pent.png"
        },
        {
            id: 4,
            url: "pent1.png"
        },
        {
            id: 5,
            url: "kurta.png"
        },
        {
            id: 6,
            url: "kurta1.png"
        },
    ]

    useEffect(() => {
        setid(route.params.id)
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
                    gender, clothname, newArray, dvalue
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



    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>

            <View style={[styles.headerwithline, { flexDirection: "row", paddingBottom: responsiveHeight(2) }]} >
        
                <View style={{ width: responsiveWidth(12) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>


                        <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: responsiveWidth(80), }}>

                    <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Select Cloth Type</Text>
                </View>

                <TouchableOpacity onPress={toggleModalVisibility} >
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>

            </View>




            <FlatList
                data={icon}
                keyExtractor={(item, index) => item.id}
                numColumns={2}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => handleonpress(item)}>
                            <View style={[styles.Checkbox, { borderColor: item.selected ? "#56BC1F" : "black", borderWidth: item.selected ? 2 : 0.5 }]}>
                                <Text style={styles.checkboxname}>{item.name}</Text>
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




    

        </SafeAreaView>

    )
}

export default MeasurmentImage