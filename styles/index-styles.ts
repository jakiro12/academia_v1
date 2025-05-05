import { StyleSheet,ImageStyle,ViewStyle,TextStyle } from "react-native";

interface InitScreen{
    container:ViewStyle
    boxOptions:ViewStyle
    textDescription:TextStyle
}

const loginStyles : InitScreen = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',      
        backgroundColor:'#FAF3E0'        
    },
    boxOptions:{
        width:'90%',
        height:120,        
        borderRadius:15,
        marginTop:20,
        backgroundColor:'#F4A261',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    textDescription:{
        width:'auto',
        height:'auto',
        fontSize:22,
        fontWeight:'bold'
    }
})
export default loginStyles