// js/ui/zen_mode.js

import { StateManager } from '../core/state.js';

export const ZenModeUI = {
    wakeLock: null,
    ejercicioActivoId: "press_banca_plano", // Ejemplo estático, vendría del RoutineManager
    seriesCompletadas: 0,
    totalSeries: 4,

    init: async function() {
        await this.activarWakeLock();
        this.renderUI();
        this.bindEvents();
        document.body.classList.add('state-tension');
    },

    activarWakeLock: async function() {
        try {
            if ('wakeLock' in navigator) {
                this.wakeLock = await navigator.wakeLock.request('screen');
                console.log('S.A.B: Wake Lock Activo. Pantalla asegurada.');
            }
        } catch (err) {
            console.warn(`S.A.B: Wake Lock falló - ${err.name}, ${err.message}`);
        }
    },

    renderUI: function() {
        const appRoot = document.getElementById('app-root') || document.body;
        
        // Construir el DOM en tiempo de ejecución para asegurar aislamiento
        const zenHTML = `
            <div id="zen-container" class="zen-container">
                <div class="series-progress-bar" id="progress-bar">
                    ${this.generarBloquesSeries()}
                </div>

                <div class="exercise-header">
                    <h1 id="ui-ejercicio-nombre">Press Banca Plano</h1>
                    <h2 class="mono-data">3-0-1 | Tempo</h2>
                </div>

                <div class="cue-drawer" id="cue-drawer">
                    <div class="cue-header" id="cue-toggle">Desplegar Cues y Siseo ▼</div>
                    <div class="cue-content">
                        <p><strong>Cues:</strong> Escápulas retraídas, leg drive constante.</p>
                        <p><strong>Siseo:</strong> Exhalación explosiva al empuje.</p>
                    </div>
                </div>

                <div class="input-group">
                    <input type="number" id="input-peso" class="input-zen" placeholder="0.0" inputmode="decimal">
                    <span style="font-size: 2rem; color: var(--text-muted); align-self: center;">kg</span>
                </div>
                
                <div class="input-group">
                    <input type="number" id="input-reps" class="input-zen" placeholder="0" inputmode="numeric">
                    <span style="font-size: 2rem; color: var(--text-muted); align-self: center;">reps</span>
                </div>

                <div class="input-group">
                    <select id="input-rir" class="input-zen" style="width: auto; font-size: 1.5rem;">
                        <option value="1">RIR 1 (Al fallo)</option>
                        <option value="2" selected>RIR 2 (Intenso)</option>
                        <option value="4">RIR 4 (Calentamiento)</option>
                    </select>
                </div>

                <div id="flash-overlay" class="flash-overlay"></div>
                
                <button id="btn-deshacer" class="btn-deshacer">Deshacer Última</button>
                <button id="btn-serie-terminada" class="btn-terminada">Serie Terminada</button>
            </div>
        `;
        
        // Insertar en contenedor o adjuntar
        const zenWrapper = document.createElement('div');
        zenWrapper.id = "zen-wrapper";
        zenWrapper.innerHTML = zenHTML;
        appRoot.appendChild(zenWrapper);

        // Autofocus Poka-Yoke
        document.getElementById('input-peso').focus();
    },

    generarBloquesSeries: function() {
        let html = '';
        for(let i = 0; i < this.totalSeries; i++) {
            html += `<div class="series-segment" id="segment-${i}"></div>`;
        }
        return html;
    },

    bindEvents: function() {
        document.getElementById('btn-serie-terminada').addEventListener('click', () => this.sellarSerie());
        
        document.getElementById('cue-toggle').addEventListener('click', function() {
            document.getElementById('cue-drawer').classList.toggle('open');
        });

        // UX: Poner cursor al final al tocar (Simulación para inputs tipo number/tel)
        const pesoInput = document.getElementById('input-peso');
        pesoInput.addEventListener('focus', function() {
            setTimeout(() => { this.selectionStart = this.selectionEnd = this.value.length; }, 10);
        });
    },

    sellarSerie: function() {
        const peso = document.getElementById('input-peso').value || 0;
        const reps = document.getElementById('input-reps').value || 0;
        const rir = document.getElementById('input-rir').value;

        if (peso === 0 && reps === 0) return; // Evitar disparos vacíos

        // 1. Efecto Visual de Impacto
        this.dispararFlash();
        
        // 2. Transición de Estado Ambiental
        document.body.classList.remove('state-tension');
        document.body.classList.add('state-recovery');

        // 3. Registrar en Core
        StateManager.registrarSerie(this.ejercicioActivoId, peso, reps, rir, "ninguno");

        // 4. Actualizar Gamificación UI
        if (this.seriesCompletadas < this.totalSeries) {
            document.getElementById(`segment-${this.seriesCompletadas}`).classList.add('completed');
            this.seriesCompletadas++;
        }

        // 5. Limpieza Poka-Yoke
        document.getElementById('input-peso').value = '';
        document.getElementById('input-reps').value = '';

        // 6. Activar Timer de Descanso (Mock)
        this.iniciarTimerDescanso();
    },

    dispararFlash: function() {
        const flash = document.getElementById('flash-overlay');
        flash.classList.remove('flash-active');
        void flash.offsetWidth; // Trigger reflow
        flash.classList.add('flash-active');
    },

    iniciarTimerDescanso: function() {
        console.log("S.A.B: Timer de descanso iniciado.");
        const btnDeshacer = document.getElementById('btn-deshacer');
        btnDeshacer.classList.add('visible');

        // Ocultar botón deshacer después de 5 segundos
        setTimeout(() => {
            btnDeshacer.classList.remove('visible');
        }, 5000);

        // Simulación de fin de descanso (Pre-Flash)
        setTimeout(() => {
            document.body.classList.remove('state-recovery');
            document.body.classList.add('state-tension');
            document.getElementById('input-peso').focus();
        }, 10000); // 10s para testing, en prod usar variable de tempo/descanso
    }
};