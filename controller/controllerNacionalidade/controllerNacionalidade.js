/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Nacionalidade
 * DATA: 18/04/2025
 * AUTORA: Rebeka
 * VERSÃO: 1.1
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de nacionalidade
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

//------------------------------------------------------------------------------------------

const inserirNacionalidade = async function (nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!nacionalidade.nacionalidade || nacionalidade.nacionalidade.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

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

const atualizarNacionalidade = async function (id, nacionalidade, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id || isNaN(id) || id <= 0 ||
                !nacionalidade.nacionalidade || nacionalidade.nacionalidade.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let registroExistente = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

                if (registroExistente && registroExistente.length > 0) {
                    nacionalidade.id = parseInt(id)
                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

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

const excluirNacionalidade = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let registro = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

            if (registro && registro.length > 0) {
                let result = await nacionalidadeDAO.deleteNacionalidade(parseInt(id))

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

const listarNacionalidades = async function () {
    try {
        let dados = await nacionalidadeDAO.selectAllNacionalidade()

        if (dados && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: dados.length,
                nacionalidades: dados
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const buscarNacionalidadePorId = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        }

        let nacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(parseInt(id))

        if (nacionalidade && nacionalidade.length > 0) {
            return {
                status: true,
                status_code: 200,
                nacionalidade: nacionalidade
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------------------------------------------

const buscarNacionalidadePorNome = async function (nome) {
    try {
        if (!nome || nome.trim() === '') {
            return message.ERROR_REQUIRED_FIELDS
        }

        const result = await nacionalidadeDAO.selectByIdNacionalidade(nome)

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: result.length,
                nacionalidades: result
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidades,
    buscarNacionalidadePorId,
    buscarNacionalidadePorNome
}
