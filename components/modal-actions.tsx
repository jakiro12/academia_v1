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
                <Text style={{width:'auto',fontSize:22,fontWeight:500,color:'#264653'}}>
                    Historial de asistencias
                </Text>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{width:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {data.map((e,i)=><Text 
                                    key={i}
                                    style={{fontSize:16,color:'#264653'}}>{e}</Text>)}
                </ScrollView>
                <TouchableOpacity
                    style={{width:44,height:44,borderRadius:22,backgroundColor:'#264653',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#ffffff'}}>X</Text>
                </TouchableOpacity>     
                </>
                :
                <View style={{width:'100%',height:'auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',rowGap:10}}>
                <Text style={{width:'auto',fontSize:24,fontWeight:'bold',color:'#264653'}}>
                    Agendar turno
                </Text>
                <TextInput
                    placeholder="ej: XX/XX/XX"
                    onChangeText={(text) => handleDate('dia', text)}
                    style={{width:200,height:40,borderRadius:5,backgroundColor:'#ffffff',borderColor:'#f4a361ff',borderWidth:2}}
                />
                <TextInput
                    placeholder="ej: 10:00"
                    onChangeText={(text) => handleDate('hora', text)}
                    style={{width:200,height:40,borderRadius:5,backgroundColor:'#ffffff',borderColor:'#f4a361ff',borderWidth:2}}
                />
                <View style={{width:200,height:'auto',display:'flex',justifyContent:'space-around',alignItems:'flex-start',flexDirection:'column',rowGap:15}}>
                <TouchableOpacity
                    onPress={addStudentData}
                    style={{width:'auto',height:'auto',backgroundColor:'#A8D5BA',padding:10,borderRadius:5}}
                >
                    <Text style={{fontSize:18,color:'#264653',fontWeight:500}}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:'100%',height:'auto',backgroundColor:'#264653',padding:10,borderRadius:5}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text style={{fontSize:18,color:'#FAF3E0',fontWeight:500,textAlign:'center'}}>Cancelar</Text>
                </TouchableOpacity>     
                </View>
                </View>
            }
                </View>
            </View>
        </Modal>
    )
}
export default ModalCustomActions