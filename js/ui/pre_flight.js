// js/ui/pre_flight.js

import { SAB_CONSTANTS } from '../core/constants.js';
import { StateManager } from '../core/state.js';
import { AuditorEngine } from '../modules/auditor.js';
import { SyncEngine } from '../modules/sync.js';
import { ZenModeUI } from './zen_mode.js';

export const PreFlightUI = {
    containerId: 'pre-flight-container',

    init: function() {
        const ultimoExpediente = SyncEngine.recuperarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA');
        const requiereAuditoria = AuditorEngine.evaluarBloqueoTrimestral(ultimoExpediente);

        if (requiereAuditoria) {
            this.renderBloqueoAuditoria();
        } else {
            this.renderSelectorRutinas();
        }
    },

    renderBloqueoAuditoria: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="auditoria-forzada-view">
                <h1 style="color: var(--danger-red);">Auditoría Requerida</h1>
                <p>Han pasado ${SAB_CONSTANTS.GOBERNANZA.SEMANAS_MAX_SIN_AUDITAR} semanas. La integridad del sistema S.A.B. requiere calibración.</p>
                <div class="test-options">
                    <button id="btn-test-cooper">Test de Cooper (VO2 Max)</button>
                    <button id="btn-test-fatmax">Test FatMax</button>
                </div>
            </div>
        `;

        document.getElementById('btn-test-cooper').addEventListener('click', () => {
            // Lógica de transición a UI de Test
            console.log("S.A.B: Iniciando Test de Cooper...");
        });
    },

    renderSelectorRutinas: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Estructura base. En producción, las opciones provendrían de un archivo de mesociclo.
        container.innerHTML = `
            <div class="rutina-selector-view">
                <h2>Portal de Inicio</h2>
                <select id="selector-rutina" class="input-zen">
                    <option value="dia_1_empuje">Día 1: Empuje (Hipertrofia)</option>
                    <option value="dia_2_traccion">Día 2: Tracción (Densidad)</option>
                    <option value="dia_3_pierna">Día 3: Pierna (Fuerza)</option>
                </select>
                <div style="margin-top: 2rem;">
                    <label>
                        <input type="checkbox" id="modo-guardia-toggle"> Activar Modo Guardia (Descarga)
                    </label>
                </div>
                <button id="btn-iniciar-zen" class="btn-terminada" style="position: relative; margin-top: 3rem; height: 10vh;">Iniciar Protocolo</button>
            </div>
        `;

        document.getElementById('btn-iniciar-zen').addEventListener('click', () => {
            this.ejecutarTransicionZen();
        });
    },

    ejecutarTransicionZen: function() {
        const container = document.getElementById(this.containerId);
        if (container) container.style.display = 'none';

        StateManager.iniciarSesion();
        ZenModeUI.init();
    }
};