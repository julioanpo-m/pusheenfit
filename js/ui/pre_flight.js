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
            this.renderPortalConPestanas();
        }
    },

    renderBloqueoAuditoria: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h1 style="color: var(--danger-red); margin-bottom: 1rem;">Auditoría Requerida</h1>
                <p style="margin-bottom: 2rem; color: var(--text-muted);">El sistema requiere calibración inicial de longevidad.</p>
                <button id="btn-test-cooper" style="background-color: var(--action-color); color: #fff; padding: 1rem 2rem; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 8px; width: 100%; max-width: 300px; cursor: pointer;">Registrar Auditoría Inicial</button>
            </div>
        `;
        document.getElementById('btn-test-cooper').addEventListener('click', () => {
            SyncEngine.guardarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA', new Date().toISOString());
            this.init();
        });
    },

    renderPortalConPestanas: function() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div style="padding: 1.5rem; height: 100vh; display: flex; flex-direction: column; background-color: var(--bg-tension);">
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem;">
                    <button id="tab-fuerza" style="flex: 1; background: transparent; border: none; color: var(--action-color); font-size: 1.2rem; font-weight: bold; padding: 0.5rem; border-bottom: 2px solid var(--action-color); cursor: pointer;">Fuerza</button>
                    <button id="tab-cardio" style="flex: 1; background: transparent; border: none; color: var(--text-muted); font-size: 1.2rem; font-weight: bold; padding: 0.5rem; cursor: pointer;">Longevidad</button>
                </div>
                <div id="content-fuerza" style="display: block; text-align: center; margin-top: 2rem;">
                    <select id="selector-rutina" style="font-size: 1.2rem; padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--text-muted); color: #fff; border-radius: 8px; width: 100%; max-width: 300px; margin-bottom: 2rem; display: block; margin-left: auto; margin-right: auto;">
                        <option value="dia_1_empuje">Día 1: Empuje (Hipertrofia)</option>
                        <option value="dia_2_traccion">Día 2: Tracción (Densidad)</option>
                        <option value="dia_3_pierna">Día 3: Pierna (Fuerza)</option>
                    </select>
                    <button id="btn-iniciar-zen" style="background-color: var(--action-color); color: #fff; padding: 1rem 2rem; font-size: 1.2rem; font-weight: bold; border: none; border-radius: 8px; width: 100%; max-width: 300px; cursor: pointer;">Iniciar Protocolo Zen</button>
                </div>
                <div id="content-cardio" style="display: none; text-align: left; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 8px;">
                    <h3 style="color: #fff; margin-bottom: 0.5rem;">Test de Cooper (12 min)</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Máxima distancia posible en pista llana. Mide VO2 Max.</p>
                    <h3 style="color: #fff; margin-bottom: 0.5rem;">Test FatMax (40 min)</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Z2 alta (130-140 bpm). Eficiencia de oxidación de ácidos grasos.</p>
                </div>
            </div>
        `;
        this.bindTabEvents();
        document.getElementById('btn-iniciar-zen').addEventListener('click', () => this.ejecutarTransicionZen());
    },

    bindTabEvents: function() {
        const tf = document.getElementById('tab-fuerza');
        const tc = document.getElementById('tab-cardio');
        const cf = document.getElementById('content-fuerza');
        const cc = document.getElementById('content-cardio');

        tf.addEventListener('click', () => {
            tf.style.color = 'var(--action-color)'; tf.style.borderBottom = '2px solid var(--action-color)';
            tc.style.color = 'var(--text-muted)'; tc.style.borderBottom = 'none';
            cf.style.display = 'block'; cc.style.display = 'none';
        });
        tc.addEventListener('click', () => {
            tc.style.color = 'var(--action-color)'; tc.style.borderBottom = '2px solid var(--action-color)';
            tf.style.color = 'var(--text-muted)'; tf.style.borderBottom = 'none';
            cc.style.display = 'block'; cf.style.display = 'none';
        });
    },

    ejecutarTransicionZen: function() {
        document.getElementById(this.containerId).style.display = 'none';
        StateManager.iniciarSesion();
        ZenModeUI.init();
    }
};
