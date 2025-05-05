import { StudentData } from '../../academia/constants/stateTypes';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';
import 'react-native-reanimated';

interface StudentsContextType {
  studentsType: string;
  setStudentsType: React.Dispatch<React.SetStateAction<string>>;
  studentInformation: StudentData;
  setStudentInformation: React.Dispatch<React.SetStateAction<StudentData>>;
}

export const StudentsContext=React.createContext<StudentsContextType | undefined>(undefined)

export default function RootLayout() {
const [studentsType,setStudentsType]=useState<string>('primario')
const [studentInformation, setStudentInformation] = useState<StudentData>({
  nombre: '',
  deuda: '',
  establecimiento: '',
  total_pagado: '',
  asistencia: {
    fijo: false,
    carga_horaria: '',
    historial: [],
    agenda: [],
    dias_fijo: [],
  },
  telefonos: [],
  materias: [],
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
    <StudentsContext.Provider value={{studentsType,setStudentsType,studentInformation,setStudentInformation}}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="list/list" options={{ headerShown: false }} />
        <Stack.Screen name="list/option/option" options={{ headerShown: false }} />
        <Stack.Screen name="list/option/student/student" options={{ headerShown: false }} />
        <Stack.Screen name="list/today/today" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </StudentsContext.Provider>
  );
}
