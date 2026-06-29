// js/modules/auditor.js
import { SAB_CONSTANTS } from '../core/constants.js';

export const AuditorEngine = {
    calcularVO2MaxCooper: function(distanciaMetros) {
        const distanciaKm = distanciaMetros / 1000;
        const vo2Max = (22.351 * distanciaKm) - 11.288;
        
        let clasificacion = "Pobre";
        if (distanciaMetros >= 2700) clasificacion = "Excelente";
        else if (distanciaMetros >= 2300) clasificacion = "Superior";
        else if (distanciaMetros >= 1900) clasificacion = "Promedio";
        else if (distanciaMetros >= 1500) clasificacion = "Bajo";

        return { valor: vo2Max.toFixed(2), categoria: clasificacion };
    },

    evaluarBloqueoTrimestral: function(fechaUltimaAuditoriaIso) {
        if (!fechaUltimaAuditoriaIso) return true; 

        const fechaUltima = new Date(fechaUltimaAuditoriaIso);
        const hoy = new Date();
        const diferenciaMilisegundos = hoy - fechaUltima;
        const semanasTranscurridas = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 7);

        return semanasTranscurridas >= SAB_CONSTANTS.GOBERNANZA.SEMANAS_MAX_SIN_AUDITAR;
    },

    evaluarACWR: function(cargaAguda, cargaCronica) {
        if (cargaCronica === 0) return { ratio: 0, alerta: false };
        const ratio = cargaAguda / cargaCronica;
        return {
            ratio: ratio.toFixed(2),
            alerta: ratio >= SAB_CONSTANTS.GOBERNANZA.ACWR_THRESHOLD_PELIGRO
        };
    }
};