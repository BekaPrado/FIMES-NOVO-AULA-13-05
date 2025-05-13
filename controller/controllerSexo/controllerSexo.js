/***************************************************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Sexo
 * DATA: 11/02/2025
 * AUTOR: Rebeka
 * VERSÃO: 1.0
 ***************************************************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js');

// Import do DAO de Sexo
const sexoDAO = require('../../model/DAO/sexo.js');

// Inserir um novo Sexo
const inserirSexo = async function (sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!sexo.descricao || sexo.descricao.length > 45) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                const result = await sexoDAO.insertSexo(sexo);
                if (result) {
                    return message.SUCESS_CREATED_ITEM; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Atualizar Sexo existente
const atualizarSexo = async function (id, sexo, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!id || id === '') return message.ERROR_INVALID_ID;

            // Validação
            if (!sexo.descricao || sexo.descricao.length > 45) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                const result = await sexoDAO.updateSexo(id, sexo);

                if (result) {
                    return message.SUCESS_UPDATED_ITEM; // 200
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Excluir Sexo
const excluirSexo = async function (id) {
    try {
        if (!id || id === '') return message.ERROR_INVALID_ID;

        const result = await sexoDAO.deleteSexo(id);

        if (result) {
            return message.SUCCESS_DELETED_ITEM; // 200
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Listar todos os Sexos
const listarSexos = async function () {
    try {
        const result = await sexoDAO.selectAllSexo();

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                sexos: result,
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar Sexo por ID
const buscarSexo = async function (id) {
    try {
        if (!id || id === '') return message.ERROR_INVALID_ID;

        const result = await sexoDAO.selectByIdSexo(id);

        if (result) {
            return {
                status: true,
                status_code: 200,
                sexo: result,
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Exportar as funções para o uso nos arquivos de rota
module.exports = {
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexos,
    buscarSexo,
};
