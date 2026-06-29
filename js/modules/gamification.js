import { SAB_CONSTANTS } from '../core/constants.js';

export const GamificationEngine = {
    calcularEscalaTitanes: function(tonelajeTotalKg) {
        const titanes = SAB_CONSTANTS.TITANES;
        if (tonelajeTotalKg >= titanes.NIVEL_3.peso_kg) {
            return { nivel: titanes.NIVEL_3.nombre, descripcion: `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.IGNIS_4CYL_KG).toFixed(1)} Motores Suzuki Ignis` };
        } else if (tonelajeTotalKg >= titanes.NIVEL_1.peso_kg) {
            return { nivel: titanes.NIVEL_1.nombre, descripcion: `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.CEMENTO_KG).toFixed(1)} Bultos de Cemento` };
        }
        return { nivel: "Ninguno", descripcion: `${(tonelajeTotalKg / SAB_CONSTANTS.REALIDAD.STORMY_KG).toFixed(1)} Unidades Domésticas (Stormy)` };
    }
};
