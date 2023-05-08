import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const OldMesurmentlist = ({ route }) => {

    let measurname = ''

    const navigation = useNavigation();


    const [mtid, setmtid] = useState('');
    const [Ordertype, setOrdertype] = useState('');
    const [Measurment, setMeasurment] = useState('');
    const [specialNote, setspecialNote] = useState("");
    const [prize, setprize] = useState("");
    const [ddate, setddate] = useState('');
    const [dmonth, setdmonth] = useState('');
    const [dyear, setdyear] = useState('');
    const [checked, setChecked] = useState('No');
    const [sct, setsct] = useState([]);

    // const [data, setdata] = useState([]);
    const [customerid, setcustomerid] = useState('');
    const [id, setid] = useState('');

    const [loading, setloading] = useState(true);
    const [customer, setcustomer] = useState(Array);
    const [order, setorder] = useState('');
    const [data, setdata] = useState('');
    const [dvalue, setdvalue] = useState('');
    const [imgurl, setImgurl] = useState('');

    const Add_order = async () => {



        try {

            const res = await fetch(`https://aufcart.com/api/Addorder/${id}/${customerid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Ordertype, Measurment, specialNote, prize, ddate, dmonth, dyear, checked, dvalue, mtid
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


    const [isalertvisible, setisalertvisible] = useState(false);


    const alertvisible = () => {
        setisalertvisible(!isalertvisible);
    };





    const [iscofirm, setiscofirm] = useState(false);


    const confirmbox = () => {
        setiscofirm(!iscofirm);
    };

    const Gohome = () => {
        confirmbox()

        navigation.navigate("Order", {
            id: id,
            obid: customerid
        })

    }




    const getalldata = async () => {

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
            window.alert("Something Went Wrong")
        }
    }


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

                let alldata = [Array];
                alldata = data[0].costomer[0].cmeasure

                const allnewdata = alldata.filter((e) => {
                    if (e.clothtype === route.params.otype) {
                        return { ...e }
                    }
                })
                setcustomer(allnewdata);

                setloading(false)


                // if (val.id === item.id) {
                //     return { ...val, selected: !val.selected }
                //   }
                //   else {
                //     return val;
                //   }
            }

        } catch (e) {
            window.alert("Something Went Wrong")
        }
    }

    useEffect(() => {

        const focusHandler = navigation.addListener('focus', () => {
            setid(route.params.id);
            setcustomerid(route.params.obid)
            setOrdertype(route.params.otype)
            setspecialNote(route.params.specialNote)
            setprize(route.params.prize)
            setddate(route.params.ddate)
            setdmonth(route.params.dmonth)
            setdyear(route.params.dyear)
            setChecked(route.params.checked)
            setdvalue(route.params.dvalue)
            setImgurl(route.params.imgurl)
            getdata();
            getalldata()

        });
        return focusHandler;
    }, [route])

    const Selectmode = (item, index) => {
        const newdata = customer.map((e, i) => {
            if (e._id === item._id) {
                // e.isselected = true
                setorder(e)
                return {
                    ...e,
                    isselected: true
                }
            }
            return {
                ...e,
                isselected: false
            }
        })
        setcustomer(newdata)

        newdata.filter((e) => {
            if (e.isselected == true) {
                setMeasurment(e.clmesurement)
                setmtid(e._id)
            }
        })

    }

    const Add_measurment = () => {


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
            Measurment: Measurment,
            specialNote: specialNote,
            prize: prize,
            ddate: ddate,
            dmonth: dmonth,
            dyear: dyear,
            checked: checked,
            temp: temp,
            temphooks: _inputs,
            imgurl:imgurl

        })
    }


    const footer = () => {
        return (
            <>
                <TouchableOpacity onPress={Add_measurment} >

                    <View style={[styles.flexstart, { width: responsiveWidth(80), marginLeft: responsiveWidth(10), marginTop: responsiveHeight(2) }]}>
                        <AntDesign name="pluscircleo" size={18} color="#56bc1f" style={{ marginRight: responsiveWidth(2) }} />
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "bold", color: "#56bc1f" }}>Add New Measurment</Text>


                    </View>
                </TouchableOpacity>
            </>
        )
    }


    {
        if (loading == true) {

            return (


                <ActivityIndicator size={50} color="#56BC1F" style={{ flex: 1, justifyContent: "center", flexDirection: "row", justifyContent: "space-around", padding: 10, }} animating={loading} />

            )
        }
        else {



            return (
                <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>

                    <View style={[styles.headerwithline, { flexDirection: "row", paddingBottom: responsiveHeight(2) }]} >

                        <View style={{ width: responsiveWidth(12) }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>


                                <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: responsiveWidth(80), }}>

                            <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>Old Mesurment</Text>
                        </View>


                    </View>
                    <FlatList
                        data={customer}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={footer}
                        renderItem={({ item, index }) => {
                            return (<>

                                <TouchableOpacity onPress={() => { Selectmode(item, index) }}>
                                    <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), }]}>
                                        {
                                            item.isselected === true ?

                                                <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2, borderColor: "#56BC1F", borderWidth: 1 }]}>


                                                    <View style={[styles.flatlisttext, styles.spacebetween, { marginTop: 5, width: '90%', }]}>

                                                        <View >
                                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.clmesurement}</Text>

                                                            {
                                                                item.date == '' ? <Text></Text> : <View style={[styles.flexstart, { paddingVertical: responsiveHeight(.4) }]}>
                                                                    <Ionicons name="time-outline" size={14} color="black" style={{ top: responsiveHeight(.3), paddingRight: responsiveWidth(1) }} />
                                                                    <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.date}</Text>
                                                                </View>

                                                            }

                                                        </View>


                                                        <Ionicons name="ios-checkmark-circle-outline" size={24} color="#56bc1f" />

                                                    </View>

                                                </View>


                                                :

                                                <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>


                                                    <View style={[styles.flatlisttext, styles.spacebetween, { marginTop: 5, width: '90%', }]}>

                                                        <View >
                                                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.clmesurement}</Text>

                                                            {
                                                                item.date == '' ? <Text></Text> : <View style={[styles.flexstart, { paddingVertical: responsiveHeight(.4) }]}>
                                                                    <Ionicons name="time-outline" size={14} color="black" style={{ top: responsiveHeight(.3), paddingRight: responsiveWidth(1) }} />
                                                                    <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.date}</Text>
                                                                </View>

                                                            }

                                                        </View>


                                                        <Ionicons name="ios-checkmark-circle-outline" size={24} color="#d8d8d8" />

                                                    </View>
                                                </View>
                                        }




                                    </View>



                                </TouchableOpacity>


                            </>)

                        }

                        }
                    />


                    <Modal animationType="slide"
                        transparent visible={isalertvisible}
                        presentationStyle="overFullScreen"
                        onDismiss={alertvisible}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <View style={styles.modelicon}>

                                    <AntDesign name="questioncircle" size={55} color="#f0aa02" />
                                </View>


                                <Text style={[styles.modelAlertlabel]}>{Ordertype}</Text>


                                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Confirm Order ?</Text>


                                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                                        <TouchableOpacity onPress={alertvisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                                        <TouchableOpacity onPress={Add_order} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Add</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>

                            </View>
                        </View>
                    </Modal>





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


                                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>New Order Added</Text>


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








                    <TouchableOpacity style={styles.onlybtn} onPress={alertvisible}  >
                        <Text style={styles.onlybtntext}>Save Order</Text>
                    </TouchableOpacity>


                </SafeAreaView>
            )

        }
    }
}

export default OldMesurmentlist


