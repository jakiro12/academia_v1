import { Text, TouchableOpacity, View } from "react-native"
import styles from '../../styles/list-styles'
import { router } from "expo-router";


const FullListStudents =()=>{        
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/option/option')}
            >
                <Text style={styles.boxText}>
                  Todos los estudiantes
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/today/today')}
            >
                <Text style={styles.boxText}>
                 Asisten Hoy
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/addStudent/addStudent')}
            >
                <Text style={styles.boxText}>
                   Agregar nuevo estudiante
                </Text>
            </TouchableOpacity>     
              <TouchableOpacity style={styles.boxOptions}
                onPress={()=>router.push('/list/earnings/earning')}
            >
                <Text style={styles.boxText}>
                   Ingresos acumulados
                </Text>
            </TouchableOpacity>            
        </View>
    )
}
export default FullListStudents