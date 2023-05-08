import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Image, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ragister from './Ragister'
import { useNavigation } from '@react-navigation/native'
import { Authcontext } from '../context/Context'
import { styles } from './Style'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const Login = () => {

    const [email, setemail] = useState();
    const [pass, setpass] = useState();

    const [data, setdata] = useState('');
    const navigation = useNavigation()


    const { signin } = React.useContext(Authcontext);


    const Postdata = async () => {
        const res = await fetch('https://aufcart.com/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, pass
            })

        })

        const data = await res.json();
        if (res.status === 400) {

            window.alert('please fill correct information')
        }
        else {
            const id = data._id;
            loginhandler(id, email)
        }


    }





    const loginhandler = (email, pass) => {

        signin(email, pass);
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={false} /> */}

            <View style={[styles.container, { height: responsiveHeight(100) }]}>
                <View style={styles.loginHead}>
                    <View style={styles.loginHeadText}>
                        <Text style={styles.headingtext}>Welcome Back</Text>
                        <Text style={styles.desctext}>Login To Continue</Text>
                    </View>
                    <Image style={styles.loginimag2} source={require('../assets/scissor1.png')} />

                </View>
                <View style={styles.form}>

                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Email
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Email" value={email} onChangeText={e => setemail(e)} >

                        </TextInput>
                    </View>
                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Password
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Password" value={pass} onChangeText={e => setpass(e)} secureTextEntry={true}>

                        </TextInput>
                    </View>

                    <View style={{ marginTop: responsiveHeight(3) }}>
                        <TouchableOpacity style={styles.onlybtn} onPress={Postdata}  >
                            <Text style={styles.onlybtntext}>Login</Text>
                        </TouchableOpacity>
                        <Text style={[styles.link, { textAlign: "center", marginTop: responsiveHeight(2) }]}>Forgot Password?</Text>





                    </View>


                    <View style={[styles.bottom, { marginTop: responsiveHeight(15) }]}>

                        <Text style={styles.bottomText}>Don't have an Account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")} >
                            <Text style={styles.link}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login
