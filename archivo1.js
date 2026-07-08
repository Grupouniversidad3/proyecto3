const fs = require('fs');
const ARCHIVO = 'nomina.json';

function cargarDatos() {
    try {
        if (!fs.existsSync(ARCHIVO)) {
            fs.writeFileSync(ARCHIVO, JSON.stringify([]), 'utf8');
            return [];
        }
        const contenido = fs.readFileSync(ARCHIVO, 'utf8');
        return JSON.parse(contenido);
    } catch (err) {
        console.log("No se pudo leer el archivo, iniciando vacio.");
        return [];
    }
}

function guardarDatos(lista) {
    try {
        fs.writeFileSync(ARCHIVO, JSON.stringify(lista, null, 2), 'utf8');
    } catch (err) {
        console.log("Error al guardar los datos en el disco.");
    }
}

module.exports = { cargarDatos, guardarDatos };