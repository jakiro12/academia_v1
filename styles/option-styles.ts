import { StyleSheet,ImageStyle,ViewStyle,TextStyle, Dimensions } from "react-native";

interface OptionScreen{
    container:ViewStyle
    boxOptions:ViewStyle
    containerScroll:ViewStyle
    infoCardStudent:ViewStyle
    wspBtn:ViewStyle
    fontInfo:TextStyle
    boxSubjects:ViewStyle
    schoolSubjectsBoxes:ViewStyle
    boxSubjectsContainer:ViewStyle
    infoCardStudentAssit:ViewStyle
    btnTurns:ViewStyle
    paymentsBox:ViewStyle
    paymentsBtnsContainer:ViewStyle
    btnPaymentOption:ViewStyle
    assistContainerBox:ViewStyle
    textModayTodalDescription:TextStyle
    actionBtns:ViewStyle
    boxBtnTitleAction:ViewStyle
    btsExtraActionsStudent:ViewStyle
    scrollHistoryPaymentsContainer:ViewStyle
    cardHistoryPayments:ViewStyle
    cardHistoryPaymentsData:ViewStyle
    cardHistoryPaymentsBtn:ViewStyle
    boxAboutBothEarnings:ViewStyle
    boxAboutAllEarnings:ViewStyle
    cardAmountEarnings:ViewStyle
    cardFullEarnings:ViewStyle
    boxNewStudentData:ViewStyle
    inputNewStudentData:TextStyle
    newStudentDataDay:ViewStyle
    newStudentDataFixedDay:ViewStyle
    btnSendActionContainer:ViewStyle
    btnSubmitAction:ViewStyle
    btnRejectAction:ViewStyle
    textBtnActions:TextStyle
    textNewStudentData:TextStyle
    studentsSizeData:ViewStyle
    boxStudentsSizeData:ViewStyle
    monthsBtn:ViewStyle
    boxEachMonthBtns:ViewStyle
    containerMonthsBox:ViewStyle
    displayMonthsAmount:ViewStyle
    fontInfoSchool:TextStyle
    fontInfowsp:TextStyle
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
        width:width,
        rowGap:15,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:10, 
        paddingBottom:10,        
    },
    boxOptions:{
        width:'90%',
        height:100,        
        borderRadius:15,
        marginTop:20,
        backgroundColor:'#F4A261',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        boxShadow:'2px 2px 5px 0pxrgba(0, 0, 0, 0.34)',
    },
    infoCardStudent:{
        width:'90%',
        height:'80%',
        backgroundColor:'#FDD48A',
        borderRadius:15,
        boxShadow:'2px 2px 5px 0pxrgba(0, 0, 0, 0.34)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        overflow:'hidden'
    },
    wspBtn:{
        width:120,
        height:35,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        columnGap:10,
        backgroundColor:'#25d366',
        borderRadius:5,
        paddingLeft:10
    },
    fontInfo:{
        width:'auto',
        height:'auto',
        fontWeight:600,
        fontSize:26,
        color:'#264653'
    },
    fontInfowsp:{
        width:'auto',
        height:'auto',
        fontWeight:600,
        fontSize:20,
        color:'#FDD48A'
    },
    fontInfoSchool:{
        width:'auto',
        height:'auto',
        fontWeight:600,
        fontSize:20,
        color:'#264653'
    },
    boxSubjectsContainer:{
        width:'100%',
        height:'auto',
        flexDirection:'column',
        display:'flex',
        alignItems:'center',                
        overflow:'hidden',
        borderRadius:7,
        rowGap:3
    },
    boxSubjects:{
      width: '100%',
      backgroundColor:'#f89b4e',      
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
        marginTop: 10,
        backgroundColor:'#264653',
        width:'46%',
        borderRadius:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',height:35 
    },
    paymentsBox:{
        width:'100%',
        height:'15%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between'
    },
    paymentsBtnsContainer:{
        width:'100%',
        height:50,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    btnPaymentOption:{
        width:'auto',
        height:'auto',
        backgroundColor:'#FAF3E0',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:6,
        borderRadius:4
    },
    assistContainerBox:{
        width:'100%',
        height:'90%',        
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    textModayTodalDescription:{ 
        width:'auto',
        height:30,
        fontSize:18,
        fontWeight:500
    },
    actionBtns:{
      width: 'auto',
      backgroundColor:'#f89b4e',
      borderColor:'#FAF3E0',
      borderWidth:1,
      height:'100%',
      paddingInline:10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      borderRadius:10
    },
    boxBtnTitleAction:{
        width:'100%',
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        columnGap:30
    },
    btsExtraActionsStudent:{
        width:'100%',
        height:'auto',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    scrollHistoryPaymentsContainer:{
        width:'100%',
        height:'70%'
    },
    cardHistoryPayments:{
        width:'80%',
        height:90,
        borderRadius:10,
        marginRight:'auto',
        backgroundColor:'#FAF3E0',
        display:'flex',
        flexDirection:'row'
    },
    cardHistoryPaymentsData:{
        width:'80%',
        height:'100%',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'flex-start',
        flexDirection:'column',
        paddingLeft:5
    },
    cardHistoryPaymentsBtn:{
        width:'20%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    boxAboutBothEarnings:{
        width:'auto',
        height:'40%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        columnGap:20
    },
    boxAboutAllEarnings:{
        width:'100%',
        height:'25%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardAmountEarnings:{
        width:'30%',
        height:'100%',               
        borderRadius:10,
        backgroundColor:'#FDD48A',
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'column',
        alignItems:'center',
        borderColor:'#00000041',
        borderWidth:1
    },
    cardFullEarnings:{
        width:'30%',
        height:'40%',                     
        backgroundColor:'#FDD48A',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:10,
        borderColor:'#00000041',
        borderWidth:1
    },
    boxNewStudentData:{
         width: '100%', 
         height: '12%', 
         display: 'flex', 
         flexDirection: 'column', 
         alignItems: 'flex-start', 
         justifyContent: 'space-between' 
    },
    inputNewStudentData:{
         width: '100%', 
         height: 40, 
         borderBottomWidth: 1, 
         borderBottomColor: '#000000' 
    },
    newStudentDataDay:{
        width:'100%',
        height:'50%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    newStudentDataFixedDay:{
        width:40,
        height:40,
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    btnSendActionContainer:{ 
        width: '100%', 
        height: '10%', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around' 
    },
    btnSubmitAction:{
        backgroundColor: '#A8D5BA', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 8, 
        borderRadius: 5 
    },
    btnRejectAction:{ 
        backgroundColor: '#264653', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 8, 
        borderRadius: 5 
    },
    textBtnActions:{ 
        width: 'auto', 
        height: 'auto', 
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 20 
    },
    textNewStudentData:{
        width:'auto',
        height:'auto',
        fontSize:18,
    },
    studentsSizeData:{
        width:'100%',
        height:'20%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    boxStudentsSizeData:{
        width:'auto',
        height:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        rowGap:10
    },
    monthsBtn:{
        width:45,
        height:45,
        borderRadius:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FDD48A',
    },
    boxEachMonthBtns:{
        width:'100%',
        height:'30%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    containerMonthsBox:{
        width:'65%',
        height:'100%',
        rowGap:5
    },
    displayMonthsAmount:{
        width:'100%',
        height:'38%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',        
    }
})

export default optionStyles