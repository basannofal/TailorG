import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator, Image, TouchableOpacity, } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './screen/Login';
import Ragister from './screen/Ragister';
import Add_Costomer from './screen/Add_Costomer';
import Show_cuto_measure from './screen/Show_cuto_measure';
import CostomerMeasure from './screen/CostomerMeasure';
import CostomerAorder from './screen/CostomerAorder';
import CostomerDorder from './screen/CostomerDorder';
import CostomerInfo from './screen/CostomerInfo';
import CostomerInfoEdit from './screen/CostomerInfoEdit';
import OrderDetail from './screen/OrderDetail';
import CostomerOrder from './screen/CostomerOrder'
import Choose_Measurment from './screen/Choose_Measurment';
import Choose_Measurment1 from './screen/Choose_measurment(1)';
import AllClothType from './screen/AllClothType';
import Splash from './screen/Splash';
import Home from './screen/Home';
import { Authcontext } from './context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Order from './screen/Order'
import ActiveOrder from './screen/ActiveOrder';
import DeliveredOrder from './screen/DeliveredOrder';
import Urgent from './screen/Urgent';
import CotomerOrderForm from './screen/CotomerOrderForm';
import Add_measurment_form from './screen/Add_measurment_form';
import Profile from './screen/Profile';
import ProfileDetail from './screen/ProfileDetail';
import Onbording1 from './screen/Onbording1';
import Onbording2 from './screen/Onbording2';
import Onbording3 from './screen/Onbording3';
import Extra from './screen/Extra';
import ProfileEdit from './screen/ProfileEdit';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font/build/FontHooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import OldMesurmentlist from './screen/OldMesurmentlist';
import ClothTypePart from './screen/ClothTypePart';
import Allcustomer from './screen/Allcustomer';
import Dressmeasurmentdetail from './screen/Dressmeasurmentdetail';
import EditCustoMeasure from './screen/EditCustoMeasure';
import Orderedit from './screen/Orderedit';
import Ordermesur from './screen/Ordermesur';
import Netinfo from './screen/netinfo/Netinfo';



// ************************************ per costomer order tab navigator ****************************************

const CostomerorderStack = ({ route }) => {
  const id = route.params.id
  const obid = route.params.obid

  const navigation = useNavigation()

  return (
    <Tab.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#56BC1F",
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "white"
      }, contentStyle: {
        backgroundColor: '#f8f8f8'
      },
      tabBarStyle: { display: "none" },

    }}>





      <Tab.Screen name="Costomer Orders" options={{
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="people-outline" size={24} color="black" />
          );
        },
        tabBarActiveBackgroundColor: '#ece9ff',
        // headerRight: () => <AntDesign name="plus" size={30} color="#ffffff" style={{ marginRight: 15, }} onPress={() => { navigation.navigate("Add Order",  {
        //   id : id
        // }) }}/>,
        headerLeft: () => <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 15, }} onPress={() => { navigation.navigate("Home") }} />


      }} component={PerCostomerOrder} initialParams={{ _id: id, obid: obid }} />
    </Tab.Navigator>

  )
}


// ********************************** per costomer Top navigator ***********************************

function PerCostomerOrder({ route }) {

  const [Fontloaded] = useFonts({
    'Bold': require('./screen/Font/Roboto-Bold.ttf'),
    'Regular': require('./screen/Font/Roboto-Regular.ttf'),
  })
  if (!Fontloaded) {
    return null
  }

  const id = route.params._id
  const obid = route.params.obid
  return (
    <Top.Navigator>
      <Top.Screen name="Active" options={{
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Bold", letterSpacing: .5 },
      }} component={CostomerAorder} initialParams={{ id: id, obid: obid }} />
      <Top.Screen name="Delivered" options={{
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Bold", letterSpacing: .5 },
      }} component={CostomerDorder} initialParams={{ id: id, obid: obid }} />

    </Top.Navigator>
  );
}



// ********************************** All Orders Top navigator ***********************************

// function Allorder({ route }) {
//   const [Fontloaded] = useFonts({
//     'Bold': require('./screen/Font/Roboto-Bold.ttf'),
//     'Regular': require('./screen/Font/Roboto-Regular.ttf'),
//   })
//   if (!Fontloaded) {
//     return null
//   }

//   const id = route.params._id

//   return (
//     <Top.Navigator>
//       <Top.Screen name="Active" options={{
//         tabBarLabelStyle: { fontSize: 14, fontFamily: "Bold", letterSpacing: .5 },
//       }} component={ActiveOrder} initialParams={{ id: id }} />
//       <Top.Screen name="Delivered" options={{
//         tabBarLabelStyle: { fontSize: 14, fontFamily: "Bold", letterSpacing: .5 },
//       }} component={DeliveredOrder} initialParams={{ id: id }} />

//     </Top.Navigator>
//   );
// }

// **********************************Main PAge tab navigator ***********************************


function HomeStack({ route }) {

  const navigation = useNavigation()
  const [Fontloaded] = useFonts({
    'Bold': require('./screen/Font/Roboto-Bold.ttf'),
    'Regular': require('./screen/Font/Roboto-Regular.ttf'),
  })
  if (!Fontloaded) {
    return null
  }
  const id = route.params.id
  return (
    <Tab.Navigator screenOptions={{

      headerShown: false,

      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#56BC1F",
      tabBarStyle: {
        height: 60, shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 15,
        shadowOffset: { height: -400, width: 0 },
      },
      tabBarLabelStyle: { fontSize: responsiveFontSize(1.5), marginBottom: 8, fontFamily: "Regular" },
      tabBarShowLabel: true,
      tabBarIconStyle: {
        top: 5

      }



    }}  >
      <Tab.Screen name="Costomer" options={{
        tabBarIcon: ({ focused }) => {

          return (
            <Ionicons name="people" size={24} color={focused ? "#fff" : "#56BC1F"} style={{ padding: 0, margin: 0 }} />
          );
        },
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",

        headerRight: () => <AntDesign name="plus" size={24} color="black" style={{ marginRight: 15, }} onPress={() => {
          navigation.navigate("Add Costomer", {
            id: id
          })
        }} />,

      }} component={Home} initialParams={{ _id: id, }} />


      <Tab.Screen name="Order" options={{
        tabBarIcon: ({ focused }) => {
          return (
            // <MaterialIcons name="bookmark-border" size={24} color="black" />
            <MaterialCommunityIcons name="note-text" size={26} color={focused ? "#fff" : "#56BC1F"} />
          );
        },

        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",


      }} component={ActiveOrder} initialParams={{ _id: id }} />


      <Tab.Screen name="Urgent" options={{
        tabBarIcon: ({ focused }) => {
          return (
            <MaterialIcons name="watch-later" size={24} color={focused ? "#fff" : "#56BC1F"} />
          );
        },

        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",

      }} component={Urgent} initialParams={{ _id: id }} />

      <Tab.Screen name="Profile" options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons name="person" size={22} color={focused ? "#fff" : "#56BC1F"} />
          );
        },

        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",

      }} component={Profile} initialParams={{ _id: id }} />

    </Tab.Navigator>
  );
}

// **********************************Costomer Profile Top navigator ***********************************



function CostomerTop({ route }) {
  const [Fontloaded] = useFonts({
    'Bold': require('./screen/Font/Roboto-Bold.ttf'),
    'Regular': require('./screen/Font/Roboto-Regular.ttf'),
  })
  if (!Fontloaded) {
    return null
  }

  const id = route.params.id
  const obid = route.params.obid

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,

      tabBarActiveTintColor: "#56BC1F",
      tabBarInactiveTintColor: "#56BC1F",
      tabBarStyle: {
        height: 60, shadowColor: '#56BC1F',
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 20,
        shadowOffset: { height: -100, width: -100, },
      },
      tabBarLabelStyle: { fontSize: responsiveFontSize(1.5), marginBottom: 8, fontFamily: "Regular", },
      tabBarShowLabel: true,
      tabBarIconStyle: {
        top: 5
      },
      // tabBarActiveBackgroundColor:"#000",
    }}>
      <Tab.Screen name="Detail" options={{
        tabBarIcon: ({ focused }) => {
          return (

            <MaterialCommunityIcons name="card-account-details-outline" size={24} color={focused ? "#fff" : "#56BC1F"} />
          );
        },



        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",
      }} component={CostomerInfo} initialParams={{ id: id, obid: obid }} />
      <Tab.Screen name="Measure" options={{
        tabBarIcon: ({ focused }) => {
          return (
            <AntDesign name="menufold" size={24} color={focused ? "#fff" : "#56BC1F"} />
          );
        },


        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",

      }}
        component={CostomerMeasure} initialParams={{ id: id, obid: obid }} />

      <Tab.Screen name="Order" options={{
        tabBarIcon: ({ focused }) => {
          return (
            // <MaterialIcons name="bookmark-border" size={24} color="black" />
            <MaterialCommunityIcons name="note-text" size={26} color={focused ? "#fff" : "#56BC1F"} />
          );
        },


        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#56BC1F",

      }} component={CostomerOrder} initialParams={{ id: id, obid: obid }} />
    </Tab.Navigator>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Top = createMaterialTopTabNavigator();


export default function App() {


  const [data, setdata] = useState('');

  


  const initialloginstate = {
    isloading: true,
    userName: null,
    userToken: null,
    id: null
  }

  const loginReducer = (prevstate, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevstate,
          userToken: action.token,
          isloading: false,
        };
      case 'LOGIN':
        return {
          ...prevstate,
          username: action.id,
          userToken: action.token,
          isloading: false,
        };

      case 'LOGOUT':
        return {
          ...prevstate,
          username: null,
          userToken: null,
          isloading: false,
        };

      case 'RAGISTER':
        return {
          ...prevstate,
          username: action.id,
          userToken: action.token,
          isloading: false,
        };
    }
  }




  const [loginState, dispatch] = React.useReducer(loginReducer, initialloginstate)
  const authcontext = React.useMemo(() => ({


    signin: async (email, pass) => {
      let userToken;
      userToken = null


      if (email) {
        try {
          userToken = email
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
          throw e
        }
      }
      dispatch({ type: 'LOGIN', id: email, token: userToken })
      console.log(loginState.token);

    },
    signout: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
        throw e;
      }

      dispatch({ type: 'LOGOUT' })

    },
    signup: () => {
      setuserToken("tailor");
    }
  }), []);


  const id = loginState.userToken;


  //   const getdata = async () => {


  //     const res = await fetch(`http://192.168.43.220:8000/getdata`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //     })

  //     const data = await res.json();
  //     if (!data) {
  //         window.alert('error in get data')
  //     }
  //     else {
  //         setdata(data)
  //         console.log(data);
  //         console.log('data goted by api');
  //     }

  // }

  useEffect(() => {

    setTimeout(async () => {
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
        throw e;
      }
      dispatch({ type: 'RAGISTER', token: userToken })

    }, 1000);


    // getdata();
  }, []);

  if (loginState.isloading) {
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   {/* <ActivityIndicator size="large" /> */}
      // </View>
      <Splash />
    )
  }






  return (
    <Authcontext.Provider value={authcontext}>


      <NavigationContainer>



        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: "#56BC1F",
          },
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "white"
          }, contentStyle: {
            backgroundColor: '#f8f8f8'
          },
          headerShown: false,
          statusBarColor: "#000"
        }} initialRouteName="Login" >

          {(loginState.userToken === null) ? <>
            <Stack.Screen name="Onbording1" component={Onbording1} options={{ headerShown: false, }} />
            <Stack.Screen name="Onbording2" component={Onbording2} options={{ headerShown: false, }} />
            <Stack.Screen name="Onbording3" component={Onbording3} options={{ headerShown: false, }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
            <Stack.Screen name="Sign Up" component={Ragister} options={{ headerShown: false, }} />

          </>
            :
            <>
              <Stack.Screen options={{
                headerShown: false, statusBarHidden: false, statusBarColor: "#000",
              }} name="Home" component={HomeStack} initialParams={{ id: id }} />

              <Stack.Screen name="Add Costomer" component={Add_Costomer} options={{ headerShown: false }} />
              <Stack.Screen name="Costomer Detail" component={CostomerTop} options={{ headerShown: false, statusBarColor: "#000", }} />
              <Stack.Screen name="Add Order" component={CotomerOrderForm} />
              <Stack.Screen name="Old Mesurment" component={OldMesurmentlist} />
              <Stack.Screen name="Profile Info" component={ProfileDetail} />
              <Stack.Screen name="Cloth Type Part" component={ClothTypePart} />
              <Stack.Screen name="Profile Edit" component={ProfileEdit} />
              <Stack.Screen name="Add Measurment" component={Add_measurment_form} />
              <Stack.Screen name="Order Detail" component={OrderDetail} />
              <Stack.Screen name="Measurement Detail" component={Show_cuto_measure} />
              <Stack.Screen name="Measurements" component={CostomerMeasure} />
              <Stack.Screen name="Choose Measurment" component={Choose_Measurment} />
              <Stack.Screen name="Cloth Type" component={AllClothType} />
              <Stack.Screen name="Costomer Detail Edit" component={CostomerInfoEdit} />
              <Stack.Screen name="Choose Measurment1" component={Choose_Measurment1} />
              <Stack.Screen name="Customers" component={Allcustomer} />
              <Stack.Screen name="Dress Detail" component={Dressmeasurmentdetail} />
              <Stack.Screen name="Edit Measurment" component={EditCustoMeasure} />
              <Stack.Screen name="Edit Order" component={Orderedit} />
              <Stack.Screen name="Order Measurment" component={Ordermesur} />




              <Stack.Screen name="Costomer Order" options={{
                headerShown: false
              }}
                component={CostomerAorder} initialParams={{ id: id }} />
















              <Stack.Screen name="Onbording1" options={{ headerShown: false }} component={Onbording1} />
              <Stack.Screen name="Onbording2" options={{ headerShown: false }} component={Onbording2} />
              <Stack.Screen name="Onbording3" options={{ headerShown: false }} component={Onbording3} />


              <Stack.Screen name="extra" options={{ headerShown: false, statusBarHidden: false, statusBarColor: "#000", }} component={Extra} />

            </>
          }

        </Stack.Navigator>
      </NavigationContainer>
    </Authcontext.Provider>



  );
}

// #866ee1 blue 
// #ffcb3d yelloq
//  #ffd2dd  light gulabi
// #fe9ecc   gulabi
// #ece9ff   melodi