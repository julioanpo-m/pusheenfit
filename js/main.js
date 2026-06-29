// js/main.js
import { StateManager } from './core/state.js';
import { AuditorEngine } from './modules/auditor.js';
import { PreFlightUI } from './ui/pre_flight.js';

const SAB_Orchestrator = {
    init: function() {
        console.log("S.A.B: Iniciando Secuencia de Orquestación...");
        
        // 1. Despertar la memoria (Recuperar sesión si se interrumpió)
        StateManager.init();
        
        // 2. Conectar la Interfaz Visual (Evalúa si toca auditoría o rutina normal)
        PreFlightUI.init();

        // 3. Correr Auditoría de Seguridad Silenciosa (ACWR) en segundo plano
        this.evaluarCargaSistemica();
    },

    evaluarCargaSistemica: function() {
        // Inicialización base para la válvula de seguridad (carga histórica simulada)
        const cargaAguda7Dias = 15000; 
        const cargaCronica28Dias = 12000; 
        
        const analisisACWR = AuditorEngine.evaluarACWR(cargaAguda7Dias, cargaCronica28Dias);
        
        if (analisisACWR.alerta) {
            console.warn(`S.A.B: ALERTA ACWR (${analisisACWR.ratio}). Sistema sugiere Modo Guardia.`);
        }
    }
};

// Arrancar el motor al cargar el DOM
document.addEventListener('DOMContentLoaded', () => SAB_Orchestrator.init());
