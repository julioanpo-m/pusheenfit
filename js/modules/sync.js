export const SyncEngine = {
    guardarBackupLocal: function(clave, datos) {
        localStorage.setItem(clave, JSON.stringify(datos));
    },
    recuperarBackupLocal: function(clave) {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    },
    limpiarBackupLocal: function(clave) {
        localStorage.removeItem(clave);
    }
};
