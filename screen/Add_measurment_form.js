import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import { AntDesign } from '@expo/vector-icons';




const Add_measurment_form = ({ route }) => {
    const [clothtype, setclothtype] = useState('');
    const [clmesurement, setclmesurement] = useState('');
    const [neak, setneak] = useState([]);
    const [customerid, setcustomerid] = useState('');
    const [id, setid] = useState('');
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [Ordertype, setOrdertype] = useState('');
    const [Measurment, setMeasurment] = useState('');
    const [specialNote, setspecialNote] = useState("");
    const [prize, setprize] = useState("");
    const [ddate, setddate] = useState('');
    const [dmonth, setdmonth] = useState('');
    const [dyear, setdyear] = useState('');
    const [checked, setChecked] = useState('No');
    const [loading, setloading] = useState(true);
    const [inputs, setInputs] = useState([]);
    const [onlymeasurment, setonlymeasurment] = useState('');
    const [dvalue, setdvalue] = useState('');
    const [impnote, setimpnote] = useState('');
    const [imgurl, setImgurl] = useState('');
    let newdata = [];
    let alldataavailable = []

    const getdata = async () => {

        try {
            const idi = route.params.id

            const res = await fetch(`https://aufcart.com/api/getuser/${idi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();
            // console.log(data.costomer);s
            if (!data) {
                window.alert('error in get data')
            }
            else {

                setdata2(route.params.temp)


                // const _inputs = [...inputs];

                // data2.map((e, i) => {
                //     _inputs.push({ name: e.cltpartname, value: '' });

                // })
                // setInputs(_inputs);
                addHandler()
                // console.log(inputs);
                console.log('data goted by api');
                // console.log(onlymeasurment);
            }

        } catch (e) {
            window.alert("SomeThing Went Wrong")

        }
    }

    const addHandler = () => {

        // // const _inputs = [...inputs];
        // const _inputs = [];

        // data2.map((e, i) => {
        //     _inputs.push({ name: e.cltpartname, value: '' });

        // })
        setInputs(route.params.temphooks);
        console.log(inputs);
        setloading(false)


    }




    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    const Gohome = () => {
        toggleModalVisibility()
        if (route.params.onlymeasurment === 'onlymeasurment') {
            navigation.navigate("Measure", { id: id, obid: customerid })
        }
        else {

            navigation.navigate('Old Mesurment', {
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
                clmeasurment: clmesurement,
                dvalue: dvalue
            })
        }
    }





    const inputHandler = (text, key) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        setInputs(_inputs);
    }



    const Add_measurment = async () => {

        console.log(Ordertype);
        console.log(clmesurement);
        console.log(inputs);
        console.log(id);
        console.log(route.params.obid);

        try {

            const res = await fetch(`https://aufcart.com/api/addmeasurment/${id}/${customerid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Ordertype, clmesurement, inputs, impnote, imgurl
                })
            })

            const data = await res.json();
            // console.log(data);
            if (!data) {
                window.alert('error in get data');
            }
            else {
                setdata(data);
                toggleModalVisibility()


            }


        } catch (e) {
            window.alert("SomeThing Went Wrong")

        }


    }

    useEffect(() => {

        setid(route.params.id);
        setcustomerid(route.params.obid)
        setOrdertype(route.params.otype)
        setspecialNote(route.params.specialNote)
        setprize(route.params.prize)
        setddate(route.params.ddate)
        setdmonth(route.params.dmonth)
        setdyear(route.params.dyear)
        setChecked(route.params.checked)
        setonlymeasurment(route.params.onlymeasurment)
        setdvalue(route.params.dvalue)
        setImgurl(route.params.imgurl)

        getdata()


    }, []);

    const navigation = useNavigation()


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


                        <Modal animationType="slide"
                            transparent visible={isModalVisible}
                            presentationStyle="overFullScreen"
                            onDismiss={toggleModalVisibility}>
                            <View style={styles.viewWrapper}>
                                <View style={styles.modalView}>
                                    <View style={styles.modelicon}>


                                        <AntDesign name="checkcircle" size={55} color="#56BC1F" />
                                    </View>


                                    <Text style={[styles.modelAlertlabel]}>Congratulations</Text>


                                    <Text style={[styles.modelalertdec, { marginTop: 10 }]}>New Measurment Added</Text>


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



                        <View style={[styles.headerwithline, { flexDirection: "row", paddingBottom: responsiveHeight(2) }]} >

                              <View style={{ width: responsiveWidth(12) }}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>


                                            <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal:responsiveWidth(1) }} />
                                        </TouchableOpacity>
                                    </View>
                            <View style={{ width: responsiveWidth(80), }}>

                                <Text style={{ alignSelf: "center", fontSize: responsiveFontSize(2.5), fontWeight: "bold" }}>New Mesurment</Text>
                            </View>


                        </View>

                        <View style={{ marginHorizontal: responsiveWidth(8), marginTop: responsiveHeight(3) }}>



                            <Text style={styles.label}>Enter Measurment Name</Text>
                            <TextInput style={[styles.input, { borderRadius: responsiveWidth(2), }]} placeholder="Enter Measurment Name" onChangeText={e => setclmesurement(e)} />

                        


                            <View style={{ marginTop: responsiveHeight(2) }}>

                                {
                                    data2.map((e, i) => {
                                        return (

                                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: responsiveWidth(5), marginVertical: responsiveHeight(3) }} key={i}>
                                                <Text style={[styles.modellabel, { color: "#000", opacity: 1, width: responsiveWidth(30) }]}>{e.cltpartname}</Text>
                                                <TextInput style={[styles.input, { width: responsiveWidth(30), textAlign: "center" }]} keyboardType='numeric' value={e.value} onChangeText={(text) => inputHandler(text, i)}></TextInput>
                                            </View>
                                        )

                                    })
                                }








                            </View>





                            <View style={[styles.inputfield,{marginTop:responsiveHeight(2)}]}>
                                <Text style={[styles.label,{marginLeft:responsiveWidth(1.3)}]}>
                                    Special Note
                                </Text>
                                <TextInput placeholder='Special Note' value={impnote} onChangeText={e => setimpnote(e)} style={[styles.input, { borderRadius: responsiveWidth(2) }]} numberOfLines={3} textAlignVertical="top" multiline={true} />
                            </View>






                        </View>
                    </ScrollView>

                    <TouchableOpacity style={[styles.onlybtn, { marginTop: responsiveHeight(1), }]} onPress={() => { Add_measurment() }}  >
                        <Text style={styles.onlybtntext}>Save Measurment</Text>
                    </TouchableOpacity>




                </SafeAreaView>
            )
        }
    }
}

export default Add_measurment_form

// const styles = StyleSheet.create({
//     container: {
//         // marginHorizontal: 16,
//     },
//     fiedset: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         marginVertical: 15,

//     },
//     title: {
//         fontSize: 20,
//         opacity: .8,
//         width: "50%",
//         textAlign: "center",
//     },
//     input: {
//         width: "30%",
//         fontSize: 20,
//         opacity: .7,
//         textAlign: "center"
//     },
//     heading: {
//         textAlign: "center",
//         fontSize: 24,
//         opacity: .7,
//         marginTop: 30,
//         marginBottom: 10,
//         fontWeight: "bold",
//         letterSpacing: 1,
//     },
//     btngroup: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//         alignItems: "center",
//         marginVertical: 40,
//     },
//     btn: {
//         width: "80%",
//         borderColor: "#888888",
//         borderWidth: 1,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         backgroundColor: "#56BC1F",
//         borderRadius: 3
//     },
//     btntext: {
//         fontSize: 20,
//         color: "#fff",
//         fontWeight: "bold",
//         textAlign: "center"
//     }
// })