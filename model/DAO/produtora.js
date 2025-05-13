/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de produtora
 * DATA: 13/05/2025
 * AUTOR: Adaptado por ChatGPT com base no padrão da aluna Rebeka
 * Versão: 1.0
 ***************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Inserir nova produtora
const insertProdutora = async function(produtora) {
    try {
        let sql = `INSERT INTO tbl_produtora (
                        nome, fundacao, pais, tbl_pais_id
                   ) VALUES (
                        '${produtora.nome}', 
                        '${produtora.fundacao}', 
                        '${produtora.pais}', 
                         ${produtora.tbl_pais_id}
                   )`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

// Atualizar produtora
const updateProdutora = async function(produtora) {
    try {
        let sql = `UPDATE tbl_produtora SET 
                        nome = '${produtora.nome}',
                        fundacao = '${produtora.fundacao}',
                        pais = '${produtora.pais}',
                        tbl_pais_id = ${produtora.tbl_pais_id}
                   WHERE id = ${produtora.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

// Deletar produtora
const deleteProdutora = async function(id) {
    try {
        let sql = `DELETE FROM tbl_produtora WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

// Selecionar todas as produtoras
const selectAllProdutoras = async function() {
    try {
        let sql = 'SELECT * FROM tbl_produtora ORDER BY id DESC'
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        return false
    }
}

// Selecionar produtora por ID
const selectByIdProdutora = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_produtora WHERE id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        return false
    }
}

// Buscar produtora por nome
const selectByNomeProdutora = async function(nome) {
    try {
        let sql = `SELECT * FROM tbl_produtora WHERE nome LIKE '%${nome}%'`
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertProdutora,
    updateProdutora,
    deleteProdutora,
    selectAllProdutoras,
    selectByIdProdutora,
    selectByNomeProdutora
}
