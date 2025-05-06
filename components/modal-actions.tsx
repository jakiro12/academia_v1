import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native"
import styles from '../styles/option-styles'
import { useContext,  useState } from "react"
import {  doc, getDoc, updateDoc } from "firebase/firestore"
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
          
          const {auxIndex, studentsType} = context;
    
    const handleDate = (field: string, value: string) => {
        setAddDate((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };
    const addStudentData = async () => {
        if(addDate.dia === '' || addDate.hora === '') return Alert.alert('debes completar los campos')
        try {
            const docRef = doc(firebaseconn, "escuela", studentsType);

            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                const alumnos = data?.alumnos || [];
                if (auxIndex !== null) {
                    const updatedAgenda = alumnos[auxIndex].asistencia.agenda;
                    updatedAgenda.push({
                        dia: addDate.dia,
                        hora: addDate.hora
                    });
                    await updateDoc(docRef, {
                        alumnos: alumnos.map((student: any, index: number) => 
                            index === auxIndex
                                ? { ...student, asistencia: { ...student.asistencia, agenda: updatedAgenda } }
                                : student
                        )
                    });
                    console.log("Agenda agregada con éxito.");
                    onCloseModal(false);
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
                <Text style={{width:'auto',fontSize:18,fontWeight:400,textDecorationLine:'underline'}}>
                    Historial de asistencias
                </Text>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{width:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {data.map((e,i)=><Text 
                                    key={i}
                                    style={{fontSize:16}}>{e}</Text>)}
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
                <Text style={{width:'auto',fontSize:18,fontWeight:400,textDecorationLine:'underline'}}>
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
                    style={{width:'auto',height:'auto',backgroundColor:'#FAF3E0',padding:8,borderRadius:5}}
                >
                    <Text style={{fontSize:16}}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:'auto',height:'auto',backgroundColor:'#FAF3E0',padding:8,borderRadius:5}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text style={{fontSize:16}}>Cancelar</Text>
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