import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Modal, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './Style';
import DropDownPicker from 'react-native-dropdown-picker';

const CotomerOrderForm = ({ route }) => {
  const [urgent, seturgent] = useState('Old');
  const [checked, setChecked] = useState('No');
  const [gender, setgender] = useState('male');
  const [specialNote, setspecialNote] = useState("");
  const [prize, setprize] = useState("");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [Ordertype, setOrdertype] = useState('');
  const [Measurment, setMeasurment] = useState('');
  const [customerid, setcustomerid] = useState('');
  const [id, setid] = useState('');
  const [clmeasurment, setclmeasurment] = useState('');
  const [data, setdata] = useState('');
  const countries = ["Pents", "Shirt", "Kurta", "Kurti", "Kurta", "Kurti",]
  const cltype = ["Pents 1", "pents 2", "pent 3", "pent 4",]
  const [dvalue, setdvalue] = useState('');

  const [ddate, setddate] = useState('');
  const [dmonth, setdmonth] = useState('');
  const [dyear, setdyear] = useState('');
  const [sct, setsct] = useState([]);


  const [imgurl, setImgurl] = useState('');

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






  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [clothname, setclothname] = useState("");

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };




  const navigation = useNavigation()

  const Savecloth = () => {
    toggleModalVisibility()
    navigation.navigate("Choose Measurment1", {
      clothname: clothname,
      gender: gender,
      id: id,
      obid: customerid,
      cameOrder: "cameOrder",
      dvalue: dvalue,
      imgmeasurment: selectedimg
    })

    setclothname('')
    setdvalue('')

    // window.alert(`this is name of cloth ${clothname} and gender is ${gender}`)
    // navigation.navigate("Choose Measurment", {
    //   clothname: clothname,
    //   gender: gender,
    //   id: id,
    //   obid: customerid
    // })
  }
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setddate(value.getDate())
    setdmonth(value.getMonth() + 1)
    setdyear(value.getFullYear())

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };





  const Add_order = async () => {



    try {

      const res = await fetch(`https://aufcart.com/api/Addorder/${id}/${customerid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Ordertype, Measurment, specialNote, prize, ddate, dmonth, dyear, checked
        })
      })

      const data2 = await res.json();
      if (!data2) {
        window.alert('error in get data2');
      }
      else {
        setdata(data2);
        navigation.navigate("Home", {
          id: id
        })
      }


    } catch (e) {
    }

    setMeasurment(route.params.clmesurement);



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
      dvalue: dvalue,
      imgurl : imgurl
    })
  }


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
        window.alert('error in get data')
      }
      else {
        setsct(data.ctype)
        setclmeasurment(data.costomer)
      }

    } catch (e) {
      window.alert("Something Went Wrong")
    }
  }

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => {
      setid(route.params.id);
      setMeasurment(route.params.clmesurement);
      setcustomerid(route.params.obid)

      getdata();
    });
    return focusHandler;
  }, [route])



  return (





    <ScrollView style={{ backgroundColor: "#fff", }} showsVerticalScrollIndicator={false}>


      <View style={[styles.headerwithline, { flexDirection: "row" }]} >
        <View style={{ width: responsiveWidth(12) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>


            <MaterialIcons name="arrow-back" size={23} color="black" style={{ alignSelf: "center", marginHorizontal: responsiveWidth(1) }} />
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
              setdvalue(selectedItem.dvalue)
              setprize(selectedItem.dvalue)
              setImgurl(selectedItem.imgurl)
              
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
        <TouchableOpacity onPress={toggleModalVisibility} >
          <Text style={{ fontSize: 14, color: "#56BC1F", fontWeight: "bold", marginVertical: 10 }}>Add New Cloth ?</Text>
        </TouchableOpacity>
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
              <TextInput placeholder="Default Price"
                style={styles.modalinput} keyboardType='numeric' value={dvalue} onChangeText={e => setdvalue(e)} />


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





              {/* <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: 30, marginBottom: 20 }}>
                <View style={[styles.modelbtn, { backgroundColor: "#ff4444", marginRight: 20, paddingVertical: 10 }]}>
                  <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.modelbtn, { marginLeft: 20, paddingVertical: 10 }]}>
                  <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }} >Save</Text>
                  </TouchableOpacity>
                </View>


              </View> */}

            </View>
          </View>
        </Modal>



        <View style={[styles.inputfield, { marginTop: responsiveHeight(2) }]}>
          <Text style={[styles.label, { top: responsiveHeight(.8) }]}>
            Select Measurment
          </Text>

          <View style={{ display: "flex", flexDirection: "row", }}>
            <RadioButton
              value="Old"
              status={urgent === 'Old' ? 'checked' : 'unchecked'}
              onPress={() => seturgent('Old')}
              color="#56BC1F"
              uncheckedColor='#56BC1F'

            />
            <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>Old</Text>

            <View style={{ marginLeft: 10 }}>

              <RadioButton
                value="New"
                status={urgent === 'New' ? 'checked' : 'unchecked'}
                onPress={() => seturgent('New')}
                color="#56BC1F"
                uncheckedColor='#56BC1F'

              />
            </View>
            <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>New</Text>
          </View>
        </View>


        <View style={styles.inputfield}>
          <View style={styles.spacebetween}>
            <Text style={styles.label}>
              Price
            </Text>

            <TouchableOpacity onPress={() => { setprize(dvalue) }}>

              <Text style={styles.link}>
                set default value
              </Text>
            </TouchableOpacity>


          </View>
          <TextInput placeholder='Price' style={[styles.input, { borderRadius: responsiveWidth(2) }]} keyboardType='numeric' value={prize} onChangeText={e => setprize(e)}></TextInput>
        </View>

        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Special Note
          </Text>
          <TextInput placeholder='Special Note' value={specialNote} onChangeText={e => setspecialNote(e)} style={[styles.input, { borderRadius: responsiveWidth(2) }]} numberOfLines={3} textAlignVertical="top" multiline={true} />
        </View>


        <View style={styles.inputfield}>
          <Text style={styles.label}>
            Delivery Date
          </Text>
          <View style={styles.datebox}>

            <Text style={styles.inputdate}>{ddate}</Text>

            <Text style={styles.inputdate}>{dmonth}</Text>
            <Text style={styles.inputyear}>{dyear}</Text>



            <View style={styles.datePicker}>
              {!isPickerShow && (
                <View style={styles.btnContainer}>
                  <FontAwesome5 name="calendar-alt" size={30} color="black" onPress={showPicker} />
                </View>
              )}

              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
            </View>


          </View>
        </View>



        <View style={[styles.inputfield, { marginTop: responsiveHeight(2) }]}>
          <Text style={[styles.label, { top: responsiveHeight(.8) }]}>
            Urgent Order
          </Text>

          <View style={{ display: "flex", flexDirection: "row", }}>
            <RadioButton
              value="Yes"
              status={checked === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Yes')}
              color="#56BC1F"
              uncheckedColor='#56BC1F'

            />
            <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>Yes</Text>

            <View style={{ marginLeft: 10 }}>

              <RadioButton
                value="No"
                status={checked === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('No')}
                color="#56BC1F"
                uncheckedColor='#56BC1F'

              />
            </View>
            <Text style={{ textAlign: "center", marginTop: 6, opacity: .8, fontSize: responsiveFontSize(2), }}>No</Text>
          </View>
        </View>

      </View>
      <View style={[{ marginTop: responsiveHeight(3) },]}>

        {
          (ddate === '' || Ordertype === '') ?

            <TouchableOpacity style={[styles.onlybtn, { opacity: .5 }]} disabled>
              <Text style={styles.onlybtntext}>Next</Text>
            </TouchableOpacity>

            :
            urgent === 'Old' ?

              <TouchableOpacity style={styles.onlybtn} onPress={() => navigation.navigate('Old Mesurment', {
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
                dvalue: dvalue,
                imgurl:imgurl

              })}  >
                <Text style={styles.onlybtntext}>Next</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={styles.onlybtn} onPress={() => { Add_measurment() }}   >
                <Text style={styles.onlybtntext}>Next</Text>
              </TouchableOpacity>
        }
      </View>

    </ScrollView>

  )
}

export default CotomerOrderForm



// <ScrollView showsVerticalScrollIndicator={false}>

// {/* <Text> {id} </Text>
// <Text> {customerid} </Text> */}

// <View style={{ marginHorizontal: 16, marginTop: 30 }}>

//   <Text style={[styles.heading, { color: "#666666", opacity: 1, letterSpacing: 1 }]}>Add New<Text style={[styles.heading, { color: "#866ee1", }]}> Order </Text></Text>
// </View>
// <View style={styles.dropdown}>

//   <SelectDropdown
//     data={sct}
//     onSelect={(selectedItem, index) => {
//       setOrdertype(selectedItem.clname)
//     }}
//     buttonTextAfterSelection={(selectedItem, index) => {
//       return selectedItem.clname
//     }}
//     rowTextForSelection={(item, index) => {
//       return item.clname
//     }} defaultButtonText={"Select Cloth Type"}


//     buttonStyle={{ width: '100%', backgroundColor: "#866ee1", borderRadius: 5, }}
//     buttonTextStyle={{ fontSize: 18, color: "#ffffff", fontWeight: "bold", textAlign: "center", }}
//     selectedRowTextStyle={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", opacity: 1 }}
//     dropdownStyle={{ marginTop: -29, borderRadius: 5, }}
//     selectedRowStyle={{ backgroundColor: "#866ee1" }}
//     rowTextStyle={{ fontWeight: "bold", fontSize: 18, opacity: .6 }}
//     rowStyle={{ borderRadius: 4 }}
//     renderDropdownIcon={() => { return (<AntDesign name="down" size={24} color="white" style={{ marginRight: 10, marginTop: 5 }} />) }}
//   />
// </View>

// <TouchableOpacity onPress={toggleModalVisibility} >
//   <Text style={{ marginHorizontal: 20, fontSize: 14, color: "blue", fontWeight: "bold", marginVertical: 10 }}>Add New Cloth ?</Text>
// </TouchableOpacity>

// <Modal animationType="slide"
//   transparent visible={isModalVisible}
//   presentationStyle="overFullScreen"
//   onDismiss={toggleModalVisibility}>
//   <View style={styles.viewWrapper}>
//     <View style={styles.modalView}>
//       <Text style={styles.modellabel}>Enter Cloth Name</Text>
//       <TextInput placeholder="Enter Cloth Name"
//         value={clothname} style={styles.textInput}
//         onChangeText={(value) => setclothname(value)} />




//       <Text style={[styles.modellabel, { marginTop: 10 }]}>Gender </Text>
//       <View style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginTop: 4 }}>
//         <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, }}>male</Text>
//         <RadioButton
//           value="male"
//           status={gender === 'male' ? 'checked' : 'unchecked'}
//           onPress={() => setgender('male')}
//         />
//         <Text style={{ textAlign: "center", marginTop: 4, opacity: .5, fontSize: 18, marginLeft: 20 }}>female</Text>
//         <RadioButton
//           value="female"
//           status={gender === 'female' ? 'checked' : 'unchecked'}
//           onPress={() => setgender('female')}
//         />
//       </View>

//       <View style={{ flex: 1, flexDirection: "row", marginHorizontal: "10%", marginTop: 30, marginBottom: 20 }}>
//         <View style={[styles.modelbtn, { backgroundColor: "#ff4444", marginRight: 20, paddingVertical: 10 }]}>
//           <TouchableOpacity onPress={toggleModalVisibility} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
//             <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }}>Cancel</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={[styles.modelbtn, { marginLeft: 20, paddingVertical: 10 }]}>
//           <TouchableOpacity onPress={Savecloth} style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
//             <Text style={{ fontSize: 16, color: "#ffffff", fontWeight: "bold", }} >Save</Text>
//           </TouchableOpacity>
//         </View>


//       </View>

//     </View>
//   </View>
// </Modal>
// {/* {
//   (Ordertype === '') ? <Text></Text> : <Text style={{ fontSize: 30, textAlign: "center" }}>you clicked {Ordertype}</Text>

// }
// {
//   (Measurment === '') ? <Text></Text> : <Text style={{ fontSize: 30, textAlign: "center" }}>you clicked {Measurment}</Text>
// } */}


// <View style={[styles.btngroup2, { flexDirection: "row" }]}>
//   <SelectDropdown
//     data={cltype}
//     onSelect={(selectedItem, index) => {
//       setMeasurment(selectedItem)
//     }}
//     buttonTextAfterSelection={(selectedItem, index) => {
//       return selectedItem
//     }}
//     rowTextForSelection={(item, index) => {
//       return item
//     }} defaultButtonText={"Old"}


//     buttonStyle={{ width: 130, borderRadius: 3, backgroundColor: "#f8f8f8", borderColor: "#777777", borderWidth: 1 }}
//     buttonTextStyle={{ fontSize: 18, opacity: .7, fontWeight: "bold", textAlign: "center", }}
//     selectedRowTextStyle={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", opacity: 1 }}
//     dropdownStyle={{ marginTop: -29, borderRadius: 3, }}
//     selectedRowStyle={{ backgroundColor: "#866ee1" }}
//     rowTextStyle={{ fontWeight: "bold", fontSize: 18, opacity: .6 }}
//     rowStyle={{ borderRadius: 4 }}
//     renderDropdownIcon={() => { return (<AntDesign name="down" size={24} color="black" style={{ marginTop: 3, }} />) }}
//   />
//   <Text style={{ opacity: .5 }}>OR</Text>
//   <TouchableOpacity onPress={() => { Add_measurment() }} style={styles.btntwo}>

//     <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", opacity: .7, }}> New</Text>
//     <AntDesign style={{ marginLeft: 20 }} name="right" size={24} color="black" />

//   </TouchableOpacity>
// </View>












// <View style={styles.form}>

//   <Text style={styles.label}>Special Note  </Text>
//   <TextInput placeholder='Special Note' style={styles.inputmemo} numberOfLines={4} textAlignVertical="top" multiline={true} value={specialNote} onChangeText={e => setspecialNote(e)}></TextInput>



//   <Text style={styles.label}>Price  </Text>


//   <TextInput placeholder='Price' style={styles.input} keyboardType='numeric' value={prize} onChangeText={e => setprize(e)}></TextInput>


//   <Text style={styles.label}>Delivery Date</Text>


//   <View style={styles.datebox}>

//     <Text style={styles.inputdate}>{ddate}</Text>

//     <Text style={styles.inputdate}>{dmonth}</Text>
//     <Text style={styles.inputyear}>{dyear}</Text>



//     <View style={styles.datePicker}>
//       {!isPickerShow && (
//         <View style={styles.btnContainer}>
//           <FontAwesome5 name="calendar-alt" size={30} color="black" onPress={showPicker} />
//         </View>
//       )}

//       {isPickerShow && (
//         <DateTimePicker
//           value={date}
//           mode={'date'}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           is24Hour={true}
//           onChange={onChange}
//           style={styles.datePicker}
//         />
//       )}
//     </View>


//   </View>




//   <Text style={styles.label}>Order is Urgent ? </Text>
//   <View style={{ display: "flex", flexDirection: "row", paddingVertical: 15 }}>
//     <Text style={{ textAlign: "center", marginTop: 6, opacity: .5, fontSize: 18, marginLeft: 5 }}>Yes</Text>
//     <RadioButton
//       value="Yes"
//       status={checked === 'Yes' ? 'checked' : 'unchecked'}
//       onPress={() => setChecked('Yes')}
//     />
//     <Text style={{ textAlign: "center", marginTop: 6, opacity: .5, fontSize: 18, marginLeft: 20 }}>No</Text>
//     <RadioButton
//       value="No"
//       status={checked === 'No' ? 'checked' : 'unchecked'}
//       onPress={() => setChecked('No')}
//     />
//   </View>


// </View>






// <View style={styles.btngroup}>
//   <TouchableOpacity onPress={() => { Add_order() }} style={styles.btn}>
//     <Text style={styles.btntext}> Add Order</Text>
//   </TouchableOpacity>
// </View>



// </ScrollView>


// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",

//   },
//   dropdown: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//     marginHorizontal: 16,

//   },
//   form: {
//     marginTop: 20,
//     marginHorizontal: 16,
//   },
//   input: {
//     paddingVertical: 15,
//     fontSize: 16,
//     borderWidth: .5,
//     borderColor: "#666666",
//     paddingHorizontal: 15,
//     marginVertical: 8,
//     borderRadius: 10

//   },
//   inputmemo: {
//     paddingVertical: 15,
//     fontSize: 16,
//     borderWidth: .5,
//     borderColor: "#666666",
//     paddingHorizontal: 15,
//     marginVertical: 8,
//     borderRadius: 10

//   },
//   btngroup: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 30,
//     marginHorizontal: 16
//   },
//   btngroup2: {
//     flex: 1,
//     marginTop: 20,
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   btntext: {
//     textAlign: "center",
//     fontSize: 20,
//     color: "#ffffff",

//   },
//   btn: {
//     width: "100%",
//     backgroundColor: "#866ee1",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#777777",
//     borderRadius: 10,

//   },
//   btntwo: {
//     width: 130,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "#777777",
//     borderRadius: 4,
//     flexDirection: "row",
//     justifyContent: "center"
//   },
//   datebox: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   inputdate: {
//     paddingVertical: 15,
//     fontSize: 20,
//     borderWidth: .5,
//     borderColor: "#666666",
//     paddingHorizontal: 20,
//     marginVertical: 8,
//     textAlign: "center",
//     opacity: .5,
//     width: 70,
//     borderRadius: 10

//   },
//   inputyear: {
//     paddingVertical: 15,
//     fontSize: 20,
//     borderWidth: .5,
//     borderColor: "#666666",
//     paddingHorizontal: 20,
//     marginVertical: 8,
//     opacity: .5,
//     textAlign: "center",
//     width: 110,
//     borderRadius: 10
//   },
//   datePicker: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,

//   },
//   modellabel: {
//     fontSize: 20,
//     opacity: .5,
//     textAlign: "left",
//     marginLeft: "10%",
//     marginTop: 5
//   },
//   label: {
//     marginTop: 10,
//     fontSize: 20,
//     opacity: .5
//   },
//   viewWrapper: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//   },
//   modalView: {
//     alignItems: "flex-start",
//     justifyContent: "center",
//     position: "absolute",
//     width: "80%",
//     elevation: 5,
//     backgroundColor: "#fff",
//     borderRadius: 7,
//     paddingTop: 20,
//     paddingBottom: 10
//   },
//   textInput: {
//     width: "80%",
//     borderRadius: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderColor: "rgba(0, 0, 0, 0.2)",
//     borderWidth: 1,
//     marginBottom: 8,
//     marginLeft: "10%",
//     marginTop: 10
//   },
//   modelbtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderColor: "#777777",
//     borderWidth: .5,
//     borderRadius: 3,
//     backgroundColor: "#866ee1",
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center"
//   }
// })