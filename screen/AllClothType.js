import { FlatList, ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, SafeAreaView, Image } from 'react-native'
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
import DropDownPicker from 'react-native-dropdown-picker';

const AllClothType = ({ route }) => {
    const id = route.params.id
    const navigation = useNavigation();
    const [data, setdata] = useState('');

    const [cl, setcl] = useState('');
    const [dltid, setdltid] = useState('');

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
                setdata(data.ctype)
                setloading(false)
            }

        } catch (e) {
            window.alert("Something Went wrong")
        }
    }



    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);

    // This is to manage TextInput State
    const [clothname, setclothname] = useState("");
    const [gender, setgender] = useState('male');
    const [loading, setloading] = useState(true);
    const [dvalue, setdvalue] = useState('');


    const [selectedimg, setSelectedimg] = useState('');
    const [changeopen, setchangeOpen] = useState(false);
    const imgdata =
        [
            { label: 'shirt logo', value: 'shirt.png', icon: () => <Image source={require('../assets/measurmentImage/shirt.png')} style={{ width: 30, height: 30 }} /> },
            { label: 'shirt logo', value: 'pent.png', icon: () => <Image source={require('../assets/measurmentImage/pent.png')} style={{ width: 30, height: 30 }} /> },
            { label: 'shirt logo', value: 'kurta.png', icon: () => <Image source={require('../assets/measurmentImage/kurta.png')} style={{ width: 30, height: 30 }} /> },
            { label: 'shirt image', value: 'shirt1.png', icon: () => <Image source={require('../assets/measurmentImage/shirt1.png')} style={{ width: 30, height: 30 }} /> },
            { label: 'pent image', value: 'pent1.png', icon: () => <Image source={require('../assets/measurmentImage/pent1.png')} style={{ width: 30, height: 30 }} /> },
            { label: 'kurta image', value: 'kurta1.jpg', icon: () => <Image source={require('../assets/measurmentImage/kurta1.jpg')} style={{ width: 30, height: 30 }} /> },
        ]


    //   setValue(callback) {
    //     this.setState(state => ({
    //       value: callback(state.value)
    //     }));
    //   }

    //   setItems(callback) {
    //     this.setState(state => ({
    //       items: callback(state.items)
    //     }));
    //   }



    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    // save cloth

    const Savecloth = () => {
        toggleModalVisibility()
        navigation.navigate("Choose Measurment1", {
            clothname: clothname,
            gender: gender,
            id: id,
            dvalue: dvalue,
            imgmeasurment : selectedimg
        })
        setclothname('')
    }



    const [isdelete, setisdelete] = useState(false);


    const deletevisible = () => {
        setisdelete(!isdelete);
    };


    const Deletecustomer = async (obid, clname) => {
        deletevisible()
        setdltid(obid)
        setcl(clname)
    }





    const Deleteclothtype = async () => {
        deletevisible()
        try {
            const obid = dltid
            const mainid = route.params.id
            const res = await fetch(`https://aufcart.com/api/clothtypedelete/${mainid}/${obid}`, {
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
                navigation.navigate("Cloth Type", { id: id })
                getdata()
            }

        } catch (e) {
            window.alert("Something Went wrong")
        }
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

                            <View style={styles.flexstart}>

                                <View style={{ width: responsiveWidth(12) }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>


                                        <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.headernametext}>Cloth Types</Text>
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
                                <Text style={styles.modellabel}>Enter Cloth Name</Text>
                                <TextInput placeholder="Enter Cloth Name"
                                    value={clothname} style={styles.modalinput}
                                    onChangeText={(value) => setclothname(value)} />

                                <Text style={styles.modellabel}>Default Price</Text>
                                <TextInput placeholder="Default Price" keyboardType='numeric'
                                    value={dvalue} style={styles.modalinput}
                                    onChangeText={(value) => setdvalue(value)} />




                                <Text style={[styles.modellabel, { marginTop: 10 }]}>Gender </Text>
                                <View style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginTop: 4 }}>
                                    <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, }}>male</Text>

                                    <RadioButton
                                        value="male"
                                        status={gender === 'male' ? 'checked' : 'unchecked'}
                                        onPress={() => setgender('male')}
                                    />
                                    <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, marginLeft: 20 }}>female</Text>
                                    <RadioButton
                                        value="female"
                                        status={gender === 'female' ? 'checked' : 'unchecked'}
                                        onPress={() => setgender('female')}
                                    />
                                </View>



                                <Text style={[styles.modellabel, { marginTop: responsiveHeight(1) }]}>Select Measurment Image</Text>
                                <View style={{ marginHorizontal: "10%", marginTop: responsiveHeight(1) }}>
                                    <DropDownPicker
                                        items={imgdata}
                                        defaultValue={selectedimg}
                                        placeholder="Measurment Image"
                                        containerStyle={{ height: responsiveHeight(7) }}
                                        open={changeopen}
                                        setOpen={() => { setchangeOpen(!changeopen) }}
                                        style={{ backgroundColor: '#fff' }}
                                        itemStyle={{ justifyContent: 'flex-start' }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        value={selectedimg}
                                        setValue={(e) => { setSelectedimg(e()); console.log(selectedimg) }}
                                    />
                                </View>





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
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate("Dress Detail", {
                                                id: id,
                                                obid: item._id
                                            })
                                        }}>
                                            <View style={[styles.flatlistcontainer, styles.spacebetween, { borderRadius: responsiveWidth(2.1), }]}>


                                                <View style={[styles.flexstart, styles.shadow, { borderRadius: responsiveWidth(2.1), shadowColor: "#a8a8a8", alignItems: "flex-start", paddingVertical: 2 }]}>


                                                    <View style={[styles.flatlisttext, styles.spacebetween, { marginTop: 5, width: '90%', }]}>

                                                        <View style={[{ paddingVertical: responsiveHeight(1) }]}>
                                                            <View style={styles.spacebetween}>
                                                                <View style={{ width: responsiveWidth(70) }}>

                                                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.clname}</Text>
                                                                    <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 3 }}>{item.gender}</Text>
                                                                </View>

                                                                <TouchableOpacity onPress={() => { Deletecustomer(item._id, item.clname) }}>

                                                                    <View style={{ width: responsiveWidth(20) }}>

                                                                        <FontAwesome name="trash-o" size={24} color="#B63F3F" />
                                                                    </View>
                                                                </TouchableOpacity>

                                                            </View>
                                                        </View>



                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>


                                    </>)

                                }
                                }
                            />

                            :
                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: responsiveHeight(70) }}>
                                <Text style={{ fontSize: responsiveFontSize(3), opacity: .4, fontFamily: "Regular" }}>No Cloth Type Found</Text>
                                <TouchableOpacity style={{ width: responsiveWidth(74) }} onPress={toggleModalVisibility}>
                                    <Text style={[{ textAlign: "center", marginTop: responsiveHeight(3), fontSize: responsiveFontSize(2), borderRadius: 10, padding: responsiveHeight(1), color: "#fff", fontFamily: "Regular", backgroundColor: "#56BC1F", }]}>Add Cloth Type </Text>
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


                                <Text style={[styles.modelalertdec, { marginTop: 10 }]}>Delete {cl} ?</Text>


                                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: responsiveHeight(4), marginBottom: responsiveHeight(2.5) }}>
                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#fff", borderColor: "#ff4444", borderWidth: 1, marginRight: responsiveWidth(3.4), paddingVertical: responsiveHeight(1) }]}>
                                        <TouchableOpacity onPress={deletevisible} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#000", fontWeight: "bold", }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.modelAlertbtn, { backgroundColor: "#ff4444", marginLeft: responsiveWidth(3.4), paddingVertical: 10 }]}>
                                        <TouchableOpacity onPress={Deleteclothtype} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: responsiveFontSize(2.3), color: "#ffffff", fontWeight: "bold", }} >Delete</Text>
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

export default AllClothType


// const styles = StyleSheet.create({

//     list: {
//         marginTop: 20
//     },
//     liitem: {
//         padding: 15,
//         borderWidth: 1,
//         borderColor: "#999999",
//         borderTopWidth: 1,
//         borderRightWidth: 1,
//         borderLeftWidth: 1,
//         marginVertical: 5
//     },

//     liitemtext: {
//         fontSize: 20
//     },
//     liitemtext1: {
//         fontSize: 16
//     },
//     modellabel: {
//         fontSize: 20,
//         opacity: .5,
//         textAlign: "left",
//         marginLeft: "10%",
//         marginTop: 5
//     },
//     viewWrapper: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.2)",
//     },
//     modalView: {
//         alignItems: "flex-start",
//         justifyContent: "center",
//         position: "absolute",
//         width: "80%",
//         elevation: 5,
//         backgroundColor: "#fff",
//         borderRadius: 7,
//         paddingTop: 20,
//         paddingBottom: 10
//     },
//     textInput: {
//         width: "80%",
//         borderRadius: 5,
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderColor: "rgba(0, 0, 0, 0.2)",
//         borderWidth: 1,
//         marginBottom: 8,
//         marginLeft: "10%",
//         marginTop: 10
//     },
//     modelbtn: {
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderColor: "#777777",
//         borderWidth: .5,
//         borderRadius: 3,
//         backgroundColor: "#56BC1F",
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "flex-end",
//         alignItems: "center"
//     }


// })

// <ScrollView showsVerticalScrollIndicator={false}>
// <View style={{ marginHorizontal: 16, marginBottom: 50 }}>



//     <View style={styles.info}>
//         <View style={styles.list}>

//             <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#56BC1F", borderRadius: 2, paddingVertical: 5 }} onPress={toggleModalVisibility}>
//                 <Text style={{ paddingVertical: 5, fontSize: 18, color: "white", textAlign: "center" }}>New Cloth Pattern</Text>
//             </TouchableOpacity>

//             <Modal animationType="slide"
//                 transparent visible={isModalVisible}
//                 presentationStyle="overFullScreen"
//                 onDismiss={toggleModalVisibility}>
//                 <View style={styles.viewWrapper}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modellabel}>Enter Cloth Name</Text>
//                         <TextInput placeholder="Enter Cloth Name"
//                             value={clothname} style={styles.textInput}
//                             onChangeText={(value) => setclothname(value)} />




//                         <Text style={[styles.modellabel, { marginTop: 10 }]}>Gender </Text>
//                         <View style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginTop: 4 }}>
//                             <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, }}>male</Text>
//                             <RadioButton
//                                 value="male"
//                                 status={gender === 'male' ? 'checked' : 'unchecked'}
//                                 onPress={() => setgender('male')}
//                             />
//                             <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, marginLeft: 20 }}>female</Text>
//                             <RadioButton
//                                 value="female"
//                                 status={gender === 'female' ? 'checked' : 'unchecked'}
//                                 onPress={() => setgender('female')}
//                             />
//                         </View>

//                         <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: 30, marginBottom: 20 }}>
//                             <View style={[styles.modelbtn, { backgroundColor: "#ff4444", marginRight: 20, paddingVertical: 10 }]}>
//                                 <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
//                                     <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={[styles.modelbtn, { marginLeft: 20, paddingVertical: 10 }]}>
//                                 <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
//                                     <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }} >Save</Text>
//                                 </TouchableOpacity>
//                             </View>


//                         </View>

//                     </View>
//                 </View>
//             </Modal>

//             <FlatList
//                 data={data}
//                 keyExtractor={item => item._id}
//                 inverted
//                 renderItem={({ item }) =>
//                 (
//                     <View style={[styles.liitem, { flexDirection: "row", justifyContent: "space-between" }]}>
//                         <View >

//                             <Text ><Text style={styles.liitemtext}>{item.clname}</Text></Text>
//                             <Text ><Text style={styles.liitemtext1}>{item.gender}</Text></Text>


//                         </View>
//                         <View style={{ flexDirection: "row", alignItems: "center", }}>
//                             <TouchableOpacity>
//                                 <Entypo name="eye" size={26} color="#5cb85c" style={{ paddingHorizontal: 8, borderColor: "#5cb85c", borderWidth: 1, alignSelf: "center", padding: 5, marginHorizontal: 2 }} />
//                             </TouchableOpacity>
//                             <TouchableOpacity>
//                                 <FontAwesome name="edit" size={26} color="#0275d8" style={{ paddingHorizontal: 8, borderColor: "#0275d8", borderWidth: 1, alignSelf: "center", padding: 5, marginHorizontal: 2 }} />
//                             </TouchableOpacity>
//                             <TouchableOpacity>
//                                 <MaterialIcons name="delete-forever" size={26} color="#d9534f" style={{ paddingHorizontal: 8, borderColor: "#d9534f", borderWidth: 1, alignSelf: "center", padding: 5, marginHorizontal: 2 }} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )
//                 }
//             />


//         </View>
//     </View>
// </View>