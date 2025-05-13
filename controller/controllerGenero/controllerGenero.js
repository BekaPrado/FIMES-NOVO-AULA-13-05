/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * VERSÃO: 1.0
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de filmes
const generoDAO = require('../../model/DAO/genero.js')

//------------------------------------------------------

const inserirGenero = async function (genero, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!genero.nome || genero.nome.trim() === '' || genero.nome.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                const result = await generoDAO.insertGenero(genero);
                if (result)
                    return message.SUCESS_CREATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------

const atualizarGenero = async function (id, genero, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!id || isNaN(id) || id <= 0 ||
                !genero.nome || genero.nome.trim() === '' || genero.nome.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                const generoExistente = await generoDAO.selectByIdGenero(parseInt(id))

                if (generoExistente && generoExistente.length > 0) {
                    genero.id = parseInt(id)
                    const result = await generoDAO.updateGenero(genero)

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

//------------------------------------------------------

const excluirGenero = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const generoExistente = await generoDAO.selectByIdGenero(parseInt(id))

            if (generoExistente && generoExistente.length > 0) {
                const result = await generoDAO.deleteGenero(parseInt(id))
                if (result)
                    return message.SUCCESS_DELETED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------

const listarGeneros = async function () {
    try {
        const result = await generoDAO.selectAllGeneros()

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: result.length,
                generos: result
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------

const buscarGeneroPorId = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const result = await generoDAO.selectByIdGenero(parseInt(id))

            if (result && result.length > 0) {
                return {
                    status: true,
                    status_code: 200,
                    genero: result
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

//------------------------------------------------------

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGeneroPorId
}