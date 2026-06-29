import { StateManager } from '../core/state.js';
import { BIOMECANICA } from '../core/taxonomy.js';

export const ZenModeUI = {
    wakeLock: null,
    ejercicioActivoId: "press_banca_plano",
    seriesCompletadas: 0,
    totalSeries: 4,

    init: async function() {
        try { if ('wakeLock' in navigator) { this.wakeLock = await navigator.wakeLock.request('screen'); } } catch (e) {}
        this.renderUI();
        this.bindEvents();
        document.body.className = 'state-tension';
    },

    renderUI: function() {
        const appRoot = document.getElementById('app-root') || document.body;
        let htmlBarra = '';
        for(let i=0; i<this.totalSeries; i++) { htmlBarra += `<div class="series-segment" id="segment-${i}"></div>`; }

        const zenHTML = `
            <div id="zen-container" class="zen-container">
                <div class="series-progress-bar">${htmlBarra}</div>
                <div class="exercise-header">
                    <h1>Press Banca Plano</h1>
                    <h2 class="mono-data">3-0-1 | Tempo</h2>
                </div>
                <div class="cue-drawer" id="cue-drawer">
                    <div class="cue-header" id="cue-toggle">Desplegar Cues ▼</div>
                    <div class="cue-content" style="color: var(--text-muted); font-size: 0.9rem;">
                        <p><strong>Cues:</strong> Retracción escapular, leg drive.</p>
                        <p><strong>Siseo:</strong> Exhalación explosiva al despegar.</p>
                    </div>
                </div>
                <div class="input-group">
                    <input type="number" id="input-peso" class="input-zen" placeholder="0.0" inputmode="decimal">
                    <span style="font-size: 1.5rem; color: var(--text-muted); align-self: center;">kg</span>
                </div>
                <div class="input-group">
                    <input type="number" id="input-reps" class="input-zen" placeholder="0" inputmode="numeric">
                    <span style="font-size: 1.5rem; color: var(--text-muted); align-self: center;">reps</span>
                </div>
                <div class="input-group">
                    <select id="input-rir" class="input-zen" style="width: auto; font-size: 1.2rem;">
                        <option value="1">RIR 1</option><option value="2" selected>RIR 2</option><option value="4">RIR 4</option>
                    </select>
                </div>
                <div id="flash-overlay" class="flash-overlay"></div>
                <div id="timer-display" style="opacity:0; font-size:4rem; font-weight:bold; color:var(--action-color); margin: 1rem 0; font-family:var(--font-mono);">00:00</div>
                <button id="btn-deshacer" class="btn-deshacer">Deshacer</button>
                <button id="btn-serie-terminada" class="btn-terminada">Serie Terminada</button>
                <button id="btn-finalizar-sesion" style="background: transparent; border: 1px solid var(--danger-red); color: var(--danger-red); padding: 0.8rem; width: 100%; max-width: 300px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 1rem; z-index: 110;">FINALIZAR PROTOCOLO</button>
            </div>
        `;
        const wrap = document.createElement('div'); wrap.id = "zen-wrapper"; wrap.innerHTML = zenHTML;
        appRoot.appendChild(wrap);
        document.getElementById('input-peso').focus();
    },

    bindEvents: function() {
        document.getElementById('btn-serie-terminada').addEventListener('click', () => this.sellarSerie());
        document.getElementById('cue-toggle').addEventListener('click', () => document.getElementById('cue-drawer').classList.toggle('open'));
        document.getElementById('btn-finalizar-sesion').addEventListener('click', () => { if(confirm("¿Descargar JSON maestro?")) this.finalizarYDescargar(); });
    },

    sellarSerie: function() {
        const p = document.getElementById('input-peso').value || 0;
        const r = document.getElementById('input-reps').value || 0;
        const rir = document.getElementById('input-rir').value;
        if (p === 0 && r === 0) return;

        const flash = document.getElementById('flash-overlay');
        flash.classList.add('flash-active');
        setTimeout(() => flash.classList.remove('flash-active'), 400);

        document.body.className = 'state-recovery';
        StateManager.registrarSerie(this.ejercicioActiveId || "press_banca_plano", p, r, rir, "ninguno");

        if (this.seriesCompletadas < this.totalSeries) {
            document.getElementById(`segment-${this.seriesCompletadas}`).classList.add('completed');
            this.seriesCompletadas++;
        }
        document.getElementById('input-peso').value = '';
        document.getElementById('input-reps').value = '';
        this.iniciarTimerDescanso();
    },

    iniciarTimerDescanso: function() {
        const display = document.getElementById('timer-display');
        const ex = BIOMECANICA.EJERCICIOS_BASE[this.ejercicioActivoId];
        let t = ex ? ex.descanso : 120;

        display.style.opacity = '1';
        const btn = document.getElementById('btn-serie-terminada');
        btn.style.pointerEvents = 'none'; btn.style.opacity = '0.4';

        const inv = setInterval(() => {
            t--;
            const m = Math.floor(t/60).toString().padStart(2,'0');
            const s = (t%60).toString().padStart(2,'0');
            display.innerText = `${m}:${s}`;

            if(t <= 0) {
                clearInterval(inv);
                display.style.opacity = '0';
                document.body.className = 'state-tension';
                btn.style.pointerEvents = 'auto'; btn.style.opacity = '1';
                document.getElementById('input-peso').focus();
            }
        }, 1000);
    },

    finalizarYDescargar: function() {
        if (this.wakeLock) this.wakeLock.release();
        StateManager.sellarExpediente();
        document.getElementById('zen-wrapper').remove();
        document.getElementById('pre-flight-container').style.display = 'block';
        document.body.className = 'state-tension';
    }
};
