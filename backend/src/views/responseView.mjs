// capa de presentación
// funciones para mostrar datos de países
// 6)

export const renderizarPais = (pais) => {
    // convierte en json
    return {
        nombreOficial: pais.name?.official,
        capital: pais.capital,
        fronteras: pais.borders,
        area: pais.area,
        poblacion: pais.population,
        gini: pais.gini ? Object.fromEntries(pais.gini) : null,
        zonasHorarias: pais.timezones,
        creador: pais.creador,
        creadoEn: pais.createdAt
    };
};

export const renderizarListaPaises = (paises) => {
    return paises.map(pais => renderizarPais(pais));
}

export const formatearArray = ( textoArray = '' ) => {
    // separa cadena por comas
    return textoArray
        .split(",")
        .map(( elemento ) => {
            return elemento.trim();
        })
        .filter( elemento => {
            return elemento !== ""
        } );
}

export const parsearGini = ( value ) => { // convierte dato gini en un objeto { año : valor }
    if (typeof value !== 'string') return value;

    const result = {};
    const entries = value.split(',');

    for (const entry of entries) {
        const [año, valor] = entry.split(':');
        const num = parseFloat(valor);

        if (!año || isNaN(num)) continue;

        result[año.trim()] = num;
    }

    return result;
}