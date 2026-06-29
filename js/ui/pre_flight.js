// js/ui/pre_flight.js
import { SAB_CONSTANTS } from '../core/constants.js';
import { StateManager } from '../core/state.js';
import { AuditorEngine } from '../modules/auditor.js';
import { SyncEngine } from '../modules/sync.js';
import { ZenModeUI } from './zen_mode.js';

export const PreFlightUI = {
    containerId: 'pre-flight-container',

    init: function() {
        try {
            const ultimoExpediente = SyncEngine.recuperarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA');
            const requiereAuditoria = AuditorEngine.evaluarBloqueoTrimestral(ultimoExpediente);

            if (requiereAuditoria) {
                this.renderBloqueoAuditoria();
            } else {
                this.renderSelectorRutinas();
            }
        } catch (error) {
            alert("Error en la evaluación de Auditoría (pre_flight.js): " + error.message);
        }
    },

    renderBloqueoAuditoria: function() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            alert("Error de Interfaz: El cajón 'pre-flight-container' no existe en tu HTML.");
            return;
        }

        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h1 style="color: #ff3b30; margin-bottom: 1rem;">Auditoría Requerida</h1>
                <p style="margin-bottom: 2rem; color: #86868b;">El sistema no registra un Test de Longevidad en las últimas 12 semanas. Acceso bloqueado.</p>
                <button id="btn-test-cooper" style="background-color: #ff6b00; color: #fff; padding: 1rem 2rem; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 8px; width: 100%; max-width: 300px;">
                    Registrar Auditoría Inicial
                </button>
            </div>
        `;

        document.getElementById('btn-test-cooper').addEventListener('click', () => {
            try {
                const fechaActual = new Date().toISOString();
                SyncEngine.guardarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA', fechaActual);
                alert("✓ Auditoría Sellada. El sistema está liberando las rutinas.");
                this.init(); 
            } catch (error) {
                alert("Error al intentar guardar el dato en la memoria del teléfono: " + error.message);
            }
        });
    },

    renderSelectorRutinas: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center;">
                <h2 style="margin-bottom: 2rem;">Portal de Inicio</h2>
                <select id="selector-rutina" style="font-size: 1.2rem; padding: 0.5rem; background: transparent; border: 1px solid #86868b; color: #fff; border-radius: 8px; width: 100%; max-width: 300px; margin: 0 auto 2rem auto;">
                    <option value="dia_1_empuje">Día 1: Empuje (Hipertrofia)</option>
                    <option value="dia_2_traccion">Día 2: Tracción (Densidad)</option>
                    <option value="dia_3_pierna">Día 3: Pierna (Fuerza)</option>
                </select>
                <button id="btn-iniciar-zen" style="background-color: #ff6b00; color: #fff; padding: 1rem 2rem; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 8px; width: 100%; max-width: 300px; margin: 0 auto;">
                    Iniciar Protocolo Zen
                </button>
            </div>
        `;

        document.getElementById('btn-iniciar-zen').addEventListener('click', () => {
            this.ejecutarTransicionZen();
        });
    },

    ejecutarTransicionZen: function() {
        try {
            const container = document.getElementById(this.containerId);
            if (container) container.style.display = 'none';

            StateManager.iniciarSesion();
            ZenModeUI.init();
        } catch (error) {
            alert("Error al transicionar al Modo Zen: " + error.message);
        }
    }
};
