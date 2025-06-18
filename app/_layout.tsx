import { StudentData } from '../../academia/constants/stateTypes';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import 'react-native-reanimated';

interface StudentsContextType {
  studentsType: string;
  setStudentsType: React.Dispatch<React.SetStateAction<string>>;
  studentInformation: StudentData;
  setStudentInformation: React.Dispatch<React.SetStateAction<StudentData>>;
  auxIndex:number | null;
  setAuxIndex:React.Dispatch<React.SetStateAction<number | null>>;
}

export const StudentsContext=React.createContext<StudentsContextType | undefined>(undefined)

export default function RootLayout() {
const [studentsType,setStudentsType]=useState<string>('primario')
const [auxIndex,setAuxIndex]=useState<number | null>(null)
const [studentInformation, setStudentInformation] = useState<StudentData>({
  nombre: '',
  establecimiento: '',
  asistencia: {
    fijo: false,
    carga_horaria: '',
    historial: [],
    agenda: [],
    dias_fijo: [],
  },
  telefonos: [],
  materias: [],
  pagos:[]
});
/*  
Rol	Color	Hex	Descripción
Color base	🟡	#FDD48A	Amarillo suave, cálido y luminoso.
Color de acento	🟠	#F4A261	Naranja terracota, aporta energía.
Fondo suave	🟤	#FAF3E0	Beige claro, neutro y elegante.
Contraste leve	🟢	#A8D5BA	Verde menta pálido, fresco y suave.
Contraste fuerte	🔵	#264653	Azul petróleo, aporta profundidad.

*/

  return (
    <StudentsContext.Provider value={{studentsType,setStudentsType,studentInformation,setStudentInformation,auxIndex,setAuxIndex}}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="list/list" options={{ headerShown: false }} />
        <Stack.Screen name="list/option/option" options={{ headerShown: false }} />
        <Stack.Screen name="list/option/student/student" options={{ headerShown: false }} />
        <Stack.Screen name="list/option/student/payments/payments" options={{ headerShown: false }} />
        <Stack.Screen name="list/today/today" options={{ headerShown: false }} />
        <Stack.Screen name="list/earnings/earning" options={{ headerShown: false }} />
        <Stack.Screen name="list/addStudent/addStudent" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </StudentsContext.Provider>
  );
}
