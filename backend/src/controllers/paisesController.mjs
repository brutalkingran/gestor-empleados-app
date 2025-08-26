// controladores
// gestiona solicitudes HTTP, llamando servicios correspondientes y utilizando las vistas para presentar los datos
// 5)

import { mostrarTodosLosPaises, crearPais, editarPais, borrarPais, obtenerPaisPorId } from "../services/paisesService.mjs";
import { renderizarPais, renderizarListaPaises } from '../views/responseView.mjs';

export const mostrarTodosLosPaisesController = async ( req, res ) => {
    try {
        const paises  = await mostrarTodosLosPaises();

        if (!paises || paises.length === 0) {
            return res.status(404).json({
                mensaje: "No se encontraron países en la base de datos."
            });
        }

        const paisFormateado = renderizarListaPaises(paises);
    
        res.status(200).json(paisFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al obtener países`,
            error: error.mensaje
        });
    }
}

export const crearPaisController = async ( req, res ) => {
    try {
        const { nombreOficial, capital, borders, area, population, gini, timezones } = req.body;
        await crearPais({ nombreOficial, capital, borders, area, population, gini, timezones });
        
        //res.status(201).json(paisFormateado);

        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al crear país`,
            error: error.mensaje
        });
    }
}

export const editarPaisController = async ( req, res ) => {
    try {
        const datosActualizados = req.body; // parámetros POST o PUT

        await editarPais( datosActualizados.id, datosActualizados );

        // res.status(200).json(paisModificado);
        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al editar país`,
            error: error.mensaje
        });
    }
}

export const borrarPaisController = async ( req, res ) => {
    try {
        const { id } = req.params;

        const paisBorrado = await borrarPais( id );

        res.status(200).json(paisBorrado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al eliminar país`,
            error: error.mensaje
        });
    }
}

export const obtenerPaisPorIDController = async ( req, res ) => {
    try {
        const { id } = req.params;

        const paisBorrado = await obtenerPaisPorId( id );

        res.status(200).json(paisBorrado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al buscar país`,
            error: error.mensaje
        });
    }
}