// js/core/taxonomy.js

export const BIOMECANICA = {
    PATRONES: {
        EMPUJE_HORIZONTAL: {
            id: "PH1",
            nombre: "Empuje Horizontal",
            distribucion: { pectoral: 0.60, hombro_frontal: 0.20, triceps: 0.20 }
        },
        EMPUJE_VERTICAL: {
            id: "PH2",
            nombre: "Empuje Vertical",
            distribucion: { deltoides_global: 0.60, triceps: 0.30, pectoral_superior: 0.10 }
        },
        TRACCION_HORIZONTAL: {
            id: "PH3",
            nombre: "Tracción Horizontal",
            distribucion: { dorsal: 0.50, biceps: 0.30, deltoides_posterior: 0.20 }
        },
        TRACCION_VERTICAL: {
            id: "PH4",
            nombre: "Tracción Vertical",
            distribucion: { dorsal: 0.70, biceps: 0.30 }
        },
        DOMINANTE_RODILLA: {
            id: "PH5",
            nombre: "Dominante de Rodilla",
            distribucion: { cuadriceps: 0.60, gluteo: 0.30, core: 0.10 }
        },
        DOMINANTE_CADERA: {
            id: "PH6",
            nombre: "Dominante de Cadera",
            distribucion: { gluteo: 0.50, isquiosurales: 0.40, erectores_espinales: 0.10 }
        }
    },
    
    // CORRECCIÓN FATAL APLICADA: Las llaves ahora coinciden con los Patrones Maestros
    EJERCICIOS_BASE: {
        "press_banca_plano": { patron: "EMPUJE_HORIZONTAL", tempo_default: "3-0-1" },
        "dominadas_lastre": { patron: "TRACCION_VERTICAL", tempo_default: "3-0-1" },
        "sentadilla_bulgara": { patron: "DOMINANTE_RODILLA", tempo_default: "3-0-1" },
        "peso_muerto_rumano": { patron: "DOMINANTE_CADERA", tempo_default: "4-0-1" }
    }
};
