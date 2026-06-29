// js/modules/gamification.js
import { SAB_CONSTANTS } from '../core/constants.js';

export const GamificationEngine = {
    calcularEscalaTitanes: function(tonelajeTotalKg) {
        const titanes = SAB_CONSTANTS.TITANES;
        let nivelAlcanzado = "Ninguno";
        let comparativaReal = "";

        if (tonelajeTotalKg >= titanes.NIVEL_5.peso_kg) {
            nivelAlcanzado = titanes.NIVEL_5.nombre;
            comparativaReal = `${(tonelajeTotalKg / titanes.NIVEL_5.peso_kg).toFixed(1)} Ballenas Azules`;
        } else if (tonelajeTotalKg >= titanes.NIVEL_4.peso_kg) {
            nivelAlcanzado = titanes.NIVEL_4.nombre;
            comparativaReal = `${(tonelajeTotalKg / titanes.NIVEL_4.peso_kg).toFixed(1)} Elefantes Africanos`;
        } else if (tonelajeTotalKg >= titanes.NIVEL_3.peso_kg) {
            nivelAlcanzado = titanes.NIVEL_3.nombre;
            comparativaReal = `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.IGNIS_4CYL_KG).toFixed(1)} Motores Suzuki Ignis`;
        } else if (tonelajeTotalKg >= titanes.NIVEL_2.peso_kg) {
            nivelAlcanzado = titanes.NIVEL_2.nombre;
            comparativaReal = `${(tonelajeTotalKg / titanes.NIVEL_2.peso_kg).toFixed(1)} Refrigeradores`;
        } else if (tonelajeTotalKg >= titanes.NIVEL_1.peso_kg) {
            nivelAlcanzado = titanes.NIVEL_1.nombre;
            comparativaReal = `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.CEMENTO_KG).toFixed(1)} Bultos de Cemento`;
        } else {
            comparativaReal = `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.STORMY_KG).toFixed(1)} Unidades Domésticas (Stormy)`;
        }

        return { nivel: nivelAlcanzado, descripcion: comparativaReal };
    }
};