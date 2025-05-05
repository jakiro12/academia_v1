import { Linking, Modal, Text, TouchableOpacity, View } from "react-native"
import styles from '../../../../styles/option-styles'
import { StudentsContext } from "@/app/_layout"
import { useContext, useState } from "react"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AntDesign } from "@expo/vector-icons";
import ModalCustomActions from "@/components/modal-actions";

const InformationStudent = () => {
    const context = useContext(StudentsContext);
    const [checkDates,setCheckDates]=useState<boolean>(false)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // índice de materia expandida
    const [modalType,setModalType]=useState<string>('see')
    if (!context) {
        throw new Error("MyComponent debe usarse dentro de StudentsProvider");
    }

    const { studentInformation } = context;
   

    const handleExternalLinks = (phone: string) => {
        Linking.openURL(`https://wa.me/${phone}`);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };
    const handleTurnsOption=(action:string)=>{
        setCheckDates(true)
        setModalType(action)
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoCardStudent}>
                <Text style={styles.fontInfo}>{studentInformation.nombre}</Text>

                {studentInformation.telefonos.map((e, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.wspBtn}
                        onPress={() => handleExternalLinks(e.telefono)}
                    >
                        <FontAwesome5 name="whatsapp" size={24} color="white" />
                        <Text style={[styles.fontInfo,{color:'#ffffff'}]}>{e.nombre}</Text>
                    </TouchableOpacity>
                ))}

                <Text style={styles.fontInfo}>{studentInformation.establecimiento}</Text>
                <Text style={styles.schoolSubjects}>Materias:</Text>
                <View style={styles.boxSubjectsContainer}>
                {studentInformation.materias.map((materia, index) => (
                    <View key={index} style={styles.boxSubjects}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.schoolSubjectsBoxes}                            
                            onPress={() => toggleExpand(index)}
                        >
                            <Text>{materia.nombre}</Text>
                            <AntDesign
                                name={expandedIndex === index ? "up" : "down"}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>

                        {expandedIndex === index && (
                            <View style={{ padding: 10,backgroundColor:'#FAF3E0' }}>
                                {materia.temas.map((tema, i) => (
                                    <Text key={i} style={{ marginLeft: 10 }}>{tema}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
                </View>
                <TouchableOpacity style={styles.btnTurns}
                    onPress={()=>handleTurnsOption('see')}
                >
                    <Text style={{ fontSize: 20, color: '#ffffff' }}>Historial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnTurns}
                    onPress={()=>handleTurnsOption('')}
                >
                <Text style={{ fontSize: 20, color: '#ffffff' }}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <ModalCustomActions 
                checkDates={checkDates} 
                onCloseModal={setCheckDates} 
                modalType={modalType}
                data={studentInformation.asistencia.historial}
                />
        </View>
    );
};

export default InformationStudent;
