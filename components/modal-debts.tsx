import { Modal, View, Text, TouchableOpacity  } from "react-native"
import styles from '../styles/option-styles'
import React from "react"

interface ModalTypes{
    updateDebts:boolean
    onCloseModal:React.Dispatch<React.SetStateAction<boolean>>    
}

const DebtsStudentActions : React.FC<ModalTypes> =({updateDebts,onCloseModal})=>{
    return(
        <Modal
                visible={updateDebts}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.container}>
                    <View style={styles.infoCardStudent}>
                        <Text>Modal Abierto</Text>
                        <TouchableOpacity
                            onPress={()=>onCloseModal(false)}
                        >
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    )
}
export default DebtsStudentActions