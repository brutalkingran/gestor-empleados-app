// capa de persistencia
// interfaz crud
// implementacion crud de pais. SEPARA LÓGICA DE ACCESO DE BASE DE DATOS
// actúa como un intermediario entre la base de datos y la lógica de la aplicación
// 3)

import Pais from "../models/Paises.mjs";
import IRepository from "./IRepository.mjs";

class PaisRepository extends IRepository {
    async obtenerTodos() {
        return await Pais.find({ creador: 'Patricio' }); // filtra los que estén a mi nombre
    }

    async crearPais({ nombreOficial, capital, borders, area, population, gini, timezones }) {
        return await Pais.create({
            name: { official: nombreOficial },
            capital,
            borders,
            area,
            population,
            gini,
            timezones
        });
    }

    async editarPais(id, datosActualizados) {
        return await Pais.findByIdAndUpdate(id, datosActualizados, { new: true }); // Devuelve documento actualizado
    }

    async borrarPais(id) {
        return await Pais.findByIdAndDelete(id);
    }

    async obtenerPais( id ) {
        return await Pais.findById(id);
    }
}

export default new PaisRepository();
