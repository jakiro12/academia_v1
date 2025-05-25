import {  View , Text,StatusBar, TouchableOpacity } from 'react-native';
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
        <StatusBar backgroundColor="#FDD48A"/>            
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('primario')}
        > 
            <Text style={styles.textDescription}>
                Primaria
            </Text>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('secundario')}
        > 
            <Text style={styles.textDescription}>
                Secundaria
            </Text>          
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOptions}
            onPress={()=>handleRouteState('superior')}
        > 
            <Text style={styles.textDescription}>
                Superior
            </Text>          
        </TouchableOpacity>
      </View>
  );
}


