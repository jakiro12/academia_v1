import { StudentsContext } from "@/app/_layout";
import { firebaseconn } from "@/firebaseconn/conn";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import styles from '../../../styles/option-styles'
import { StudentData } from "@/constants/stateTypes";
import { currentMonth } from "@/utils/dateUtils";

type Payment = {
    fecha:string,
    tipo:string,
    valor:string,
}

const SeeEarningsByLevel =()=>{
    const [loading,setLoading]=useState<boolean>(false)
    const [payments,setPayments]=useState<Payment[]>([])
    const [studentsCount,setStudentsCount]=useState<number | null>(null)
    const [monthSelected,setMonthSelected]=useState<string>(currentMonth)
    const context = useContext(StudentsContext);
    if (!context) throw new Error("StudentsContext no está disponible");       
    const {studentsType}=context    
    const allMonths : Array<string> = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
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
        const renderMonthRow = (start: number, end: number) => (
    <View style={styles.boxEachMonthBtns}>
        {allMonths.slice(start, end).map((e, i) => (
            <TouchableOpacity 
                key={i} 
                style={[styles.monthsBtn,{opacity: String((allMonths.findIndex((month)=> month === e) + 1)).padStart(2,'0') === monthSelected ? 1 : 0.5}]}
                onPress={()=>setMonthSelected(String((allMonths.findIndex((month)=> month === e) + 1)).padStart(2,'0'))}
                >
                <Text style={{ width: 'auto', height: 'auto' }}>{e}</Text>
            </TouchableOpacity>
        ))}
    </View>
);
useEffect(()=>{
    console.log(monthSelected)
},[monthSelected])
    return(
       <View style={styles.container}>
            <View style={styles.infoCardStudent}>
            <Text style={{width:'auto',height:40,fontSize:20,marginInline:'auto'}}>
                Rendimientos actuales
            </Text>
            {
                loading ? <ActivityIndicator size={24} color="#ff0000"/>
                :
                <View style={{width:'100%',height:'90%',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexDirection:'column'}}>
                    <View style={styles.boxAboutAllEarnings}>
                          <View style={styles.boxAboutBothEarnings}>
                                <View style={styles.cardAmountEarnings}>
                                    <Text>
                                        Ingresos:
                                    </Text>                                     
                                    <Text style={{fontSize:18}}>
                                        {handleEarnings()}                                    
                                    </Text>
                                </View>
                                <View style={styles.cardAmountEarnings}>
                                    <Text>
                                        Deudas:
                                    </Text>
                                    <Text style={{fontSize:18}}>
                                        {handleDebts()}
                                    </Text>
                                </View>
                          </View>  
                          <View style={styles.cardFullEarnings}>
                            <Text>
                                Neto:
                            </Text>
                            <Text style={{fontSize:18}}>
                                {handleEarnings() - handleDebts()}
                            </Text>
                          </View>
                    </View>
                    
                    <View style={styles.studentsSizeData}>
                        <View style={styles.boxStudentsSizeData}>
                            <Text>Alumnos totales</Text>
                            <Text>{studentsCount}</Text>
                        </View>
                        <View style={styles.boxStudentsSizeData}>
                            <Text>
                                Horas impartidas
                            </Text>
                            <Text>
                                XX
                            </Text>
                        </View>
                    </View>
                    <View style={styles.displayMonthsAmount}>
                        <View style={{width:'25%',height:'100%'}}>
                            <Text>Ingresos generados</Text>
                            <Text>Monto</Text>
                        </View>
                       <View style={styles.containerMonthsBox}>
                            {renderMonthRow(0,4)}
                            {renderMonthRow(4,8)}
                            {renderMonthRow(8,12)}
                       </View>
                    </View>
            </View>
            }            
        </View>
        </View>
    )
}

export default SeeEarningsByLevel