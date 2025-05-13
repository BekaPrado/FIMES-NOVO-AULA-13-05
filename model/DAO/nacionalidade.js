/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de nacionalidade
 * DATA: 11/02/2025
 * AUTOR: Rebeka
 * Versão: 1.0
 **************************************************************************************************************************/

// Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//------------------------------------------------------

// Inserir nova nacionalidade
const insertNacionalidade = async function(nacionalidade) {
    try {
        const sql = `insert into tbl_nacionalidade (nacionalidade) values ('${nacionalidade.nacionalidade}')`
        const result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Atualizar nacionalidade
const updateNacionalidade = async function(nacionalidade) {
    try {
        const sql = `update tbl_nacionalidade set nacionalidade = '${nacionalidade.nacionalidade}' where id = ${nacionalidade.id}`
        const result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Excluir nacionalidade
const deleteNacionalidade = async function(id) {
    try {
        const sql = `delete from tbl_nacionalidade where id = ${id}`
        const result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Listar todas as nacionalidades
const selectAllNacionalidade = async function() {
    try {
        const sql = `select * from tbl_nacionalidade order by id desc`
        const result = await prisma.$queryRawUnsafe(sql)

        return result && result.length > 0 ? result : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Buscar por ID
const selectByIdNacionalidade = async function(id) {
    try {
        const sql = `select * from tbl_nacionalidade where id = ${id}`
        const result = await prisma.$queryRawUnsafe(sql)

        return result && result.length > 0 ? result : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Buscar por nome da nacionalidade
const selectByNomeNacionalidade = async function(nacionalidade) {
    try {
        const sql = `SELECT * FROM tbl_nacionalidade WHERE nacionalidade LIKE '%${nacionalidade}%'`
        const result = await prisma.$queryRawUnsafe(sql)

        return result && result.length > 0 ? result : false
    } catch (error) {
        console.error(error)
        return false
    }
}

//------------------------------------------------------

// Função de busca por nome com mensagem personalizada
const searchNacionalidadeByNome = async function(nacionalidade) {
    try {
        if (!nacionalidade || nacionalidade.trim() === '') {
            return { status: false, message: "Nacionalidade é um campo obrigatório." }
        }

        const result = await selectByNomeNacionalidade(nacionalidade)

        if (result && result.length > 0) {
            return {
                status: true,
                status_code: 200,
                quantidade: result.length,
                nacionalidades: result
            }
        } else {
            return { status: false, message: "Nacionalidade não encontrada." }
        }
    } catch (error) {
        console.error(error)
        return { status: false, message: "Erro interno no servidor." }
    }
}

//------------------------------------------------------

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    selectByNomeNacionalidade,
    searchNacionalidadeByNome
}
