const MIN_SUELDO = 130.00; 

function validarDatos(sueldo, antiguedad) {
    if (sueldo <= MIN_SUELDO) {
        return "El sueldo debe ser mayor al sueldo minimo ($" + MIN_SUELDO + ").";
    }
    if (antiguedad < 0) {
        return "Los anos de servicio no pueden ser negativos.";
    }
    return null; 
}

function obtenerEstadisticas(empleados) {
    if (empleados.length === 0) {
        console.log("\nNo hay datos suficientes para las estadisticas.");
        return;
    }

    let nominaTotal = 0;
    let mayorAntiguedad = empleados[0];

    for (let i = 0; i < empleados.length; i++) {
        nominaTotal += empleados[i].sueldoQuincenal;

        if (empleados[i].anosServicio > mayorAntiguedad.anosServicio) {
            mayorAntiguedad = empleados[i];
        }
    }

    console.log("\n=== ESTADISTICAS GENERALES ===");
    console.log("Total a pagar en la quincena: $" + nominaTotal.toFixed(2));
    console.log("Empleado con mas anos de servicio:");
    console.log(" -> " + mayorAntiguedad.nombre + " (" + mayorAntiguedad.anosServicio + " anos)");
}

module.exports = { validarDatos, obtenerEstadisticas };