import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { styles } from './Style'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileDetail = ({ route }) => {
    const id = route.params.id
    const navigation = useNavigation()
    let number = ''

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
                setloading(false)
            }

        } catch (e) {
            window.alert("Something Went Wrong")
            window.alert("failed")
        }
    }




    const ProfileEdit = () => {
        navigation.navigate("Profile Edit", {
            id: id
        })
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


                                            <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal:responsiveWidth(1) }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={[styles.headernametext, { fontFamily: "Regular" }]}>Profile </Text>
                                    </View>
                                </View>


                                <TouchableOpacity style={styles.headericon} onPress={() => { ProfileEdit() }}>
                                    <Text style={[styles.link, { paddingHorizontal: responsiveWidth(1) }]}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ paddingHorizontal: responsiveWidth(8), marginTop: responsiveHeight(2) }}>
                            <View style={{ paddingTop: responsiveHeight(3) }}>
                                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Name </Text>
                                <View style={[styles.flexstart,]}>
                                    <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Feather name="user" size={24} color="black" /></Text>

                                    <View style={{ width: responsiveWidth(70) }}>
                                        <TextInput style={{ color: "#000", borderBottomWidth: 1, borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={data.name} editable={false} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ paddingTop: responsiveHeight(3) }}>
                                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Email </Text>
                                <View style={[styles.flexstart,]}>
                                    <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Fontisto name="email" size={24} color="black" /></Text>

                                    <View style={{ width: responsiveWidth(70) }}>
                                        <TextInput style={{ color: "#000", borderBottomWidth: 1, borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={data.email} editable={false} />
                                    </View>
                                </View>
                            </View>


                            <View style={{ paddingTop: responsiveHeight(3) }}>
                                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Shop Name </Text>
                                <View style={[styles.flexstart,]}>
                                    <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><MaterialIcons name="storefront" size={24} color="black" /></Text>

                                    <View style={{ width: responsiveWidth(70) }}>
                                        <TextInput style={{ color: "#000", borderBottomWidth: 1, borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={data.sname} editable={false} />
                                    </View>
                                </View>
                            </View>


                            <View style={{ paddingTop: responsiveHeight(3) }}>
                                <Text style={[styles.titletext, { opacity: .5, fontSize: responsiveFontSize(2), paddingLeft: responsiveWidth(10) }]}>Phone </Text>
                                <View style={[styles.flexstart,]}>
                                    <Text style={{ width: responsiveWidth(10), alignSelf: "flex-end" }}><Feather name="phone-call" size={24} color="black" /></Text>

                                    <View style={{ width: responsiveWidth(70) }}>
                                        <TextInput style={{ color: "#000", borderBottomWidth: 1, borderColor: "#a8a8a8", fontSize: responsiveFontSize(2.5), }} value={`${data.phone}`} editable={false} />
                                    </View>
                                </View>
                            </View>




                        </View>


                    </SafeAreaView>
                </ScrollView>
            )
        }
    }

}

export default ProfileDetail

