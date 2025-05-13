/***************************************************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Usuário
 * DATA: 11/02/2025
 * AUTOR: Rebeka
 * VERSÃO: 1.0
 ***************************************************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js');

// Import do DAO de Usuario
const usuarioDAO = require('../../model/DAO/usuario.js');

// Inserir um novo Usuário
const inserirUsuario = async function (usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!usuario.nome || !usuario.email || !usuario.senha || usuario.nome.length > 45 || usuario.email.length > 45 || usuario.senha.length > 45) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                const result = await usuarioDAO.insertUsuario(usuario);
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

// Atualizar Usuário existente
const atualizarUsuario = async function (id, usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (!id || id === '') return message.ERROR_INVALID_ID;

            // Validação
            if (!usuario.nome || !usuario.email || !usuario.senha || usuario.nome.length > 45 || usuario.email.length > 45 || usuario.senha.length > 45) {
                return message.ERROR_REQUIRED_FIELDS; // 400
            } else {
                const result = await usuarioDAO.updateUsuario(usuario);

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

// Excluir Usuário
const excluirUsuario = async function (id) {
    try {
        if (!id || id === '') return message.ERROR_INVALID_ID;

        const result = await usuarioDAO.deleteUsuario(id);

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

// Listar todos os Usuários
const listarUsuarios = async function () {
    try {
        const result = await usuarioDAO.selectAllUsuario();

        if (result) {
            return {
                status: true,
                status_code: 200,
                items: result.length,
                usuarios: result,
            };
        } else {
            return message.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Buscar Usuário por ID
const buscarUsuario = async function (id) {
    try {
        if (!id || id === '') return message.ERROR_INVALID_ID;

        const result = await usuarioDAO.selectByIdUsuario(id);

        if (result) {
            return {
                status: true,
                status_code: 200,
                usuario: result,
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario
};
