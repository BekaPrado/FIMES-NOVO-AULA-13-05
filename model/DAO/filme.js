/*******************************************************************************************
 * OBJETIVO: Arquivo responsável pelas manipulações no Banco de Dados para a entidade Filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * VERSÃO: 1.0
 *******************************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
/*****************************************************************************************************************/

//ATUALIZACOES DEVIDO A ERRO 
// Inserir Filme
const insertFilme = async function (dadosFilme) {
    try {
        const result = await prisma.tbl_filme.create({
            data: {
                nome: dadosFilme.nome,
                sinopse: dadosFilme.sinopse,
                duracao: new Date(`1970-01-01T${dadosFilme.duracao}:00Z`),
                data_lancamento: new Date(dadosFilme.data_lancamento),
                foto_capa: dadosFilme.foto_capa || null,
                link_trailer: dadosFilme.link_trailer || null,
                tbl_pais_id: dadosFilme.tbl_pais_id,
                tbl_idioma_id: dadosFilme.tbl_idioma_id
            }
        });

        return result ? true : false;
    } catch (error) {
        console.error("Erro ao inserir filme:", error);
        return false;
    }
};

/*****************************************************************************************************************/

// Atualizar Filme
const updateFilme = async function (dadosFilme) {
    try {
        const result = await prisma.tbl_filme.update({
            where: { id: dadosFilme.id },
            data: {
                nome: dadosFilme.nome,
                sinopse: dadosFilme.sinopse,
                duracao: new Date(`${dadosFilme.duracao}`),
                data_lancamento: dadosFilme.data_lancamento,
                foto_capa: dadosFilme.foto_capa || null,
                link_trailer: dadosFilme.link_trailer || null,
                tbl_pais_id: dadosFilme.tbl_pais_id,
                tbl_idioma_id: dadosFilme.tbl_idioma_id
            }
        });

        return result ? true : false;
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
        return false;
    }
};
/*****************************************************************************************************************/

//Função para excluir um Filme existente
const deleteFilme = async function(id){
  try {
    let sql = `delete from tbl_filme where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}
/*****************************************************************************************************************/

//Função para retornar todos os Filmes existentes
const selectAllFilme = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_filme order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}
/*****************************************************************************************************************/

//Função para buscar um Filme pelo ID
const selectByIdFilme = async function(id){
  try {
    let sql = `select * from tbl_filme where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}
/*****************************************************************************************************************/

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
};
