export const BIOMECANICA = {
    PATRONES: {
        EMPUJE_HORIZONTAL: { id: "PH1", nombre: "Empuje Horizontal" },
        EMPUJE_VERTICAL: { id: "PH2", nombre: "Empuje Vertical" },
        TRACCION_HORIZONTAL: { id: "PH3", nombre: "Tracción Horizontal" },
        TRACCION_VERTICAL: { id: "PH4", nombre: "Tracción Vertical" },
        DOMINANTE_RODILLA: { id: "PH5", nombre: "Dominante de Rodilla" },
        DOMINANTE_CADERA: { id: "PH6", nombre: "Dominante de Cadera" }
    },
    EJERCICIOS_BASE: {
        "press_banca_plano": { patron: "EMPUJE_HORIZONTAL", tempo_default: "3-0-1", descanso: 120 },
        "dominadas_lastre": { patron: "TRACCION_VERTICAL", tempo_default: "3-0-1", descanso: 120 },
        "sentadilla_bulgara": { patron: "DOMINANTE_RODILLA", tempo_default: "3-0-1", descanso: 120 },
        "peso_muerto_rumano": { patron: "DOMINANTE_CADERA", tempo_default: "4-0-1", descanso: 120 },
        "curl_biceps": { patron: "TRACCION_VERTICAL", tempo_default: "2-0-1", descanso: 90 },
        "elevaciones_laterales": { patron: "EMPUJE_VERTICAL", tempo_default: "2-0-1", descanso: 90 }
    }
};
