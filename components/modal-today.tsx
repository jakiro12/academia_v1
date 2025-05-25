import { View, Modal, TouchableOpacity, Text, TextInput } from "react-native"
import styles from '../styles/option-styles'
import { StudentData } from "@/constants/stateTypes"
import { useContext, useState } from "react"
import { firebaseconn } from "@/firebaseconn/conn"
import { StudentsContext } from "@/app/_layout"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { shortFormatDate } from "@/utils/dateUtils"

interface TodayStudentsDataType{
    verifyStudent:boolean
    studentSelected: StudentData | null
    setVerifyStudent: React.Dispatch<React.SetStateAction<boolean>>
}

const TodayStudentsActions: React.FC<TodayStudentsDataType>=({verifyStudent,studentSelected,setVerifyStudent })=>{
  const [attended,setAttended]=useState<string>('')
  const [amount,setAmount]=useState<string>('')
  const context = useContext(StudentsContext);
  
  if (!context) throw new Error("StudentsContext no está disponible");    
  const { studentsType, auxIndex } = context;
   const addAttended = async () => {
          try {
              const docRef = doc(firebaseconn, "escuela", studentsType);  
              const docSnap = await getDoc(docRef);              
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  const alumnos = data?.alumnos || [];
                  if (auxIndex !== null) {
                      const updatedAgenda = alumnos[auxIndex].asistencia.historial;
                      updatedAgenda.push(shortFormatDate);
                      await updateDoc(docRef, {
                          alumnos: alumnos.map((student: any, index: number) => 
                              index === auxIndex
                                  ? { ...student, asistencia: { ...student.asistencia, historial: updatedAgenda } }
                                  : student
                          )
                      });
                      console.log("Asistencia agregada con éxito.");
                  } else {
                      console.error("Alumno no encontrado.");
                  }
              } else {
                  console.error("El documento no existe.");
              }
          } catch (error) {
              console.error("Error al agregar la fecha:", error);
          }
      };
    const handleSendStudentData=()=>{
      if(attended  && amount.length > 0){
        console.log('enviar fecha y monto')
        return //cortar flujo
      }else if(attended.length > 0 && amount.length > 0){
        console.log('enviar solo el dinero')
      }else{
        console.log('no envia dinero y no asistio')
      }
    }
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
                  <View style={styles.paymentsBox}>
                    <Text>Tipo de pago:</Text>
                    <View style={styles.paymentsBtnsContainer}>
                    <TouchableOpacity
                      onPress={()=>setAttended('diario')}
                      style={styles.btnPaymentOption}
                    >                      
                      <Text>Diario</Text>
                    </TouchableOpacity>
                     <TouchableOpacity
                      onPress={()=>setAttended('diario')}
                      style={styles.btnPaymentOption}
                    >                      
                      <Text>Deuda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>setAttended('mensual')}
                      style={styles.btnPaymentOption}
                    >
                      <Text>Mensual</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',columnGap:20}}>
                    <Text>Monto a pagar:</Text>
                    <TextInput 
                      value={amount}
                      onChangeText={(text)=>setAmount(text)}
                      keyboardType="number-pad"
                      placeholder="Monto a ingresar"
                      style={{width:'40%',height:40,borderRadius:5,backgroundColor:'#ffffff'}}
                    />
                  </View>
                  <View style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <TouchableOpacity
                    style={{backgroundColor:'#A8D5BA',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={handleSendStudentData}
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