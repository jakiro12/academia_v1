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
    deuda:string;
    establecimiento:string;
    total_pagado:string;
    asistencia:Assit;
    telefonos:{
        nombre:string;
        telefono:string;
    }[];
    materias:{
        nombre:string;
        temas:string[]
    }[];
}