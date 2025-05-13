/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de País
 * DATA: 18/04/2025
 * AUTORA: Rebeka
 * VERSÃO: 1.0
 *******************************************************************************************/

// Import das mensagens de status
const message = require('../../modulo/config.js')

// Import do DAO
const paisDAO = require('../../model/DAO/pais.js')

// Inserir novo país
const inserirPais = async function (pais, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!pais.nome || pais.nome.trim() === '' || pais.nome.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let result = await paisDAO.insertPais(pais)
                
                console.log(result)
                if (result)
                    return message.SUCESS_CREATED_ITEM
                 else
                     return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualizar país
const atualizarPais = async function (id, pais, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id || isNaN(id) || id <= 0 
                || !pais.nome || pais.nome.trim() === '' 
                || pais.nome.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let paisExistente = await paisDAO.selectByIdPais(parseInt(id))

                if (paisExistente && paisExistente.length > 0) {
                    pais.id = parseInt(id)
                    let result = await paisDAO.updatePais(pais)
                    
                if (result)
                    return message.SUCESS_UPDATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            } else {
                    return message.ERROR_NOT_FOUND
            }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
/**************************************************************** */
// Excluir país
const excluirPais = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const registro = await paisDAO.selectByIdPais(parseInt(id))
            if (registro && registro.length > 0) {
                const result = await paisDAO.deletePais(parseInt(id))
                return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Listar todos os países
const listarPaises = async function () {
    try {
        const result = await paisDAO.selectAllPais()
        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: result.length,
                paises: result
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Buscar país por ID
const buscarPaisPorId = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const result = await paisDAO.selectByIdPais(parseInt(id))
            if (result && result.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    pais: result
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Buscar país por nome
const buscarPaisPorNome = async function (nome) {
    try {
        if (!nome || nome.trim() === '') {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const result = await paisDAO.selectByNomePais(nome)
            if (result && result.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    paises: result
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/*///////////////////ATUALIZADO POR CONTA DA RELAÇÃO 1xN//////////////////*/
const getFilmesPorPais = async function(idPais) {
    if (!idPais || isNaN(idPais)) {
        return { status: 400, message: 'ID do país inválido' };
    }

    const filmes = await paisDAO.selectFilmesPorPais(idPais);
    if (filmes && filmes.length > 0) {
        return { 
            status: 200, 
            data: filmes,
            message: 'Filmes encontrados com sucesso'
        };
    } else {
        return { 
            status: 404, 
            message: 'Nenhum filme encontrado para este país.' 
        };
    }
};



module.exports = {
    inserirPais,
    atualizarPais,
    excluirPais,
    listarPaises,
    buscarPaisPorId,
    buscarPaisPorNome,
    getFilmesPorPais
}
