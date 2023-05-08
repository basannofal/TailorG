import { FlatList, ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Dressmeasurmentdetail = ({ route }) => {
    const id = route.params.id
    const navigation = useNavigation();
    const [data, setdata] = useState([]);

    const [dltid, setdltid] = useState('');
    const [cltname, setcltname] = useState('');



    const [iscofirm, setiscofirm] = useState(false);


    const confirmbox = () => {
        setiscofirm(!iscofirm);
    };

    const Gohome = () => {
        confirmbox()

        getdata()

    }

    const [isdelete, setisdelete] = useState(false);


    const deletevisible = () => {
        setisdelete(!isdelete);
    };



    const getdata = async () => {

        try {
            let ctypedata = []

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
                setdata(data.ctype)
                ctypedata = data.ctype

                ctypedata.map((e) => {
                    if (e._id === route.params.obid) {
                        setdata(e.cltype)
                    }
                })
                setloading(false)
            }

        } catch (e) {
            window.alert("Something Went Wrong")
        }
    }



    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);

    // This is to manage TextInput State
    const [clothname, setclothname] = useState("");
    const [check, setcheck] = useState('');
    const [loading, setloading] = useState(true);




    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    // save cloth

    const Savecloth = async () => {
        toggleModalVisibility()
        try {
            const id = route.params.id
            const obid = route.params.obid

            const res = await fetch(`https://aufcart.com/api/addclparttype/${id}/${obid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    clothname
                })
            })

            // const data = await res.json();
            // if (!data) {
            //     window.alert('error in get data');
            // }
            // else {
            //     setdata(data);
            //     window.alert("Measurement Type Added")

            //     // getdata()
            // }

            confirmbox()


        } catch (e) {
        }
        setclothname('')
    }

    const Deletecustomer = async () => {
        try {
            const mainid = route.params.id
            const obid = dltid
            const res = await fetch(`https://aufcart.com/api/dldresstypepart/${mainid}/${obid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();
            if (!data) {
                window.alert('error in get data')
            }
            else {
                // navigation.navigate("Cloth Type", { id: id })
                getdata()
                deletevisible()

            }

        } catch (e) {
            window.alert("Something Went Wrong")
        }
    }


    const deletepart = (obid, name) => {
        setdltid(obid)
        setcltname(name)
        deletevisible()
    }


    useEffect(() => {

        getdata();
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
                    <View style={[styles.flatlistheader, { marginLeft: 0 }]}>
                        <View style={[styles.headername, styles.spacebetween]}>

                            <View style={[styles.flexstart,]}>

                                <View style={{ width: responsiveWidth(12) }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>


                                        <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.headernametext}>Dress Detail</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.headericon, { marginLeft: responsiveWidth(10) }]} onPress={toggleModalVisibility}>
                                <AntDesign name="plus" size={14} style={{ marginHorizontal: responsiveWidth(.5), }} color="black" />
                                <Text style={[styles.link,]}>Add</Text>
                            </TouchableOpacity>


                        </View>


                    </View>


                    <Modal animationType="slide"
                        transparent visible={isModalVisible}
                        presentationStyle="overFullScreen"
                        onDismiss={toggleModalVisibility}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <Text style={styles.modellabel}>Enter Measurment Name</Text>
                                <TextInput placeholder="Enter Measurment Name"
                                    value={clothname} style={styles.modalinput}
                                    onChangeText={(value) => setclothname(value)} />



                                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                                        <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.modelAlertbtn, { marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                                        <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>


                            </View>
                        </View>
                    </Modal>

                    {
                        data != '' ?


                            <FlatList
                                data={data}
                                keyExtractor={item => item._id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {



                                    return (<>

                                        {/* <View style={{marginBottom:responsiveHeight(2)}}>
                                    <View style={[styles.Checkbox, { borderColor: "black", borderWidth: 0.5, marginBottom:0,height: responsiveHeight(17), }]}>
                                        
                                        <Text style={styles.checkboxname}>{item.cltpartname}</Text>
                                    </View>
                                        <TouchableOpacity onPress={() => { Deletecustomer(item.id) }} style={{paddingVertical:responsiveHeight(.7), backgroundColor:"#B63F3F", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:responsiveWidth(40), marginLeft:responsiveWidth(6), }}>


                                                <FontAwesome name="trash-o" size={24} color="#fff" />
                                        </TouchableOpacity>
                                </View> */}
                                        <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), }]}>


                                            <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>


                                                <View style={[styles.flatlisttext, styles.spacebetween, { marginTop: 2, width: '90%', }]}>

                                                    <View style={[{ paddingVertical: responsiveHeight(1) }]}>
                                                        <View style={styles.spacebetween}>
                                                            <View style={{ width: responsiveWidth(70) }}>

                                                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.cltpartname}</Text>

                                                            </View>

                                                            <TouchableOpacity onPress={() => { deletepart(item.id, item.cltpartname) }}>

                                                                <View style={{ width: responsiveWidth(20) }}>

                                                                    <FontAwesome name="trash-o" size={24} color="#B63F3F" />
                                                                </View>
                                                            </TouchableOpacity>

                                                        </View>
                                                    </View>



                                                </View>
                                            </View>

                                        </View>


                                    </>)

                                }
                                }
                            />
                            :
                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: responsiveHeight(70) }}>
                                <Text style={{ fontSize: responsiveFontSize(3), opacity: .4, fontFamily: "Regular" }}>No Dress Detail Found</Text>
                                <TouchableOpacity style={{ width: responsiveWidth(74) }} onPress={toggleModalVisibility}>
                                    <Text style={[{ textAlign: "center", marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), borderRadius: 10, padding: responsiveHeight(1), color: "#fff", fontFamily: "Regular", backgroundColor: "#56BC1F", }]}>Add New </Text>
                                </TouchableOpacity>
                            </View>

                    }

                    <Modal animationType="slide"
                        transparent visible={isdelete}
                        presentationStyle="overFullScreen"
                        onDismiss={deletevisible}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <View style={styles.modelicon}>
                                    <MaterialCommunityIcons name="delete-circle" size={65} color="#ff4444" />
                                </View>


                                <Text style={[styles.modelAlertlabel]}>Are you sure ?</Text>


                                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Delete {cltname} ?</Text>


                                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#fff", borderColor: "#ff4444", borderWidth: 1, marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                                        <TouchableOpacity onPress={deletevisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#000", fontWeight: "bold", }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                                        <TouchableOpacity onPress={Deletecustomer} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Delete</Text>
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








                </SafeAreaView>
            )
        }
    }
}

export default Dressmeasurmentdetail