// js/core/state.js
import { SAB_CONSTANTS } from './constants.js';
import { BIOMECANICA } from './taxonomy.js';

export const StateManager = {
    // Memoria volátil (La sesión actual en curso)
    currentSession: null,

    // 1. INICIALIZACIÓN Y RECUPERACIÓN
    init: function() {
        const sesionGuardada = localStorage.getItem('SAB_SESION_ACTIVA');
        if (sesionGuardada) {
            this.currentSession = JSON.parse(sesionGuardada);
            console.log("S.A.B: Sesión recuperada tras interrupción.");
        } else {
            console.log("S.A.B: Sistema listo. Esperando inicio de protocolo.");
        }
    },

    // 2. EL PORTAL DE INICIO (Crear Expediente Diario)
    iniciarSesion: function() {
        this.currentSession = {
            header: {
                fecha: new Date().toISOString(),
                perfil: "julio"
            },
            metadatos_sesion: {
                duracion_min: 0,
                tonelaje_total: 0,
                escala_titanes_actual: "Ninguna",
                estado: SAB_CONSTANTS.ESTADOS.BLOQUEADO
            },
            auditoria_fuerza: [],
            auditoria_longevidad: {} // Para tests de Cooper/FatMax si tocan hoy
        };
        this.guardarLocal();
    },

    // 3. INPUT ZEN (El motor que registra la "Serie Terminada")
    registrarSerie: function(idEjercicio, peso, reps, rir, aditamento) {
        if (!this.currentSession) return console.error("Error: No hay sesión activa.");

        const ejercicioBase = BIOMECANICA.EJERCICIOS_BASE[idEjercicio];
        if (!ejercicioBase) return console.error("Auditoría fallida: Ejercicio no reconocido.");

        // Buscar si el ejercicio ya se empezó hoy, si no, crearlo en el expediente
        let bloqueEjercicio = this.currentSession.auditoria_fuerza.find(e => e.id === idEjercicio);
        if (!bloqueEjercicio) {
            bloqueEjercicio = {
                id: idEjercicio,
                patron: BIOMECANICA.PATRONES[ejercicioBase.patron].nombre,
                tempo: ejercicioBase.tempo_default,
                series: []
            };
            this.currentSession.auditoria_fuerza.push(bloqueEjercicio);
        }

        // Sellar el dato puro (Auditoría exacta)
        bloqueEjercicio.series.push({
            peso: parseFloat(peso),
            reps: parseInt(reps),
            rir: parseInt(rir),
            aditamento: aditamento,
            timestamp: new Date().toISOString()
        });

        // Actualizar el tonelaje (La base de la Gamificación)
        this.currentSession.metadatos_sesion.tonelaje_total += (peso * reps);

        // Guardar instantáneamente (Poka-Yoke contra cierres accidentales)
        this.guardarLocal();
    },

    // 4. PERSISTENCIA INVISIBLE (Almacenamiento Local)
    guardarLocal: function() {
        localStorage.setItem('SAB_SESION_ACTIVA', JSON.stringify(this.currentSession));
    },

    // 5. SOBERANÍA DE DATOS (El Snapshot de 10 años)
    sellarExpediente: function() {
        if (!this.currentSession) return;
        
        this.currentSession.metadatos_sesion.estado = SAB_CONSTANTS.ESTADOS.LIBRE;
        
        // Convertir el JSON en un archivo físico descargable
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.currentSession, null, 2));
        const downloadAnchorNode = document.createElement('a');
        
        // Nombrar el archivo con marca de tiempo precisa
        const nombreArchivo = "SAB_Auditoria_" + new Date().toISOString().split('T')[0] + ".json";
        
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", nombreArchivo);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        // Limpiar la memoria tras asegurar el archivo
        localStorage.removeItem('SAB_SESION_ACTIVA');
        this.currentSession = null;
    }
};