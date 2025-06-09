import { StudentsContext } from "@/app/_layout";
import { firebaseconn } from "@/firebaseconn/conn";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native"
import styles from '../../../styles/option-styles'

const SeeEarningsByLevel =()=>{
    const [loading,setLoading]=useState<boolean>(false)
    const [payments,setPayments]=useState<any[]>([])

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
                  let allPayments=res.flatMap(alumno=>alumno.pagos)
                  console.log(allPayments)
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
            <Text>
                hola soy las ganancias
            </Text>
            {
                loading ? <ActivityIndicator size={24} color="#ff0000"/>
                :
                <>
                <Text>
                hola las deudas son: {handleDebts()}
            </Text>
            <Text>
                Holas las ganancias totales son: {handleEarnings()}
            </Text>
            <Text>
                Saldo a favor neto: {handleEarnings() - handleDebts()}
            </Text>
            </>
            }
            
        </View>
        </View>
    )
}

export default SeeEarningsByLevel