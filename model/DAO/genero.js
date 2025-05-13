/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 **************************************************************************************************************************/
//SITUAÇÃO DO CRUD DA TABELA: OK;

//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
        
    //Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()


//--------------------------------------------------

const insertGenero = async function(genero) {
    try {
        let sql = `INSERT INTO tbl_genero (
                                    nome) 

                                    values
                                    (
                                    '${genero.nome}'
                                    )`;
//pedindo para o prisma executar a variavel no my sql
//executa o script sql no banco de dados e aguarda o retorno do BD para saber se deu certo

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {

        console.error('Erro ao inserir gênero:', error)
        return false
    }
};

//--------------------------------------------------


const updateGenero = async function(genero) {
    try {
        let sql = `update tbl_genero set nome = '${genero.nome}' 
                                    where id = ${genero.id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)
        console.log(resultGenero)
        if(resultGenero){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
};

//--------------------------------------------------

const deleteGenero = async function(id) {
    try {
        //verifica se o genero ja foi registrado a um filme
        const filmes = await prisma.$queryRawUnsafe(
            `select * from filme_genero where tbl_genero_id = ${id}`
        );
        
        if (filmes && filmes.length > 0) {
            throw new Error('Não é possível excluir: existem filmes associados a este gênero');
        }
        //
        let sql = `delete from tbl_genero where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)


        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
};

//--------------------------------------------------

const selectAllGeneros = async function() {
    try {
        let sql = 'select * from tbl_genero order by nome asc'

        let result = await prisma.$queryRawUnsafe(sql)


        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
};

//--------------------------------------------------

const selectByIdGenero = async function(id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)


        console.log(result)
        if (result)
            return result 
        else
            return false

    } catch (error) {
        return false
    }
};

//--------------------------------------------------

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
};