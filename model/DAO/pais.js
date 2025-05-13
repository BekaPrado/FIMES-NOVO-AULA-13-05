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


//Objeto tipo JSON
const insertPais = async function(pais) {
    try {
        let sql = `insert into tbl_pais (
                                        nome
                                        )
                                        values 
                                        (
                                        '${pais.nome}'
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


const updatePais = async function(pais) {
    try {
        let sql = `update tbl_pais set 
                      nome = '${pais.nome}'
                   where id = ${pais.id}`

        let resultPais = await prisma.$executeRawUnsafe(sql)

        if(resultPais) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//------------------------------------------------------

const deletePais = async function(id) {
    try {
        let sql = `delete from tbl_pais where id = ${id}`
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

const selectAllPais = async function() {
    try {
        let sql = 'select * from tbl_pais order by id desc'
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

const selectByIdPais = async function(id) {
    try {
        let sql = `select * from tbl_pais where id = ${id}`
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


const selectByNomePais = async function(nome) {
    try {
        let sql = `select * from tbl_pais where nome like '%${nome}%'`
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

/*///////////////////ATUALIZADO POR CONTA DA RELAÇÃO 1xN//////////////////*/

const selectFilmesPorPais = async function(idPais) {
    try {
        const filmes = await prisma.tbl_filme.findMany({
            where: {
                tbl_pais_id: Number(idPais)
            },
            include: {
                pais: true
            }
        });
        return filmes;
    } catch (error) {
        console.error(error);
        return false;
    }
};


module.exports = {
    insertPais,
    updatePais,
    deletePais,
    selectAllPais,
    selectByIdPais,
    selectByNomePais,
    selectFilmesPorPais
} 