import { ActivityIndicator,  ScrollView,  TouchableOpacity, View, Text, StatusBar } from "react-native"
import styles from '../../../styles/option-styles'
import { StudentsContext } from "@/app/_layout"
import { useContext, useEffect, useState } from "react"
import { firebaseconn } from "@/firebaseconn/conn"
import {  doc, getDoc } from "firebase/firestore"
import { StudentData } from "@/constants/stateTypes"
import { currentDay, shortFormatDate } from "@/utils/dateUtils"
import TodayStudentsActions from "@/components/modal-today"
const StudentsToday=()=>{
    const [dataStudents,setDataStudents]=useState<StudentData[]>([])    
    const [fixDays,setFixDays]=useState<StudentData[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const [verifyStudent,setVerifyStudent]=useState<boolean>(false)
    const [studentSelected,setStudentSelected]=useState<StudentData | null>(null)
    const [allStudents, setAllStudents] = useState<StudentData[]>([]); 
    const context = useContext(StudentsContext);
    if (!context) throw new Error("StudentsContext no está disponible");    
    const { studentsType, setAuxIndex } = context;
        
    const findStudentsDataType = async () => {
        setLoading(true);
        try {
          const docRef = doc(firebaseconn, "escuela", studentsType);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const alumnos = docSnap.data().alumnos as StudentData[] || [];
            setAllStudents(alumnos)
            const studentsNotFixed = alumnos.filter((alumno: any) => 
              alumno.asistencia?.fijo === false
            );
            const studentsToday = studentsNotFixed.filter(alumno =>
              alumno.asistencia.agenda.some(item => item.dia === shortFormatDate) 
            );
            const studentsFixed = alumnos.filter((alumno: any) => 
              alumno.asistencia?.fijo === true
            );
            const fixedStudentsToday = studentsFixed.filter(alumno =>
              alumno.asistencia.dias_fijo.some(item => item.dia === currentDay) 
            );
            setDataStudents(studentsToday);
            setFixDays(fixedStudentsToday)

          } else {
            console.log("No se encontró el documento");
          }
        } catch (error) {
          console.log("Error al obtener documento:", error);
        } finally {
          setLoading(false);
        }
      }
     
      useEffect(()=>{
        findStudentsDataType()    
      },[])
      const showStudentInformation=(see:boolean,data:StudentData)=>{
        setVerifyStudent(see)
        setStudentSelected(data)
        const getIndexInAlumnosArr=allStudents.findIndex((alumno)=>alumno.nombre === data.nombre)
        setAuxIndex(getIndexInAlumnosArr)
      }
      const renderStudentsToday = () => {
        const sortedStudents = [...dataStudents].sort((a, b) => {
          const horaA = a.asistencia.agenda.find((ag: any) => ag.dia === shortFormatDate)?.hora || "00:00";
          const horaB = b.asistencia.agenda.find((ag: any) => ag.dia === shortFormatDate)?.hora || "00:00";
          return horaA.localeCompare(horaB);
        });
      
        return sortedStudents.map((item, index) => {
          const agendaDelDia = item.asistencia.agenda.find((a: any) => a.dia === shortFormatDate);
          return (
            <TouchableOpacity 
              onPress={()=>showStudentInformation(true,sortedStudents[index])}
              style={styles.boxOptions} key={`today-${index}`}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nombre}</Text>
              <Text>{agendaDelDia ? agendaDelDia.hora : 'Sin hora'}</Text>
            </TouchableOpacity>
          );
        });
      };
      const renderFixedStudents = () => {
        const sortedFixedStudents = [...fixDays].sort((a, b) => {
          const horaA = a.asistencia.dias_fijo.find((df: any) => df.dia === currentDay)?.hora || "00:00";
          const horaB = b.asistencia.dias_fijo.find((df: any) => df.dia === currentDay)?.hora || "00:00";
          return horaA.localeCompare(horaB);
        });
      
        return sortedFixedStudents.map((item, index) => {
          const diaFijoDelDia = item.asistencia.dias_fijo.find((a: any) => a.dia === currentDay);
          return (
            <TouchableOpacity 
                style={styles.boxOptions} key={`fixed-${index}`}
                onPress={()=>showStudentInformation(true,sortedFixedStudents[index])}
                >
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nombre}</Text>
              <Text>{diaFijoDelDia ? diaFijoDelDia.hora : 'Sin hora'}</Text>
            </TouchableOpacity>
          );
        });
      };
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#FDD48A"/>
          <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator size={40} />
            ) : dataStudents.length === 0 && fixDays.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                Hoy no hay turnos agendados.
              </Text>
            ) : (
              <>                
                {dataStudents.length > 0 && (
                  <>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Turnos del día</Text>
                    {renderStudentsToday()}
                  </>
                )}      
                {fixDays.length > 0 && (
                  <>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 10 }}>Horario y día fijo</Text>
                    {renderFixedStudents()}
                  </>
                )}
              </>
            )}
          </ScrollView>
         <TodayStudentsActions 
            verifyStudent={verifyStudent} 
            studentSelected={studentSelected} 
            setVerifyStudent={setVerifyStudent}/>
        </View>
      );
}

export default  StudentsToday