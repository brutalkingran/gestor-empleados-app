// Lógica de negocio. Llama a los repositorios para obtener datos y aplicar lógica adicional.
// Servicios de pais
// 4)

import PaisRepository from "../repositories/paisesRepository.mjs";

export const mostrarTodosLosPaises = async () => {
    return await PaisRepository.obtenerTodos();
}

export const crearPais = async (datosPais) => {
    return await PaisRepository.crearPais(datosPais);
}

export const editarPais = async ( id, datosActualizados ) => {
    return await PaisRepository.editarPais( id, datosActualizados );
}

export const borrarPais = async ( id ) => {
    return await PaisRepository.borrarPais( id );
}

export const obtenerPaisPorId = async ( id ) => {
    return await PaisRepository.obtenerPais( id );
}