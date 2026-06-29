// js/main.js
import { SAB_CONSTANTS } from './core/constants.js';
import { StateManager } from './core/state.js';
import { GamificationEngine } from './modules/gamification.js';
import { AuditorEngine } from './modules/auditor.js';
import { SyncEngine } from './modules/sync.js';

const SAB_Orchestrator = {
    init: function() {
        console.log("S.A.B: Iniciando Secuencia de Orquestación...");
        
        StateManager.init();
        
        const ultimoExpediente = SyncEngine.recuperarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA');
        const requiereAuditoria = AuditorEngine.evaluarBloqueoTrimestral(ultimoExpediente);

        if (requiereAuditoria) {
            this.forzarModoAuditoria();
        } else {
            this.vincularEventosUI();
            this.evaluarCargaSistemica();
        }
    },

    vincularEventosUI: function() {
        // Ejemplo de binding virtual. En producción, apuntar a IDs del DOM real.
        /*
        document.getElementById('btn-iniciar').addEventListener('click', () => this.iniciarProtocolo());
        document.getElementById('btn-serie-terminada').addEventListener('click', (e) => this.procesarSerie(e));
        document.getElementById('btn-finalizar').addEventListener('click', () => this.finalizarProtocolo());
        */
    },

    forzarModoAuditoria: function() {
        console.warn("S.A.B: BLOQUEO ACTIVO. Auditoría trimestral requerida.");
        // Lógica para ocultar UI de rutinas y mostrar únicamente UI de Test (Cooper/FatMax)
    },

    evaluarCargaSistemica: function() {
        // Carga simulada para ejemplo de orquestación. 
        // En producción, se extrae del histórico de Expedientes importados.
        const cargaAguda7Dias = 15000; 
        const cargaCronica28Dias = 12000; 
        
        const analisisACWR = AuditorEngine.evaluarACWR(cargaAguda7Dias, cargaCronica28Dias);
        
        if (analisisACWR.alerta) {
            console.warn(`S.A.B: ALERTA ACWR (${analisisACWR.ratio}). Activando Modo Guardia.`);
            // Disparar evento UI para advertencia de descarga
        }
    },

    iniciarProtocolo: function() {
        StateManager.iniciarSesion();
        // Lógica UI: Activar Wake Lock, ocultar selectores, mostrar túnel Zen
    },

    procesarSerie: function(idEjercicio, peso, reps, rir, aditamento) {
        if (!StateManager.currentSession) return;

        // 1. Guardar en memoria
        StateManager.registrarSerie(idEjercicio, peso, reps, rir, aditamento);

        // 2. Extraer métrica de impacto
        const tonelajeActual = StateManager.currentSession.metadatos_sesion.tonelaje_total;
        const impactoRealidad = GamificationEngine.calcularEscalaTitanes(tonelajeActual);

        // 3. Actualizar estado
        StateManager.currentSession.metadatos_sesion.escala_titanes_actual = impactoRealidad.nivel;
        SyncEngine.guardarBackupLocal('SAB_SESION_ACTIVA', StateManager.currentSession);

        // 4. Lógica UI esperada: 
        // - Flash visual de confirmación
        // - Llenar barra de progreso (Dorado)
        // - Transición de fondo (Tensión -> Recuperación)
        // - Disparar Timer de descanso
    },

    procesarTestCooper: function(distanciaMetros) {
        const resultado = AuditorEngine.calcularVO2MaxCooper(distanciaMetros);
        
        const fechaActual = new Date().toISOString();
        SyncEngine.guardarBackupLocal('SAB_ULTIMA_AUDITORIA_FECHA', fechaActual);
        
        console.log(`S.A.B: VO2 Max Registrado: ${resultado.valor} (${resultado.categoria})`);
        
        // Liberar sistema y reiniciar orquestador
        this.init();
    },

    finalizarProtocolo: function() {
        if (!StateManager.currentSession) return;

        const tonelajeFinal = StateManager.currentSession.metadatos_sesion.tonelaje_total;
        const reporteImpacto = GamificationEngine.calcularEscalaTitanes(tonelajeFinal);
        
        console.log(`S.A.B: Sesión Finalizada. Impacto: ${reporteImpacto.descripcion}`);
        
        // Asignar duración (Ejemplo asume cálculo de timestamps en UI)
        StateManager.currentSession.metadatos_sesion.duracion_min = 60; 

        // Sellar y descargar archivo
        SyncEngine.exportarExpedienteJSON(StateManager.currentSession, "SAB_Expediente");
        SyncEngine.limpiarBackupLocal('SAB_SESION_ACTIVA');
        
        // Lógica UI esperada: Mostrar reporte de impacto y reiniciar a Pre-Flight
    }
};

// Arrancar el motor al cargar el DOM
document.addEventListener('DOMContentLoaded', () => SAB_Orchestrator.init());