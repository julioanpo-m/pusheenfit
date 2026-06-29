// js/modules/sync.js

export const SyncEngine = {
    guardarBackupLocal: function(clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify(datos));
            return true;
        } catch (error) {
            console.error("S.A.B. Error de Backup Local:", error);
            return false;
        }
    },

    recuperarBackupLocal: function(clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            console.error("S.A.B. Error al recuperar Backup:", error);
            return null;
        }
    },

    limpiarBackupLocal: function(clave) {
        localStorage.removeItem(clave);
    },

    exportarExpedienteJSON: function(datos, prefijo = "SAB_Auditoria") {
        if (!datos) return false;

        try {
            const fechaString = new Date().toISOString().split('T')[0];
            const nombreArchivo = `${prefijo}_${fechaString}.json`;
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datos, null, 2));
            
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", nombreArchivo);
            
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            
            return true;
        } catch (error) {
            console.error("S.A.B. Error exportando JSON:", error);
            return false;
        }
    },

    importarExpedienteJSON: function(archivo, callback) {
        if (!archivo) return callback(new Error("No hay archivo"), null);

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const datosProcesados = JSON.parse(event.target.result);
                callback(null, datosProcesados);
            } catch (error) {
                console.error("S.A.B. Archivo corrupto o formato inválido.");
                callback(error, null);
            }
        };
        reader.readAsText(archivo);
    }
};