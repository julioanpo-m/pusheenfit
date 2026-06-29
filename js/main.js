import { StateManager } from './core/state.js';
import { PreFlightUI } from './ui/pre_flight.js';

const SAB_Orchestrator = {
    init: function() {
        StateManager.init();
        PreFlightUI.init();
    }
};
SAB_Orchestrator.init();
