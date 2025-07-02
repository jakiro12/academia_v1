import { StudentsContext } from "@/app/_layout";
import { firebaseconn } from "@/firebaseconn/conn";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
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
    const monthsLettersFirst=['ENE','FEB','MAR']

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
                    
                    <View style={{width:'100%',height:'20%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
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
                    <View style={{width:'100%',height:'35%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{width:'25%',height:'100%'}}>
                            <Text>Ver ingresos del mes</Text>
                            <Text>Mes a elegir</Text>
                        </View>
                       <View style={{width:'65%',height:'100%',rowGap:5}}>
                        <View style={{width:'100%',height:'30%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            {monthsLettersFirst.map((e,i)=>
                                <TouchableOpacity 
                                    style={{width:45,height:45,borderWidth:1,borderColor:'#000000',borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center'}}
                                    key={i} >
                                        <Text style={{width:'auto',height:'auto'}}>{e}</Text>
                                    </TouchableOpacity>
                            )}
                        </View>
                         <View style={{width:'100%',height:'30%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            {monthsLettersFirst.map((e,i)=>
                                <TouchableOpacity 
                                    style={{width:45,height:45,borderWidth:1,borderColor:'#000000',borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center'}}
                                    key={i} >
                                        <Text style={{width:'auto',height:'auto'}}>{e}</Text>
                                    </TouchableOpacity>
                            )}
                        </View>
                         <View style={{width:'100%',height:'30%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            {monthsLettersFirst.map((e,i)=>
                                <TouchableOpacity 
                                    style={{width:45,height:45,borderWidth:1,borderColor:'#000000',borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center'}}
                                    key={i} >
                                        <Text style={{width:'auto',height:'auto'}}>{e}</Text>
                                    </TouchableOpacity>
                            )}
                        </View>
                       </View>
                    </View>
            </View>
            }
            
        </View>
        </View>
    )
}

export default SeeEarningsByLevel