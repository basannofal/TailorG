import {  Text, View, Button, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Authcontext } from '../context/Context'
import { styles } from './Style'
import { Checkbox } from 'react-native-paper'
import { responsiveHeight } from 'react-native-responsive-dimensions'
const Ragister = () => {
  const [checked, setChecked] = React.useState(false);

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [sname, setsname] = useState('');


  const navigation = useNavigation()
  const postdata = async () => {

      const url = 'https://aufcart.com/api/ragister'
      
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sname, name, phone, email, pass
        })
    })

    const data = await res.json();
    if (res.status === 400) {
      window.alert('Email Already Exist')    
    }
    else {
        navigation.navigate("Login")
    }
    

  }


  return (
     <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.container}>
                <View style={styles.loginHead}>
                    <View style={styles.loginHeadText}>
                        <Text style={styles.headingtext}>Getting Started</Text>
                        <Text style={styles.desctext}>Create a Account To Continue</Text>
                    </View>
                    <View style={styles.loginHeadImg}>
                        <Image style={styles.loginimag} source={require('../assets/scissor2.png')} />

                    </View>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Shop Name
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Shop Name" value={sname} onChangeText={e => setsname(e)}  >

                        </TextInput>
                    </View>

                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Contact Number
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Contact Number"  value={phone} maxLength={10} onChangeText={e => setphone(e)} keyboardType='numeric'>

                        </TextInput>
                    </View>

                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Email
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Email"  value={email} onChangeText={e => setemail(e)} >

                        </TextInput>
                    </View>
                    <View style={styles.inputfield}>
                        <Text style={styles.label} >
                            Password
                        </Text>
                        <TextInput style={styles.input} placeholder="Enter Your Password"  value={pass} onChangeText={e => setpass(e)} secureTextEntry={true}>

                        </TextInput>
                    </View>



                    <View style={styles.agreegroup}>

                        <Checkbox color='#56BC1F'
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Text style={{ paddingRight: 40, }}>I agree to the <Text style={{ color: "#56BC1F" }}>Terms of Service</Text> and <Text style={{ color: "#56BC1F" }}>Privacy policy</Text></Text>
                    </View>

                    <View style={{ marginTop: 20 }}>

                    {

                        checked == false ? <TouchableOpacity  style={[styles.onlybtn,{opacity:.3}]} disabled>
                            <Text style={styles.onlybtntext}>Create Account</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.onlybtn}  onPress={postdata} >
                            <Text style={styles.onlybtntext}>Create Account</Text>
                        </TouchableOpacity>
                    }
                    </View>

                    <View style={[styles.bottom,{marginBottom:responsiveHeight(1), marginTop:responsiveHeight(4)}]}>

                        <Text style={styles.bottomText}>Already have an Account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                            <Text style={styles.link}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
  )
}

export default Ragister
