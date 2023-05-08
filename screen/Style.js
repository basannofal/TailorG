import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { useFonts } from 'expo-font/build/FontHooks';
export const fonts = {
    s: 16,
  };






const styles = StyleSheet.create({
      
    container: {
        flex: 1,
        backgroundColor: "#ffffff",

    },
    rectangle: {
        marginTop: responsiveHeight(10),
        right: 70,
        backgroundColor: "#f5f5f5",
        width: responsiveWidth(80),
        height: responsiveWidth(80),
        borderRadius: responsiveWidth(40),
    },
    rectangleContainer: {
        flexDirection: "row"
    },
    image: {
        right: responsiveWidth(75),
        top: responsiveHeight(10),
        width: responsiveWidth(80),
        height: responsiveWidth(80)
    },
    image3: {
        right: 250,
        top: 100,
        width: 280,
        height: 280
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveHeight(4)
    },
    headingtext: {
        color: "#56BC1F",
        fontWeight: "bold",
        fontSize: responsiveFontSize(4),
        letterSpacing: 1,
    },
    paratext: {
        marginTop: responsiveHeight(1),
        fontSize: responsiveFontSize(1.8),
        textAlign: "center",
        paddingHorizontal: 60,
        lineHeight: 20
    },
    dotcontainer: {
        // marginTop: 60,
        // marginBottom: 30,
        marginTop: responsiveHeight(12),
        marginBottom: responsiveHeight(5),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        backgroundColor: "#e6e6e6",
        marginHorizontal: 5
    },
    active: {
        backgroundColor: "#56BC1F",
        color: "#ffffff"
    },
    btngroup: {
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: responsiveHeight(3),
        // marginTop:responsiveHeight(8)
    },

    btnactive: {
        borderRadius: 10,
        shadowColor: '#56BC1F',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    btntext: {
        fontWeight: "bold",
        color: "#56BC1F",
        letterSpacing: 1,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    fullbtn: {
        fontWeight: "bold",
        color: "#56BC1F",
        letterSpacing: 1,
        paddingVertical: 10,
        paddingHorizontal: 110,
        borderRadius: 10,
    },
    loginHead: {
        // paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        // paddingHorizontal: responsiveWidth(12),
        // paddingLeft: responsiveWidth(5),
        // paddingRight: responsiveWidth(6),
    },
    loginHeadText: {
        paddingLeft: responsiveWidth(15),
        marginTop: responsiveHeight(7)
    },
    loginimag: {
        height: 200,
        // right:20,
        width: 160
    },
    loginimag2: {

        height: responsiveHeight(30),
        marginRight: responsiveWidth(6),
        width: responsiveWidth(50),
        top: responsiveHeight(4)
    },
    desctext: {
        fontSize: 14,
        lineHeight: responsiveHeight(2)
    },
    form: {
        marginHorizontal: responsiveWidth(8)
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1)
    },
    inputfield: {
        marginBottom: responsiveHeight(2.2)
    },
    input: {
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: "#f5f5f5",
        fontSize: responsiveFontSize(2),
    },
    onlybtn: {
        padding: responsiveHeight(1.3),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#56BC1F",
        borderRadius: responsiveWidth(1),
        marginBottom: responsiveHeight(1),
        shadowColor: '#56BC1F',
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        marginHorizontal: responsiveWidth(4)
    },
    shadow: {
        shadowColor: '#56BC1F',
        shadowOffset: { width: 2, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 50,
        elevation: 1,
    },
    onlybtntext: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: .5
    },
    agreegroup: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginRight: 20
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingTop: responsiveHeight(4),
    },
    link: {
        color: "#56BC1F",
    },
    flatlistheader: {
        paddingTop: responsiveHeight(4),
        marginHorizontal: responsiveWidth(8),
        paddingBottom: responsiveHeight(2)

    },
    headername: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headernametext: {
        fontSize: responsiveFontSize(4),
    },
    headericon: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    flatlistcontainer: {
        marginHorizontal: responsiveWidth(8),
        marginVertical: responsiveHeight(1.5)
    },
    spacebetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexstart: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    avtar: {
        width: responsiveWidth(14),
        height: responsiveWidth(14),
        borderRadius: responsiveWidth(7)
    },
    titletext: {
        fontSize: responsiveFontSize(2.4),
    },
    flatlisttext: {
        marginHorizontal: responsiveWidth(4)
    },
    border: {
        borderWidth: .5,
        borderColor: "#999999",
        borderRadius: 10
    },
    ordercart: {
        shadowColor: '#56BC1F',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    protop: {
        height: responsiveHeight(40),
        backgroundColor: "#f5f5f5"
    },
    probottom: {
        height: responsiveHeight(60)
    },
    profilepic: {
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(15),
        marginTop: responsiveHeight(1)
    },
    proicon: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveWidth(3),
        borderRadius: responsiveWidth(1.5),
        marginRight: responsiveWidth(5)
    },
    prolistfont: {
        fontSize: responsiveFontSize(2.3),

    },
    headerwithline: {
        paddingTop: responsiveHeight(3),
        paddingBottom: responsiveHeight(1)
    },
    line70: {
        borderWidth: .5,
        borderColor: "#9f9f9f",
        width: responsiveWidth(60),
        marginLeft: responsiveWidth(20)
    },
    line90: {
        borderWidth: .5,
        borderColor: "#9f9f9f",
        width: responsiveWidth(80),
        marginLeft: responsiveWidth(5)
    },
    datebox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputdate: {
        paddingVertical: responsiveHeight(2),
        fontSize: responsiveFontSize(2.5),
        borderWidth: .5,
        borderColor: "#666666",
        paddingHorizontal: responsiveWidth(2),
        marginVertical: responsiveHeight(1),
        textAlign: "center",
        opacity: .5,
        width: responsiveWidth(18),
        borderRadius: responsiveWidth(2)

    },
    inputyear: {
        paddingVertical: responsiveHeight(2),
        fontSize: responsiveFontSize(2.5),
        borderWidth: .5,
        borderColor: "#666666",
        paddingHorizontal: responsiveWidth(2),
        marginVertical: responsiveHeight(1),
        opacity: .5,
        textAlign: "center",
        width: responsiveWidth(30),
        borderRadius: responsiveWidth(2)
    },
    datePicker: {
        paddingVertical: 15,
        paddingHorizontal: responsiveWidth(1),

    },
    modellabel: {
        fontSize: 20,
        opacity: .5,
        textAlign: "left",
        marginLeft: "10%",
        marginTop: 5
    },
    modelbtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "#777777",
        borderWidth: .5,
        borderRadius: 3,
        backgroundColor: "#56BC1F",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    modalView: {
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        width: "80%",
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 7,
        paddingTop: 20,
        paddingBottom: 10
    },
    viewWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalinput: {
        width: "80%",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        marginLeft: "10%",
        marginTop: 10
    },
    Checkboxcontainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    Checkbox: {
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        marginVertical: responsiveHeight(1),
        marginLeft: responsiveWidth(6),
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1,
        borderColor:"#000"
    },
    checkboxname: {
        fontSize: 22,
        fontWeight: "bold",
        opacity: .6
    },
    orderphoto:{
        width:responsiveWidth(100),
        height: responsiveHeight(50),
        borderBottomRightRadius : 10,
        borderBottomLeftRadius:10
    },


    modelicon :{
        display:"flex",
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center", 
        width:responsiveWidth(80), 
        paddingVertical:responsiveHeight(3)
    },
    modelAlertlabel: {
        fontSize: responsiveFontSize(3),
        opacity: .7,
        textAlign: "center",
        width:responsiveWidth(80),
        marginTop: 5
    },
    modelalertdec: {
        fontSize:responsiveFontSize(2.3),
        marginHorizontal: responsiveWidth(10),
        opacity:.6,
        textAlign:"center",
        width:responsiveWidth(60)
    },

    modelAlertbtn: {
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveWidth(1),
        backgroundColor: "#56BC1F",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },

});

export { styles }

// #56BC1F green
