type Assit = {
    fijo:boolean;
    carga_horaria:string;
    historial:string[];
    agenda:{
        dia:string;
        hora:string
    }[];
    dias_fijo:{
        dia:string;
        hora:string;
    }[];
}

export interface StudentData{
    nombre:string;
    establecimiento:string;
    asistencia:Assit;
    telefonos:{
        nombre:string;
        telefono:string;
    }[];
    materias:{
        nombre:string;
        temas:string[]
    }[];
    pagos:{
        fecha:string;
        tipo:string;
        valor:string;
    }[]
}