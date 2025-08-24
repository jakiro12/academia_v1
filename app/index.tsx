import {  View , Text, TouchableOpacity } from 'react-native';
import styles from '../styles/index-styles'
import { router } from 'expo-router';
import { useContext } from 'react';
import { StudentsContext } from './_layout';


export default function HomeScreen() {
  const context = useContext(StudentsContext);
  if (!context) throw new Error("StudentsContext no está disponible");    
  const { setStudentsType } = context;
  const handleRouteState=(type:string)=>{
    setStudentsType(type)
    router.push('/list/list')
  }
  return (    
      <View style={styles.container}>
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('primario')}
        > 
            <Text style={styles.textDescription}>
                Grado Primario
            </Text>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('secundario')}
        > 
            <Text style={styles.textDescription}>
                Grado Secundario
            </Text>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('superior')}
        > 
            <Text style={styles.textDescription}>
                Grado Superior
            </Text>          
        </TouchableOpacity>
      </View>
  );
}


