import { Text, TouchableOpacity, View } from "react-native"
import styles from '../../styles/list-styles'
import { router } from "expo-router";
import { StudentsContext } from "../_layout";
import { useContext } from "react";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { firebaseconn } from "@/firebaseconn/conn";
import { StatusBar } from "react-native";


const FullListStudents =()=>{
    const context = useContext(StudentsContext);
    if (!context) throw new Error("StudentsContext no está disponible");       
    const {studentsType}=context
    
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#FDD48A"/>            
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/option/option')}
            >
                <Text style={{fontSize:18,fontWeight:500}}>
                  Todos
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/today/today')}
            >
                <Text style={{fontSize:18,fontWeight:500}}>
                 Asisten Hoy
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/addStudent/addStudent')}
            >
                <Text style={{fontSize:18,fontWeight:500}}>
                   Agregar nuevo estudiante
                </Text>
            </TouchableOpacity>     
              <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/earnings/earning')}
            >
                <Text style={{fontSize:18,fontWeight:500}}>
                   Ingresos generados
                </Text>
            </TouchableOpacity>            
        </View>
    )
}
export default FullListStudents