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
    const [allHours,setAllHours]=useState<string[]>([])
    const [numberOfClasses,setNumberOfClasses]=useState<number[]>([])
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
                  let allHoursForEachStudent = res.flatMap((alumno:any)=>alumno.asistencia.carga_horaria)
                  let allClassesforEachStudent = res.flatMap((alumno:any)=>alumno.asistencia.historial.length)
                  setPayments(allPayments)
                  setAllHours(allHoursForEachStudent) 
                  setNumberOfClasses(allClassesforEachStudent)   
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
                return total + parseInt(pago.valor, 10) 
                }
                return total
            }, 0)
        }
        const handleEarnings=()=>{
             return payments.reduce((total, pago) => {
                if (pago.tipo !== "deuda") {
                return total + parseInt(pago.valor, 10)
                }
                return total
            }, 0)
        }
        const renderMonthRow = (start: number, end: number) => (
    <View style={styles.boxEachMonthBtns}>
        {allMonths.slice(start, end).map((e, i) => (
            <TouchableOpacity 
                key={i} 
                style={[styles.monthsBtn,{backgroundColor: String((allMonths.findIndex((month)=> month === e) + 1)).padStart(2,'0') === monthSelected ? '#264653' : '#A8D5BA'}]}
                onPress={()=>setMonthSelected(String((allMonths.findIndex((month)=> month === e) + 1)).padStart(2,'0'))}
                >
                <Text style={{ width: 'auto', height: 'auto',color: String((allMonths.findIndex((month)=> month === e) + 1)).padStart(2,'0') === monthSelected ? '#ffffff' : '#264653',fontWeight:'bold' }}>{e}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

    const handleMonthEarnings = () => {
    return payments.reduce((total, pago) => {
        const mesPago = pago.fecha.slice(3, 5) 
        if (pago.tipo !== "deuda" && mesPago === monthSelected) {
        return total + parseInt(pago.valor, 10)
        }
        return total
    }, 0)
    }    
    const handleAllHoursofClasses = ():number => {
      return numberOfClasses.reduce((suma, valor, i) => 
      suma + valor * Number(allHours[i]), 0
  );
    }
    return(
       <View style={styles.container}>
            <View style={[styles.infoCardStudent,{justifyContent:'space-around'}]}>
           
            {
                loading ? <ActivityIndicator size={34} color="#264653"/>
                :
                <>
                <Text style={{width:'auto',height:40,fontSize:24,marginInline:'auto',color:'#264653',fontWeight:'bold'}}>
                Rendimientos actuales
                </Text>
                <View style={{width:'100%',height:'90%',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexDirection:'column'}}>
                    <View style={styles.boxAboutAllEarnings}>                          
                                <View style={styles.cardAmountEarnings}>
                                    <Text style={{color:'#264653'}}>
                                        Ingresos:
                                    </Text>                                     
                                    <Text style={{fontSize:18,color:'#ffffff'}}>
                                        {handleEarnings()}                                    
                                    </Text>
                                </View>
                                <View style={styles.cardAmountEarnings}>
                                    <Text style={{color:'#264653'}}>
                                        Deudas:
                                    </Text>
                                    <Text style={{fontSize:18,color:'#ffffff'}}>
                                        {handleDebts()}
                                    </Text>
                                </View>                          
                          <View style={styles.cardAmountEarnings}>
                            <Text style={{color:'#264653'}}>
                                Neto: 
                            </Text>
                            <Text style={{fontSize:18,color:'#ffffff'}}>
                                {handleEarnings() - handleDebts()}
                            </Text>
                          </View>
                    </View>
                    
                    <View style={styles.studentsSizeData}>
                        <View style={styles.boxStudentsSizeData}>
                            <Text style={{color:'#264653'}}>Alumnos totales</Text>
                            <Text style={{color:'#264653'}}>{studentsCount}</Text>
                        </View>
                        <View style={styles.boxStudentsSizeData}>
                            <Text style={{color:'#264653'}}>
                                Horas impartidas
                            </Text>
                            <Text style={{color:'#264653'}}>
                                {handleAllHoursofClasses()}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.displayMonthsAmount}>
                        <View style={{width:'75%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',rowGap:10}}>
                            <Text style={{fontSize:16,width:'100%',height:'auto',color:'#264653',fontWeight:'bold'}}>Ingresos:</Text>
                            <Text style={{fontSize:18,fontWeight:'bold',height:'auto',width:'100%',color:'#264653'}}>{handleMonthEarnings()}</Text>
                        </View>
                       <View style={styles.containerMonthsBox}>
                            {renderMonthRow(0,4)}
                            {renderMonthRow(4,8)}
                            {renderMonthRow(8,12)}
                       </View>
                    </View>
            </View>
            </>
            }            
        </View>
        </View>
    )
}

export default SeeEarningsByLevel