// js/main.js
import { StateManager } from './core/state.js';
import { AuditorEngine } from './modules/auditor.js';
import { PreFlightUI } from './ui/pre_flight.js';

const SAB_Orchestrator = {
    init: function() {
        try {
            console.log("S.A.B: Iniciando Secuencia de Orquestación...");
            StateManager.init();
            PreFlightUI.init();
            this.evaluarCargaSistemica();
        } catch (error) {
            alert("Error crítico en el Arranque (main.js): " + error.message);
        }
    },

    evaluarCargaSistemica: function() {
        const analisisACWR = AuditorEngine.evaluarACWR(15000, 12000);
        if (analisisACWR.alerta) {
            console.warn(`S.A.B: ALERTA ACWR (${analisisACWR.ratio}).`);
        }
    }
};

// Ejecución Inmediata y Forzada (Sin esperar al DOM)
SAB_Orchestrator.init();
