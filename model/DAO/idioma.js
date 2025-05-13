/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 **************************************************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
        
    //Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()

//--------------------------------------------------
const insertIdioma = async function(idioma) {
    try {
        let sql = `insert into tbl_idioma (
                     nome,
                     arquivo_url
                   ) 
                     values 
                     (
                     '${idioma.nome}',
                     '${idioma.arquivo_url}'
                   )`
        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------
const updateIdioma = async function(idioma) {
    try {
        let sql = `update tbl_idioma set nome = '${idioma.nome}',
                                        arquivo_url = '${idioma.arquivo_url || null}'
                                        where id = ${idioma.id}`

        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if(resultIdioma){
            return resultIdioma
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

//------------------------------------------------------


const deleteIdioma = async function(id) {
    try {
        let sql = `delete from tbl_idioma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//------------------------------------------------------

const selectAllIdiomas = async function() {
    try {
        let sql = 'select * from tbl_idioma order by nome asc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------

const selectByIdIdioma = async function(id) {
    try {
        let sql = `select * from tbl_idioma where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

         if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------
const selectByNomeIdioma = async function (nome) {
    try {
        let sql = `SELECT * FROM tbl_idioma WHERE nome LIKE '%${nome}%'`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result && result.length > 0)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------
const searchIdiomaByNome = async function (nome) {
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
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdiomas,
    selectByIdIdioma,
    selectByNomeIdioma,
    searchIdiomaByNome
}