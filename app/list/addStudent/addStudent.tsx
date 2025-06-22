import { StudentsContext } from "@/app/_layout";
import { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../../styles/option-styles';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firebaseconn } from "@/firebaseconn/conn";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";

type StudentData={
    nombre:string,
    establecimiento:string,
    carga_horaria:string,
    fijo:boolean
}

const AddNewStudent = () => {
  const context = useContext(StudentsContext);
  if (!context) throw new Error("StudentsContext no está disponible");
  const { studentsType } = context;
  const [loading,setLoading]=useState<boolean>(false)
  const [newStudentData, setNewStudentData] = useState<StudentData>({
    nombre: "",
    establecimiento: "",
    carga_horaria: "",
    fijo: false,
  })

  const handleInputChange = (name: string, value: string) => {
    setNewStudentData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFijoChange = (value: boolean) => {
    setNewStudentData(prevState => ({
      ...prevState,
      fijo: value,
    }))
  };

  const agregarAlumnos = async () => {
    if(Object.values(newStudentData).includes('')) return Alert.alert('completar los campos')
    setLoading(true)
    const nuevosAlumnos = [
      {
        nombre: newStudentData.nombre,
        establecimiento: newStudentData.establecimiento,
        pagos: [],
        asistencia: {
          carga_horaria: newStudentData.carga_horaria,
          agenda: [],
          fijo: newStudentData.fijo,
          historial: [],
          dias_fijo: [
            { dia: "lunes", hora: "20:00" },
          ],
        },
        materias: [
          { nombre: "matematica", temas: ["tema_1", "tema_2", "tema_3"] },
        ],
        telefonos: [
          { nombre: "Mama", telefono: "123456789" },          
        ],
      },
    ]

    try {
      const docRef = doc(firebaseconn, "escuela", studentsType);

      await updateDoc(docRef, {
        alumnos: arrayUnion(...nuevosAlumnos),
      })

      console.log("Alumnos agregados con éxito.");
    } catch (error) {
      console.error("Error al agregar alumnos:", error);
    }finally{
        setLoading(false)
        setNewStudentData({
            nombre: "",
            establecimiento: "",
            carga_horaria: "",
            fijo: false,
            })
    }
  }

  const handleAbortNewStudent = () => {    
    setNewStudentData({
      nombre: "",
      establecimiento: "",
      carga_horaria: "",
      fijo: false,
    })
    router.back()
  }

  const handleSubmit = () => {
    agregarAlumnos()    
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoCardStudent}>
        <View style={styles.boxNewStudentData}>
          <Text
            style={styles.textNewStudentData}
          >Nombre completo</Text>
          <TextInput
            style={styles.inputNewStudentData}
            placeholder="Nombre y Apellido"
            value={newStudentData.nombre}
            onChangeText={(text) => handleInputChange('nombre', text)}
          />
        </View>
        <View style={styles.boxNewStudentData}>
          <Text
            style={styles.textNewStudentData}
          
          >Establecimiento educativo:</Text>
          <TextInput
            style={styles.inputNewStudentData}
            placeholder="Escuela o instituto"
            value={newStudentData.establecimiento}
            onChangeText={(text) => handleInputChange('establecimiento', text)}
          />
        </View>

        <View style={styles.boxNewStudentData}>
          <Text
            style={styles.textNewStudentData}          
          >Asistira en horario y dia fijo:</Text>
          <View style={styles.newStudentDataDay}>
            <TouchableOpacity 
                style={[styles.newStudentDataFixedDay,{backgroundColor:newStudentData.fijo === true ? '#FDD48A' :'#fdd58a73'}]}
                onPress={() => handleFijoChange(true)}>
                <Text
                    style={styles.textNewStudentData}                
                >Si</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.newStudentDataFixedDay,{backgroundColor:newStudentData.fijo === false ? '#FDD48A' :'#fdd58a73'}]}
                onPress={() => handleFijoChange(false)}>
                <Text
                    style={styles.textNewStudentData}                
                >No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.boxNewStudentData}>
          <Text
            style={styles.textNewStudentData}          
          >Carga Horaria:</Text>
          <TextInput
            style={styles.inputNewStudentData}
            placeholder="Cantidad de Horas"
            value={newStudentData.carga_horaria}
            onChangeText={(text) => handleInputChange('carga_horaria', text)}
          />
        </View>
        <View style={styles.btnSendActionContainer}>
         {
         loading ? 
            <ActivityIndicator size={20} color="#ffffff"/>
         :
         <TouchableOpacity
            style={styles.btnSubmitAction}
            onPress={handleSubmit}
          >
            <Text style={styles.textBtnActions}>Enviar</Text>
          </TouchableOpacity>
}
          <TouchableOpacity
            style={styles.btnRejectAction}
            onPress={handleAbortNewStudent}
          >
            <Text style={styles.textBtnActions}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddNewStudent
