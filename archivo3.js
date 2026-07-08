const prompt = require('prompt-sync')();
const db = require('./db');
const nomina = require('./nomina');

function main() {
    let listaEmpleados = db.cargarDatos();
    let opc = 0;

    do {
        console.log("\n--- MENU DE NOMINA (EQUIPO 3) ---");
        console.log("1. Registrar Empleado");
        console.log("2. Mostrar Todos");
        console.log("3. Editar Empleado");
        console.log("4. Eliminar Empleado");
        console.log("5. Ver Estadisticas");
        console.log("6. Salir");
        opc = Number(prompt("Opcion: "));

        if (opc === 1) {
            console.log("\n[Nuevo Registro]");
            let nombre = prompt("Nombre y Apellido: ");
            let cargo = prompt("Cargo: ");
            let sueldoQuincenal = Number(prompt("Sueldo Quincenal: "));
            let anosServicio = Number(prompt("Anos de Servicio: "));

            let msgError = nomina.validarDatos(sueldoQuincenal, anosServicio);
            if (msgError) {
                console.log("\nError: " + msgError);
            } else {
                listaEmpleados.push({ nombre, cargo, sueldoQuincenal, anosServicio });
                db.guardarDatos(listaEmpleados);
                console.log("Registrado.");
            }

        } else if (opc === 2) {
            console.log("\n[Personal Registrado]");
            if (listaEmpleados.length === 0) {
                console.log("La lista esta vacia.");
            } else {
                for (let i = 0; i < listaEmpleados.length; i++) {
                    let emp = listaEmpleados[i];
                    console.log((i + 1) + ". " + emp.nombre + " - " + emp.cargo + " (Sueldo: $" + emp.sueldoQuincenal + ", Antiguedad: " + emp.anosServicio + " anos)");
                }
            }

        } else if (opc === 3) {
            console.log("\n[Editar Registro]");
            if (listaEmpleados.length === 0) {
                console.log("No hay empleados.");
                continue;
            }
            
            for (let i = 0; i < listaEmpleados.length; i++) {
                console.log((i + 1) + ". " + listaEmpleados[i].nombre);
            }
            let index = Number(prompt("Numero de empleado a modificar: ")) - 1;

            if (index >= 0 && index < listaEmpleados.length) {
                let empActual = listaEmpleados[index];
                
                let nuevoNombre = prompt("Nombre (" + empActual.nombre + "): ") || empActual.nombre;
                let nuevoCargo = prompt("Cargo (" + empActual.cargo + "): ") || empActual.cargo;
                
                let sueldoInput = prompt("Sueldo (" + empActual.sueldoQuincenal + "): ");
                let nuevoSueldo = sueldoInput ? Number(sueldoInput) : empActual.sueldoQuincenal;
                
                let anosInput = prompt("Anos de Servicio (" + empActual.anosServicio + "): ");
                let nuevosAnos = anosInput ? Number(anosInput) : empActual.anosServicio;

                let msgError = nomina.validarDatos(nuevoSueldo, nuevosAnos);
                if (msgError) {
                    console.log("\nNo se pudo actualizar: " + msgError);
                } else {
                    listaEmpleados[index] = { nombre: nuevoNombre, cargo: nuevoCargo, sueldoQuincenal: nuevoSueldo, anosServicio: nuevosAnos };
                    db.guardarDatos(listaEmpleados);
                    console.log("Registro actualizado.");
                }
            } else {
                console.log("Seleccion invalida.");
            }

        } else if (opc === 4) {
            console.log("\n[Eliminar Registro]");
            if (listaEmpleados.length === 0) {
                console.log("No hay empleados.");
                continue;
            }
            
            for (let i = 0; i < listaEmpleados.length; i++) {
                console.log((i + 1) + ". " + listaEmpleados[i].nombre);
            }
            let index = Number(prompt("Numero de empleado a eliminar: ")) - 1;

            if (index >= 0 && index < listaEmpleados.length) {
                let borrado = listaEmpleados.splice(index, 1);
                db.guardarDatos(listaEmpleados);
                console.log("Se elimino a: " + borrado[0].nombre);
            } else {
                console.log("Seleccion invalida.");
            }

        } else if (opc === 5) {
            nomina.obtenerEstadisticas(listaEmpleados);
        }

    } while (opc !== 6);
    
    console.log("\nPrograma finalizado de forma correcta.");
}

main();