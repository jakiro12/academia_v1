import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native"
import styles from '../styles/option-styles'
interface ModalTypes{
    checkDates:boolean
    onCloseModal:React.Dispatch<React.SetStateAction<boolean>>
    modalType:string
    data:string[]
}

const ModalCustomActions:React.FC<ModalTypes>=({checkDates,onCloseModal,modalType,data})=>{
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
                <Text>
                    Historial de asistencias
                </Text>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{width:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {data.map((e,i)=><Text key={i}>{e}</Text>)}
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
                <Text>
                    Agregar turno
                </Text>
                <TextInput
                    placeholder="ej: XX/XX/XX"
                    style={{width:200,height:40,borderWidth:1,borderColor:'#000000',backgroundColor:'#ffffff'}}
                />
                <TextInput
                    placeholder="ej: 10:00"
                    style={{width:200,height:40,borderWidth:1,borderColor:'#000000',backgroundColor:'#ffffff'}}
                />
                <View style={{width:'80%',height:60,display:'flex',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity
                    style={{width:'auto',height:'auto',borderColor:'#000000',borderWidth:1,padding:8,borderRadius:5}}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:'auto',height:'auto',borderColor:'#000000',borderWidth:1,padding:8,borderRadius:5}}
                    onPress={()=>onCloseModal(false)}
                >
                    <Text>Cancelar</Text>
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