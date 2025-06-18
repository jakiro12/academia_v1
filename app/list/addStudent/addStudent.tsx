import { StudentsContext } from "@/app/_layout";
import { useContext } from "react";
import { Text, View } from "react-native"
import styles from '../../../styles/option-styles'

const AddNewStudent =()=>{
    const context = useContext(StudentsContext)
    if (!context) throw new Error("StudentsContext no está disponible")
    const {studentsType}=context
    return(
       <View style={styles.container}>
            <View style={styles.infoCardStudent}>
            </View>
        </View>
    )
}

export default AddNewStudent