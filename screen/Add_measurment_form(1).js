import { ScrollView, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import { styles } from './Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const Add_measurment_form1 = ({ route }) => {

    const [clothtype, setclothtype] = useState('');
    const [clmesurement, setclmesurement] = useState('');
    const [neak, setneak] = useState('');
    const [id, setid] = useState('');
    const [customerid, setcustomerid] = useState('');
    const [sct, setsct] = useState('');
    const [data, setdata] = useState('');
    const [Ordertype, setOrdertype] = useState('');
    const [inputs, setInputs] = useState([]);
    const [loading, setloading] = useState(true);
    const [data2, setdata2] = useState([]);


    let newdata = [];
    let alldataavailable = []
    const getdata = async () => {

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
                window.alert("Data Not Gotted")
            }
            else {
                setsct(data.ctype)
                getPartdata()


            }

        } catch (e) {
            window.alert("Something went wrong")
        }
    }



    const getPartdata = async () => {

        try {
            const idi = route.params.id

            const res = await fetch(`https://aufcart.com/api/getuser/${idi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();

            if (!data) {
                window.alert("Data Not Gotted")
            }
            else {
                let alldata = []
                newdata = data.ctype
                newdata.filter((e) => {
                    if (e.clname === Ordertype) {
                        alldata = e.cltype
                        setdata2(e.cltype)
                    }
                })

                addHandler()
                setloading(false)

            }

        } catch (e) {
            window.alert("Something went wrong")
        }
    }


    const addHandler = () => {

        const _inputs = [...inputs];

        data2.map((e, i) => {
            _inputs.push({ name: e.cltpartname, value: '' });

        })
        setInputs(_inputs);


    }


    const inputHandler = (text, key) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        setInputs(_inputs);

    }

    useEffect(() => {
        setid(route.params.id)
        setcustomerid(route.params.obid);
        getdata();

    }, []);

    const navigation = useNavigation()

    const Add_measurment = async () => {



        try {

            const res = await fetch(`https://aufcart.com/api/addmeasurment/${id}/${customerid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Ordertype, clmesurement, neak
                })
            })

            const data2 = await res.json();

            if (!data2) {
                window.alert("Data Not Gotted")

            }
            else {
                setdata(data2);
                navigation.navigate("Home")
            }


        } catch (e) {
            window.alert("Something went wrong")
        }
    }


    return (
        <SafeAreaView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", flex: 1 }}>

            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={[styles.headerwithline, { flexDirection: "row" }]} >

                    <View style={{ width: responsiveWidth(10) }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>


                            <MaterialIcons name="arrow-back" size={24} color="black" style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: responsiveWidth(80), }}>

                        <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Add New Order</Text>
                    </View>


                </View>
                <View style={styles.line70}></View>

                <View style={[styles.form, { marginTop: responsiveHeight(4) }]}>

                    <View style={{ width: "90%" }}>
                        <SelectDropdown
                            data={sct}
                            onSelect={(selectedItem, index) => {
                                setOrdertype(selectedItem.clname)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.clname
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.clname
                            }} defaultButtonText={"Select Cloth Type"}



                            buttonStyle={{ width: responsiveWidth(85), borderRadius: 5, backgroundColor: "#f5f5f5", }}
                            buttonTextStyle={{ fontSize: 18, color: "#b3b3b3", fontWeight: "bold", textAlign: "center", }}
                            selectedRowTextStyle={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", opacity: 1 }}
                            dropdownStyle={{ borderRadius: 5, }}
                            selectedRowStyle={{ backgroundColor: "#56BC1F" }}
                            rowTextStyle={{ fontWeight: "bold", fontSize: 18, opacity: .6 }}


                            renderDropdownIcon={() => { return (<AntDesign name="down" size={14} color="black" />) }}
                        />

                    </View>





                </View>

                <View style={{ marginHorizontal: responsiveWidth(8), marginTop: responsiveHeight(3) }}>



                    <Text style={styles.label}>Enter Measurment Name</Text>
                    <TextInput style={[styles.input, { borderRadius: responsiveWidth(2), }]} placeholder="Enter Measurment Name" onChangeText={e => setclmesurement(e)} />


                    <View style={{ marginTop: responsiveHeight(2) }}>

                        {
                            data2.map((e, i) => {
                                return (

                                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5), marginVertical: responsiveHeight(3) }}>
                                        <Text style={[styles.modellabel, { color: "#000", opacity: 1, width: responsiveWidth(30) }]}>{e.cltpartname}</Text>
                                        <TextInput style={[styles.input, { width: responsiveWidth(30), textAlign: "center" }]} keyboardType='numeric' value={e.value} onChangeText={(text) => inputHandler(text, i)}></TextInput>
                                    </View>
                                )

                            })
                        }
                    </View>
                </View>


            </ScrollView>


            <TouchableOpacity style={styles.onlybtn} onPress={() => { Add_measurment() }}  >
                <Text style={styles.onlybtntext}>Save Measurment</Text>
            </TouchableOpacity>





        </SafeAreaView>
    )
}

export default Add_measurment_form1
