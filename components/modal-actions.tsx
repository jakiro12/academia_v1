import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native"
import styles from '../styles/option-styles'
import { useContext, useState } from "react"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { firebaseconn } from "@/firebaseconn/conn"
import { StudentsContext } from "@/app/_layout"
interface ModalTypes{
    checkDates:boolean
    onCloseModal:React.Dispatch<React.SetStateAction<boolean>>
    modalType:string
    data:string[]
}

const ModalCustomActions:React.FC<ModalTypes>=({checkDates,onCloseModal,modalType,data})=>{
    const[addDate,setAddDate]=useState<{dia:string,hora:string}>({
        dia:'',
        hora:''
    })
    const context = useContext(StudentsContext);
          if (!context) throw new Error("StudentsContext no está disponible");
          
          const {auxIndex} = context;
    
    const handleDate = (field: string, value: string) => {
        setAddDate((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };
    const addStudentData = async () => {
        try {
            // Referencia al documento de la escuela (usando el nombre de la colección y documento)
            const docRef = doc(firebaseconn, "escuela", "primario");

            // Obtenemos el documento para acceder al array de alumnos
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                const alumnos = data?.alumnos || [];

                // Encontramos el índice del alumno por su nombre

                if (auxIndex !== null) {
                    // El alumno fue encontrado, agregamos el nuevo turno a su agenda
                    const updatedAgenda = alumnos[auxIndex].asistencia.agenda;
                    updatedAgenda.push({
                        dia: addDate.dia,
                        hora: addDate.hora
                    });

                    // Actualizamos el array de alumnos en Firestore
                    await updateDoc(docRef, {
                        alumnos: alumnos.map((student: any, index: number) => 
                            index === auxIndex
                                ? { ...student, asistencia: { ...student.asistencia, agenda: updatedAgenda } }
                                : student
                        )
                    });

                    console.log("Agenda agregada con éxito.");
                    onCloseModal(false); // Cerramos el modal después de agregar la agenda
                } else {
                    console.error("Alumno no encontrado.");
                }
            } else {
                console.error("El documento no existe.");
            }
        } catch (error) {
            console.error("Error al agregar la agenda:", error);
        }
    };
    return(
        <Modal
            visible={checkDates}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={[styles.infoCardStudent,{alignItems:'center'}]}>
                {modalType === 'see' ?
                <>
                <Text>
                    Historial de asistencias
                </Text>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{width:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {data.map((e,i)=><Text key={i}>{e}</Text>)}
                </ScrollView>
                <TouchableOpacity
                    style={{width:40,height:40,borderRadius:20,backgroundColor:'#FAF3E0',display:'flex',justifyContent:'center',alignItems:'center'}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text style={{fontSize:18,fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>     
                </>
                :
                <>
                <Text>
                    Agendar turno
                </Text>
                <TextInput
                    placeholder="ej: XX/XX/XX"
                    onChangeText={(text) => handleDate('dia', text)}
                    style={{width:200,height:40,borderRadius:5,backgroundColor:'#ffffff'}}
                />
                <TextInput
                    placeholder="ej: 10:00"
                    onChangeText={(text) => handleDate('hora', text)}
                    style={{width:200,height:40,borderRadius:5,backgroundColor:'#ffffff'}}
                />
                <View style={{width:'80%',height:60,display:'flex',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={addStudentData}
                    style={{width:'auto',height:'auto',borderColor:'#000000',borderWidth:1,padding:8,borderRadius:5}}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:'auto',height:'auto',borderColor:'#000000',borderWidth:1,padding:8,borderRadius:5}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text>Cancelar</Text>
                </TouchableOpacity>     
                </View>
                </>
            }
                </View>
            </View>
        </Modal>
    )
}
export default ModalCustomActions