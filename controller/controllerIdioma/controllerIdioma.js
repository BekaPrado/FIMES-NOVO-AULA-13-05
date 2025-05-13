/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Idioma
 * DATA: 18/04/2025
 * AUTOR: Rebeka
 * VERSÃO: 1.1
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de idiomas
const idiomaDAO = require('../../model/DAO/idioma.js')

//------------------------------------------------------------------------------------------

const inserirIdioma = async function (idioma, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!idioma.nome || idioma.nome.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let result = await idiomaDAO.insertIdioma(idioma)

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

//------------------------------------------------------------------------------------------

const atualizarIdioma = async function (id, idioma, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id || isNaN(id) || id <= 0 ||
                !idioma.nome || idioma.nome.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let idiomaExistente = await idiomaDAO.selectByIdIdioma(parseInt(id))

                if (idiomaExistente && idiomaExistente.length > 0) {
                    idioma.id = parseInt(id)
                    let result = await idiomaDAO.updateIdioma(idioma)

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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const excluirIdioma = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let idioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if (idioma && idioma.length > 0) {
                let result = await idiomaDAO.deleteIdioma(parseInt(id))

                if (result)
                    return message.SUCCESS_DELETED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const listarIdiomas = async function () {
    try {
        let dados = await idiomaDAO.selectAllIdiomas()

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: dados.length,
                idiomas: dados
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const buscarIdiomaPorId = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        }

        let idioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

        if (idioma && idioma.length > 0) {
            return {
                status: true,
                status_code: 200,
                idioma: idioma
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const buscarIdiomaPorNome = async function (nome) {
    try {
        if (!nome || nome.trim() === '') {
            return message.ERROR_REQUIRED_FIELDS
        }

        const result = await idiomaDAO.selectByNomeIdioma(nome)

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: result.length,
                idiomas: result
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

module.exports = {
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdiomas,
    buscarIdiomaPorId,
    buscarIdiomaPorNome
}
