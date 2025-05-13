/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Produtora
 * DATA: 13/05/2025
 * AUTORA: Adaptado por ChatGPT com base no padrão da aluna Rebeka
 * VERSÃO: 2.0
 *******************************************************************************************/

const message = require('../../modulo/config.js')
const produtoraDAO = require('../../model/DAO/produtora.js')
const paisDAO = require('../../model/DAO/pais.js') // para buscar o país de cada produtora
/*****************************************************************************************************************/

// Inserir nova produtora
const inserirProdutora = async function (produtora, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !produtora.nome || produtora.nome.trim() === '' || produtora.nome.length > 45 ||
                !produtora.fundacao || produtora.fundacao.trim() === '' || produtora.fundacao.length > 45 ||
                !produtora.pais || produtora.pais.trim() === '' || produtora.pais.length > 20 ||
                !produtora.tbl_pais_id || isNaN(produtora.tbl_pais_id)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let result = await produtoraDAO.insertProdutora(produtora)
                return result ? message.SUCESS_CREATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
/*****************************************************************************************************************/

// Atualizar produtora
const atualizarProdutora = async function (id, produtora, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                !id || isNaN(id) || id <= 0 ||
                !produtora.nome || produtora.nome.trim() === '' || produtora.nome.length > 45 ||
                !produtora.fundacao || produtora.fundacao.trim() === '' || produtora.fundacao.length > 45 ||
                !produtora.pais || produtora.pais.trim() === '' || produtora.pais.length > 20 ||
                !produtora.tbl_pais_id || isNaN(produtora.tbl_pais_id)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let produtoraExistente = await produtoraDAO.selectByIdProdutora(parseInt(id))
                if (produtoraExistente && produtoraExistente.length > 0) {
                    produtora.id = parseInt(id)
                    let result = await produtoraDAO.updateProdutora(produtora)
                    return result ? message.SUCESS_UPDATED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
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

/*****************************************************************************************************************/

// Excluir produtora
const excluirProdutora = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const registro = await produtoraDAO.selectByIdProdutora(parseInt(id))
            if (registro && registro.length > 0) {
                const result = await produtoraDAO.deleteProdutora(parseInt(id))
                return result ? message.SUCCESS_DELETED_ITEM : message.ERROR_INTERNAL_SERVER_MODEL
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/*****************************************************************************************************************/

// Listar todas as produtoras com dados do país (1:N)
const listarProdutoras = async function () {
    try {
        let result = await produtoraDAO.selectAllProdutoras()
        let arrayProdutoras = []
        let dados = {}

        if (result && result.length > 0) {
            for (const item of result) {
                // busca o pais com o campo tbl_pais_id
                let paisRelacionado = await paisDAO.selectByIdPais(item.tbl_pais_id)
                item.pais = paisRelacionado[0]
                delete item.tbl_pais_id
                arrayProdutoras.push(item)
            }

            dados.status = true
            dados.status_code = 200
            dados.quantidade = arrayProdutoras.length
            dados.produtoras = arrayProdutoras

            return dados
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/*****************************************************************************************************************/


// Buscar produtora por ID com dados do país (1:N)
const buscarProdutoraPorId = async function (id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            const result = await produtoraDAO.selectByIdProdutora(parseInt(id))
            let dados = {}

            if (result && result.length > 0) {
                for (const item of result) {
                    let paisRelacionado = await paisDAO.selectByIdPais(item.tbl_pais_id)
                    item.pais = paisRelacionado[0]
                }

                dados.status = true
                dados.status_code = 200
                dados.produtora = result

                return dados
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/*****************************************************************************************************************/

module.exports = {
    inserirProdutora,
    atualizarProdutora,
    excluirProdutora,
    listarProdutoras,
    buscarProdutoraPorId
}
