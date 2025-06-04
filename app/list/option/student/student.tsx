import { ActivityIndicator, Linking, Text, TouchableOpacity, View } from "react-native"
import styles from '../../../../styles/option-styles'
import { StudentsContext } from "@/app/_layout"
import { useContext,  useState } from "react"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AntDesign } from "@expo/vector-icons";
import ModalCustomActions from "@/components/modal-actions";
import { router } from "expo-router";
import { shortFormatDate } from "@/utils/dateUtils";
import { firebaseconn } from "@/firebaseconn/conn";
import { getDoc, doc,updateDoc  } from "firebase/firestore";

const InformationStudent = () => {
    const context = useContext(StudentsContext);
    const [checkDates,setCheckDates]=useState<boolean>(false)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [modalType,setModalType]=useState<string>('see')
    const [loading,setLoading]=useState<boolean>(false)


    if (!context) {
        throw new Error("MyComponent debe usarse dentro de StudentsProvider");
    }

    const { studentInformation,studentsType, auxIndex } = context;
   const addAttended = async () => {
         setLoading(true)
             try {
                 const docRef = doc(firebaseconn, "escuela", studentsType);  
                 const docSnap = await getDoc(docRef)              
                 if (docSnap.exists()) {
                     const data = docSnap.data();
                     const alumnos = data?.alumnos || [];
                     if (auxIndex !== null) {
                         const updatedAgenda = alumnos[auxIndex].asistencia.historial;
                         updatedAgenda.push(shortFormatDate);
                         await updateDoc(docRef, {
                             alumnos: alumnos.map((student: any, index: number) => 
                                 index === auxIndex
                                     ? { ...student, asistencia: { ...student.asistencia, historial: updatedAgenda } }
                                     : student
                             )
                         });
                         console.log("Asistencia agregada con éxito.");
                     } else {
                         console.error("Alumno no encontrado.");
                     }
                 } else {
                     console.error("El documento no existe.");
                 }
             } catch (error) {
                 console.error("Error al agregar la fecha:", error);
             }finally{
               setLoading(false)
             }
         };
    const handleExternalLinks = (phone: string) => {
        Linking.openURL(`https://wa.me/${phone}`)
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };
    const handleTurnsOption=(action:string)=>{
        setCheckDates(true)
        setModalType(action)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.infoCardStudent}>
                <Text style={styles.fontInfo}>{studentInformation.nombre}</Text>

                {studentInformation.telefonos.map((e, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.wspBtn}
                        onPress={() => handleExternalLinks(e.telefono)}
                    >
                        <FontAwesome5 name="whatsapp" size={24} color="white" />
                        <Text style={[styles.fontInfo,{color:'#ffffff'}]}>{e.nombre}</Text>
                    </TouchableOpacity>
                ))}

                <Text style={styles.fontInfo}>{studentInformation.establecimiento}</Text>
                <Text style={styles.schoolSubjects}>Materias:</Text>
                <View style={styles.boxSubjectsContainer}>
                {studentInformation.materias.map((materia, index) => (
                    <View key={index} style={styles.boxSubjects}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.schoolSubjectsBoxes}                            
                            onPress={() => toggleExpand(index)}
                        >
                            <Text>{materia.nombre}</Text>
                            <AntDesign
                                name={expandedIndex === index ? "up" : "down"}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>

                        {expandedIndex === index && (
                            <View style={{ padding: 10,backgroundColor:'#FAF3E0' }}>
                                {materia.temas.map((tema, i) => (
                                    <Text key={i} style={{ marginLeft: 10 }}>{tema}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
                </View>
                <View style={styles.btsExtraActionsStudent}>
                    <TouchableOpacity style={styles.btnTurns}
                        onPress={()=>handleTurnsOption('see')}
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>Ver historial</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnTurns}
                        onPress={()=>handleTurnsOption('')}
                    >
                    <Text style={{ fontSize: 18, color: '#ffffff' }}>Agregar turno</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btsExtraActionsStudent}>
                {
                    loading ? <ActivityIndicator size={18} color='#ffffff'/>
                    :
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnTurns}
                        onPress={addAttended}
                    >
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>Asistencia +</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnTurns}
                    onPress={()=>router.push('/list/option/student/payments/payments')}
                >
                <Text style={{ fontSize: 18, color: '#ffffff' }}>Ver pagos</Text>
                </TouchableOpacity>
                </View>
            </View>
            <ModalCustomActions 
                checkDates={checkDates} 
                onCloseModal={setCheckDates} 
                modalType={modalType}
                data={studentInformation.asistencia.historial}
                />
        </View>
    );
};

export default InformationStudent;
