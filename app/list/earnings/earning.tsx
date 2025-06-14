import { StudentsContext } from "@/app/_layout";
import { firebaseconn } from "@/firebaseconn/conn";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native"
import styles from '../../../styles/option-styles'
import { StudentData } from "@/constants/stateTypes";

type Payment = {
    fecha:string,
    tipo:string,
    valor:string,
}

const SeeEarningsByLevel =()=>{
    const [loading,setLoading]=useState<boolean>(false)
    const [payments,setPayments]=useState<Payment[]>([])
    const [studentsCount,setStudentsCount]=useState<number | null>(null)

    const context = useContext(StudentsContext);
    if (!context) throw new Error("StudentsContext no está disponible");       
    const {studentsType}=context
   const findStudentsDataType=async()=>{
          setLoading(true)
          try {
              const docRef = doc(firebaseconn, "escuela", studentsType);
              const docSnap = await getDoc(docRef);
          
              if (docSnap.exists()) {
                  let res=docSnap.data().alumnos 
                  setStudentsCount(res.length)
                  let allPayments=res.flatMap((alumno : StudentData)=>alumno.pagos)
                  setPayments(allPayments)                  
              } else {
                console.log("No se encontró el documento");
              }
            } catch (error) {
              console.log("Error al obtener documento:", error);
            }finally{
              setLoading(false)
            }          
        }
        useEffect(()=>{
          findStudentsDataType()
        },[])
        const handleDebts = () =>{
             return payments.reduce((total, pago) => {
                if (pago.tipo === "deuda") {
                return total + parseInt(pago.valor, 10); // o Number(pago.valor)
                }
                return total;
            }, 0);
        }
        const handleEarnings=()=>{
             return payments.reduce((total, pago) => {
                if (pago.tipo !== "deuda") {
                return total + parseInt(pago.valor, 10); // o Number(pago.valor)
                }
                return total;
            }, 0);
        }
    return(
       <View style={styles.container}>
            <View style={styles.infoCardStudent}>
            <Text style={{width:'auto',height:40,fontSize:20,marginInline:'auto'}}>
                Rendimientos actuales
            </Text>
            {
                loading ? <ActivityIndicator size={24} color="#ff0000"/>
                :
                <View style={{width:'100%',height:'70%',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexDirection:'column'}}>
                    <View style={styles.boxAboutAllEarnings}>
                          <View style={styles.boxAboutBothEarnings}>
                                <Text style={styles.cardAmountEarnings}>
                                    Ingresos: {handleEarnings()}
                                </Text>
                                <Text style={styles.cardAmountEarnings}>
                                    Deudas: {handleDebts()}
                                </Text>
                          </View>  
                          <Text style={styles.cardFullEarnings}>
                            Neto: {handleEarnings() - handleDebts()}
                          </Text>
                    </View>
                    
                    <View style={{width:'100%',height:'20%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{width:'auto',height:'auto',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',rowGap:10}}>
                            <Text>Alumnos totales</Text>
                            <Text>{studentsCount}</Text>
                        </View>
                        <View style={{width:'auto',height:'auto',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',rowGap:10}}>
                            <Text>
                                Horas impartidas
                            </Text>
                            <Text>
                                XX
                            </Text>
                        </View>
                    </View>
            </View>
            }
            
        </View>
        </View>
    )
}

export default SeeEarningsByLevel