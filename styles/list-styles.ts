import { StyleSheet,ImageStyle,ViewStyle,TextStyle } from "react-native";

interface ListScreen{
    container:ViewStyle
    boxOptions:ViewStyle
}
const listStyles :  ListScreen = StyleSheet.create({
    container:{
        width:'100%',
        rowGap:15,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#FAF3E0',
        paddingTop:10,
        height:'100%'
    },
    boxOptions:{
        width:'90%',
        height:120,        
        borderRadius:15,
        marginTop:20,
        backgroundColor:'#F4A261',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        boxShadow:'2px 2px 5px 0pxrgba(0, 0, 0, 0.34)',        
    },
})

export default listStyles