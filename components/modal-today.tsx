import { View, Modal, TouchableOpacity, Text, TextInput } from "react-native"
import styles from '../styles/option-styles'
import { StudentData } from "@/constants/stateTypes"

interface TodayStudentsDataType{
    verifyStudent:boolean
    studentSelected: StudentData | null
    setVerifyStudent: React.Dispatch<React.SetStateAction<boolean>>
}

const TodayStudentsActions: React.FC<TodayStudentsDataType>=({verifyStudent,studentSelected,setVerifyStudent })=>{
    return(
        <Modal
            visible={verifyStudent}
            animationType="fade"
            transparent={true}
            >
              <View style={styles.container}>
                <View style={styles.infoCardStudentAssit}>
                  {studentSelected &&(
                    <>
                    <Text>{studentSelected.nombre}</Text>                  
                  <Text>Carga horaria: {studentSelected.asistencia.carga_horaria}Hrs</Text>
                  <View style={{width:'100%',height:'10%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingRight:40}}>
                    <Text>Asistencia</Text>
                    <TouchableOpacity
                      style={{width:40,height:40,borderRadius:20,backgroundColor:'#FAF3E0',display:'flex',justifyContent:'center',alignItems:'center'}}
                    >                      
                      <Text>Si</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width:40,height:40,borderRadius:20,backgroundColor:'#FAF3E0',display:'flex',justifyContent:'center',alignItems:'center'}}
                    >
                      <Text>No</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',columnGap:20}}>
                    <Text>Monto pagado:</Text>
                    <TextInput 
                    keyboardType="number-pad"
                      placeholder="Monto a ingresar"
                      style={{width:'40%',height:40,borderRadius:5,backgroundColor:'#ffffff'}}
                    />
                  </View>
                  <View style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <TouchableOpacity
                    style={{backgroundColor:'#A8D5BA',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={()=>console.log('enviar')}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold'}}>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{backgroundColor:'#264653',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={()=>setVerifyStudent(false)}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold'}}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                    </>
                  )}
                  
                </View>
              </View>
          </Modal>
    )
}
export default TodayStudentsActions