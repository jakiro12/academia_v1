import { View, Modal, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native"
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
  const [attended,setAttended]=useState<string | null>(null)
  const [amount,setAmount]=useState<string>('')
  const [loading,setLoading]=useState<boolean>(false)
  const [typeAction,setTypeAction]=useState<boolean>(true)
  const context = useContext(StudentsContext);
  
  if (!context) throw new Error("StudentsContext no está disponible");    
  const { studentsType, auxIndex } = context;
   const addAttended = async () => {
      setLoading(true)
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
          }finally{
            setLoading(false)
          }
      };
    const handleSendStudentData = async () => {
    if (attended !== null && amount.length > 0 && studentSelected) {
    const newPayment = {
      tipo: attended,
      valor: amount,
      fecha: shortFormatDate,
    };
    setLoading(true)
    try {
      const docRef = doc(firebaseconn, "escuela", studentsType);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const alumnos = data?.alumnos || [];

        if (auxIndex !== null && alumnos[auxIndex]) {
          const pagosPrevios = alumnos[auxIndex].pagos || [];

          // Agrega el nuevo pago al array existente
          pagosPrevios.push(newPayment);

          // Actualiza en Firestore
          await updateDoc(docRef, {
            alumnos: alumnos.map((student: any, index: number) =>
              index === auxIndex
                ? { ...student, pagos: pagosPrevios }
                : student
            ),
          });
          addAttended()
          console.log("Pago registrado con éxito.");
          
        } else {
          console.error("Índice de alumno inválido.");
        }
      } else {
        console.error("Documento de alumnos no encontrado.");
      }
    } catch (error) {
      console.error("Error al guardar el pago:", error);
    }finally{
      setLoading(false)
      setVerifyStudent(false);
      setAmount('');
      setAttended(null);
    }

  } else {
    console.log("Debe seleccionar un tipo de pago y un monto.");
  }
};

    return(
        <Modal
            visible={verifyStudent}
            animationType="fade"
            transparent={true}
            >
              <View style={styles.container}>
               
                <View style={styles.infoCardStudentAssit}>
                  <View style={styles.boxBtnTitleAction}>
                    <TouchableOpacity
                      style={styles.actionBtns}
                      onPress={()=>setTypeAction(true)}
                    >
                      <Text
                        style={styles.textModayTodalDescription}
                      >Pagos</Text>                      
                    </TouchableOpacity>                  
                    <TouchableOpacity
                      style={styles.actionBtns}
                      onPress={()=>setTypeAction(false)}
                    >
                      <Text
                        style={styles.textModayTodalDescription}
                      >Asistencia</Text>
                    </TouchableOpacity>
                </View>
                 {typeAction ? 
                <>
                <Text style={{fontSize:20}}>{studentSelected?.nombre}</Text>                  
                  <Text style={{fontSize:20}}>Carga horaria: {studentSelected?.asistencia.carga_horaria}Hrs</Text>
                  <View style={styles.paymentsBox}>
                    <Text style={{fontSize:20}}>Tipo de pago:</Text>
                    <View style={styles.paymentsBtnsContainer}>
                    <TouchableOpacity
                      onPress={()=>setAttended('clase')}
                       style={[styles.btnPaymentOption,{opacity: attended === 'clase' ? 1 : 0.6}]}
                    >                      
                      <Text style={{fontSize:20}}>Clase</Text>
                    </TouchableOpacity>                     
                    <TouchableOpacity
                      onPress={()=>setAttended('mensual')}
                      style={[styles.btnPaymentOption,{opacity: attended === 'mensual' ? 1 : 0.6}]}
                    >
                      <Text style={{fontSize:20}}>Mensual</Text>
                    </TouchableOpacity>
                     <TouchableOpacity
                      onPress={()=>setAttended('fijo')}
                       style={[styles.btnPaymentOption,{opacity: attended === 'fijo' ? 1 : 0.6}]}
                    >
                      <Text style={{fontSize:20}}>Fijo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>setAttended('deuda')}
                      style={[styles.btnPaymentOption,{opacity: attended === 'deuda' ? 1 : 0.6}]}
                    >                      
                      <Text style={{fontSize:20}}>Deuda</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',columnGap:20}}>
                    <Text style={{fontSize:20}}>Monto a pagar:</Text>
                    <TextInput 
                      value={amount}
                      onChangeText={(text)=>setAmount(text)}
                      keyboardType="number-pad"
                      placeholder="Monto a ingresar"
                      style={{width:'40%',height:40,borderRadius:5,backgroundColor:'#ffffff'}}
                    />
                  </View>
                  <View style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  {
                    loading ? <ActivityIndicator size={20} color="#ffffff"/>
                    :
                  <TouchableOpacity
                    style={{backgroundColor:'#A8D5BA',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={handleSendStudentData}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold',fontSize:20}}>Enviar</Text>
                  </TouchableOpacity>
                  }

                    <TouchableOpacity
                    style={{backgroundColor:'#264653',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={()=>setVerifyStudent(false)}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold',fontSize:20}}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </> 
                :
                <View style={styles.assistContainerBox}>
                  <Text style={styles.textModayTodalDescription}>Asistencia de {studentSelected?.nombre}</Text>
                  <Text style={styles.textModayTodalDescription}>Fecha actual {shortFormatDate}</Text>
                   <View style={{width:'100%',height:'15%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  {
                    loading ? <ActivityIndicator size={20} color="#ffffff"/>
                    :
                  <TouchableOpacity
                    style={{backgroundColor:'#A8D5BA',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={addAttended}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold',fontSize:20}}>Enviar</Text>
                  </TouchableOpacity>
                  }

                    <TouchableOpacity
                    style={{backgroundColor:'#264653',display:'flex',justifyContent:'center',alignItems:'center',padding:8,borderRadius:5}}
                      onPress={()=>setVerifyStudent(false)}
                    >
                    <Text style={{width:'auto',height:'auto',color:'#ffffff',fontWeight:'bold',fontSize:20}}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                }
                    
                  
                  
                </View>
              </View>
          </Modal>
    )
}
export default TodayStudentsActions