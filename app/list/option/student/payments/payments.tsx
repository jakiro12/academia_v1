import { Modal, ScrollView, Text,TouchableOpacity,View } from "react-native"
import styles from '../../../../../styles/option-styles'
import { StudentsContext } from "@/app/_layout";
import { useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DebtsStudentActions from "@/components/modal-debts";

const PaymentHistory=()=>{
    const [updateDebts,setUpdateDebts]=useState<boolean>(false)
    const context = useContext(StudentsContext)
    if (!context) {
        throw new Error("MyComponent debe usarse dentro de StudentsProvider")
    }
    const { studentInformation } = context
    
    const debtAmounts=()=>{
        let filterByDebts=studentInformation.pagos.filter((e)=>e.tipo === 'deuda')
        if(filterByDebts.length === 0){
            return 0
        }else{
            let currentDebts=filterByDebts.reduce((acumulador,item)=>{
                return acumulador + Number(item.valor)
            },0)
           return currentDebts
        }
    }
    const summaryAmounts=()=>{
        let filterByNotDebts=studentInformation.pagos.filter((e)=>e.tipo !== 'deuda')
        if(filterByNotDebts.length === 0){
            return 0
        }else{
            let currentDebts=filterByNotDebts.reduce((acumulador,item)=>{
                return acumulador + Number(item.valor)
            },0)
           return currentDebts
        }
    }
    
    useEffect(()=>{
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.infoCardStudent}>
                <Text style={[styles.textModayTodalDescription,{marginInline:'auto'}]}>
                    Pagos percibidos
                </Text>
                <Text style={styles.textModayTodalDescription}>Pagos rebicidos: {summaryAmounts()}$</Text>
                <Text style={styles.textModayTodalDescription}>Debe: {debtAmounts()}$</Text>
                <Text style={styles.textModayTodalDescription}>Neto: {summaryAmounts() - debtAmounts()}$</Text>
                <View style={styles.scrollHistoryPaymentsContainer}>
                    <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>             
                        {studentInformation.pagos.map((payment,index)=>(
                            <View 
                                key={index}
                                style={styles.cardHistoryPayments}
                                >
                                <View style={styles.cardHistoryPaymentsData}>
                                    <Text>Tipo de pago: {payment.tipo}</Text>
                                    <Text style={{color:payment.tipo === 'deuda' ? '#B71C1C' : '#4CAF50'}}>Valor: {payment.valor}</Text>
                                    <Text>Fecha de pago: {payment.fecha}</Text>
                                </View>
                                {
                                    payment.tipo === 'deuda' ?
                                <View style={styles.cardHistoryPaymentsBtn}>
                                    <TouchableOpacity
                                        onPress={()=>setUpdateDebts(true)}
                                        style={{width:30,height:30,borderRadius:30}}
                                    >
                                        <AntDesign name="checkcircle" size={30} color="#B71C1C" />
                                    </TouchableOpacity>
                                </View>                                
                                : null
                                }
                            </View>
                        ))}
                    </ScrollView>
                </View>    
            </View>
            <DebtsStudentActions onCloseModal={setUpdateDebts} updateDebts={updateDebts}/>
        </View>
    )
}

export default PaymentHistory