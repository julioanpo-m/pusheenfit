// js/core/constants.js

export const SAB_CONSTANTS = {
    // 1. ESCALA DE TITANES Y REALIDAD (Gamificación de Tonelaje)
    REALIDAD: {
        CEMENTO_KG: 50,                // Material base Casa 2030/2031
        STORMY_KG: 5,                  // Carga doméstica base
        IGNIS_4CYL_KG: 900,            // Masa vehicular de consolidación
        DISTANCIA_COMMUTE_KM: 6.4      // Desplazamiento geográfico total diario
    },
    
    TITANES: {
        NIVEL_1: { nombre: "Constructor", peso_kg: 50 },
        NIVEL_2: { nombre: "Hogar", peso_kg: 150 },
        NIVEL_3: { nombre: "Automotriz", peso_kg: 900 },
        NIVEL_4: { nombre: "Megafauna", peso_kg: 6000 },
        NIVEL_5: { nombre: "Leviatán", peso_kg: 150000 }
    },

    // 2. REGLAS DE GOBERNANZA Y AUDITORÍA
    GOBERNANZA: {
        ACWR_THRESHOLD_PELIGRO: 1.5,   // Ratio Agudo/Crónico que dispara la Descarga
        SEMANAS_MAX_SIN_AUDITAR: 12,   // Bloqueo trimestral del sistema
        RANGO_EDAD_COOPER: "30-39"     // Umbral demográfico para VO2 Max
    },

    // 3. ESTADOS DEL SISTEMA
    ESTADOS: {
        LIBRE: "PRE_FLIGHT",
        BLOQUEADO: "ZEN_LOCKED",
        AUDITORIA_FORZADA: "TEST_REQUIRED",
        DESCARGA: "MODO_GUARDIA"
    }
};