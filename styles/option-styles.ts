import { StyleSheet,ImageStyle,ViewStyle,TextStyle, Dimensions } from "react-native";

interface OptionScreen{
    container:ViewStyle
    boxOptions:ViewStyle
    containerScroll:ViewStyle
    infoCardStudent:ViewStyle
    wspBtn:ViewStyle
    fontInfo:TextStyle
    schoolSubjects:TextStyle
    boxSubjects:ViewStyle
    schoolSubjectsBoxes:ViewStyle
    boxSubjectsContainer:ViewStyle
    infoCardStudentAssit:ViewStyle
    btnTurns:ViewStyle
}
const { width } = Dimensions.get("window");
const optionStyles :  OptionScreen = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FAF3E0',
    },
    containerScroll:{
        width:width * 0.9,
        rowGap:15,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:10,            
    },
    boxOptions:{
        width:'100%',
        height:120,        
        borderRadius:15,
        marginTop:20,
        backgroundColor:'#F4A261',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    infoCardStudent:{
        width:'90%',
        height:'80%',
        backgroundColor:'#F4A261',
        borderRadius:15,
        padding:10,
        rowGap:10
    },
    wspBtn:{
        width:120,
        height:35,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        columnGap:10,
        backgroundColor:'#25d366',
        borderRadius:5
    },
    fontInfo:{
        width:'auto',
        height:'auto',
        fontWeight:'bold',
        fontSize:18
    },
    boxSubjectsContainer:{
        width:'100%',
        height:'auto',
        flexDirection:'column',
        display:'flex',
        alignItems:'center'
    },
    boxSubjects:{
      width: '100%',
      backgroundColor:'#f89b4e',
      borderBottomColor:'#FAF3E0',
      borderBottomWidth:1 
    },
    schoolSubjects:{
        width:'auto',
        height:'auto',
        fontWeight:'bold',
        fontSize:18,
        textDecorationLine:'underline'
    },
    schoolSubjectsBoxes:{
        height: 40,                               
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    infoCardStudentAssit:{
        width:'90%',
        height:'80%',
        backgroundColor:'#F4A261',
        borderRadius:15,
        padding:10,
        rowGap:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    btnTurns:{
        marginTop: 10,backgroundColor:'#264653',width:100,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',height:35 
    }
})

export default optionStyles