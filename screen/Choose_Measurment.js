import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';


const Choose_Measurment = ({route}) => {

  const [gender, setgender] = useState('');
  const [clothname, setclothname] = useState('');
  const [id, setid] = useState('');
  const [data, setdata] = useState('');
  

  const navigation = useNavigation()
  
  const Array = [
    {
      id: 1,
      selected: false,
      Mname: "Sleves"
    },
    {
      id: 2,
      selected: false,
      Mname: "Sholder"
    },
    {
      id: 3,
      selected: false,
      Mname: "Knee"
    },
    {
      id: 4,
      selected: false,
      Mname: "Leg"
    },
    {
      id: 5,
      selected: false,
      Mname: "top"
    },

  ]


  const [select, setselect] = useState(Array);
  const [measure, setmeasure] = useState({});
  const [customerid, setcustomerid] = useState('');




  useEffect(() => {
  setid(route.params.id)
  setgender(route.params.gender)
  setclothname(route.params.clothname)
  setcustomerid(route.params.obid)

  },[])

  const handleonpress = (item) => {
    const newitem = select.map((val) => {
      if (val.id === item.id) {
        return { ...val, selected: !val.selected }
      }
      else {
        return val;
      }
    })
    setselect(newitem)
  }

  const Submit = async() => {
    let newArray = select.filter((val, i) => {
      if (val.selected) {
        return val.Mname;
      }
    })


    try {
      
    const res = await fetch(`https://aufcart.com/api/Addnewclothtype/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gender, clothname, newArray
      })
    })

    const data2 = await res.json();
    console.log(data2);
    if (!data2) {
      window.alert('error in get data2');
    }
    else {
      setdata(data2);
      window.alert("Costomer Added")
      navigation.navigate("Add Order", {
        id:id,
        obid : customerid
      })
     }

     
    } catch (e) {
      console.log(e);
      window.alert(e)
    }


    console.log(newArray);
    window.alert(` ${clothname} and ${gender} ${newArray}`)


  }

  const Footer = () => {
    return (
      <TouchableOpacity onPress={Submit}>
      
        <View style={styles.btn}>
          <Text style={styles.btnText}>Save Clothss</Text>
        </View>
        <Text> {customerid} </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.checkboxcontainer}>
        <FlatList
          data={select}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleonpress(item)}>
                <View style={[styles.checkbox, { borderColor: item.selected ? "#56BC1F" : "black", borderWidth: item.selected ? 2 : 0.5 }]}>
                  <Text style={styles.name}>{item.Mname}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          ListFooterComponent={Footer}
        />

      </View>
    </SafeAreaView>




  )
}

export default Choose_Measurment

const styles = StyleSheet.create({
  checkboxcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    padding: 30,
    width: 149,
    height: 149,
    marginVertical:10,
    marginHorizontal:10,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    opacity: .6
  },
  btn: {
    paddingVertical: 15,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: .7,
    borderColor: "#777777",
    marginVertical:10,
    marginHorizontal:10,
    borderRadius:3,
    backgroundColor:"#56BC1F"
  },
  btnText:{
    fontSize: 18,
    fontWeight: "bold",
    opacity: .9,
    color:"#ffffff"
  }
})