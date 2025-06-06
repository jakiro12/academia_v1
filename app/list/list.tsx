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
    const agregarAlumnos = async () => {
        const nuevosAlumnos = [
          { nombre: "Alumno 4",           
            establecimiento:"Esculea X año x",
            asistencia:{
                carga_horaria:"2",
                agenda:["dia que debe venir"],
                fijo:true,
                historial:["dias que asitio"],
                dias_fijo:[
                    {dia:"lunes",hora:"20:00"}
                ]
            },
            materias:[
                {nombre:"matematica",temas:["tema_1","tema_2","tema_3"]}
            ],
            telefonos:[
                {nombre:"madre",telefono:"1231231231"},{padre:"123123131"}
            ]
             }                            
        ];
      
        try {
          const docRef = doc(firebaseconn, "escuela", studentsType);
      
          await updateDoc(docRef, {
            alumnos: arrayUnion(...nuevosAlumnos) // ¡con spread operator!
          });
      
          console.log("Alumnos agregados con éxito.");
        } catch (error) {
          console.error("Error al agregar alumnos:", error);
        }
      }; 
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#FDD48A"/>            
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/option/option')}
            >
                <Text style={{fontSize:18}}>
                  Todos
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/today/today')}
            >
                <Text style={{fontSize:18}}>
                   Hoy
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>console.log('agregar alumno')}
            >
                <Text style={{fontSize:18}}>
                   Agregar alumno en: {studentsType}
                </Text>
            </TouchableOpacity>     
              <TouchableOpacity style={styles.boxOptions}
                onPress={()=>console.log('Ver todo los ganado')}
            >
                <Text style={{fontSize:18}}>
                   Ingresos generados
                </Text>
            </TouchableOpacity>            
        </View>
    )
}
export default FullListStudents