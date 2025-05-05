import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native"
import styles from '../../../styles/option-styles'
import { StudentsContext } from "@/app/_layout"
import { useContext, useEffect, useState } from "react"
import { firebaseconn } from "@/firebaseconn/conn"
import {  doc, getDoc } from "firebase/firestore"
import { router } from "expo-router"
const OptionSelected=()=>{
      const [dataStudents,setDataStudents]=useState<any[]>([])
      const [loading,setLoading]=useState<boolean>(false)
      const context = useContext(StudentsContext);
      if (!context) throw new Error("StudentsContext no está disponible");
      
      const { studentsType, setStudentInformation, setAuxIndex } = context;

      const findStudentsDataType=async()=>{
        setLoading(true)
        try {
            const docRef = doc(firebaseconn, "escuela", studentsType);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                setDataStudents(docSnap.data().alumnos)
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
      const handleStudentInformation=(dataIndex:any)=>{
        setStudentInformation(dataStudents[dataIndex])
        setAuxIndex(dataIndex)
        router.push('/list/option/student/student')
      }
    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>             
               { loading ? 
                <ActivityIndicator  size={30}/>   
                :
                dataStudents.map((item, index) => 
                    <TouchableOpacity 
                      style={styles.boxOptions} 
                      key={index}
                      onPress={()=>handleStudentInformation(index)}
                    >
                        <Text style={{width:'auto',height:'auto',fontWeight:'bold',fontSize:18}}>{item.nombre}</Text>
                    </TouchableOpacity>
                )
            }
            </ScrollView>
        </View>
    )
}
export default OptionSelected