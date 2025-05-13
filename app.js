/******************************************************************************************************
 * OBJETIVO: Criar uma API para realizar o CRUD do sistema de controle de Filmes                      *
 * DATA: 11/02/2025                                                                                   *
 * AUTOR: Rebeka                                                                                      *
 * Versão: 1.0                                                                                        *
 * Observação:                                                                                        *
 *          Para criar a API precisamos instalar:                                                     *
 *                 express             npm install express --save                                     *
 *                 cors                npm install cors --save                                        *
 *                 body-parser         npm install body-parser --save                                 *
 *                                                                                                    *
 *          Para criar a integração com o Banco de Dados precisamos instalar:                         *
 *                 prisma               npm install prisma -save(para fazer a conexão com o BD)       *
 *                 prisma/client        npm install @prisma/client --save (para rodar os scripts SQL) *
 *                                                                                                    *  
 *                                                                                                    *
 *          Após a instalação do prima e do prisma client, devemos :                                  *
 *              npx prisma init                                                                       *
 *                                                                                                    *
 *          Você deverá configurar o arquivo .env e o schema.prisma com as credenciais do BD          *
 *          Após essa configuração voce deverá rodar o seguinte comando:                              *
 *                      npx prisma migrate dev                                                        *
 *********************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//manipular o body da requisição para chega apenas JSON
const bodyParserJSON=bodyParser.json()
//cria o objeto app com referencia do express
const app=express ()
//configura o acesso cors
app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin','*')
    response.header('Acess-Control-Allow-Methods','GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
    app.use(cors())
    next()
})
/******************************* importação do controller  **************************************************/
const controllerFilme = require('./controller/controllerFilme/controllerFilme')
const controllerGenero = require('./controller/controllerGenero/controllerGenero.js')
const controllerIdioma = require('./controller/controllerIdioma/controllerIdioma.js')
const controllerNacionalidade = require('./controller/controllerNacionalidade/controllerNacionalidade.js')
const controllerPais = require ('./controller/controllerPais/controllerPais.js')
const controllerSexo = require ('./controller/controllerSexo/controllerSexo.js')
const controllerUsuario = require ('./controller/controllerUsuario/controllerUsuario.js')
const controllerProdutora = require ('./controller/controllerProdutora/controllerProdutora.js')


/**********************************************************************************************************************************/
/*********************************************************FILME********************************************************************/
/**********************************************************************************************************************************/

//ROTAS

// inserir um novo filme
app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)
    response.status(resultFilme.status_code).json(resultFilme)
})
/*****************************************************************************************************************/

// listar todos os filmes
// Corrigir a rota de listagem de filmes (mudar para GET)
app.get('/v1/controle-filmes/filme', cors(), async (request, response) => {
    const resultFilme = await controllerFilme.listarFilme()
    response.status(resultFilme.status_code).json(resultFilme)
})
/*****************************************************************************************************************/

// buscar filme por ID
app.get('/v1/controle-filmes/filme/:id', async (request, response) => {
    const idFilme = request.params.id
    const resultFilme = await controllerFilme.buscarFilme(idFilme)
    response.status(resultFilme.status_code).json(resultFilme)
})
/*****************************************************************************************************************/

// excluir filme por ID
app.delete('/v1/controle-filmes/filme/:id', async (request, response) => {
    const idFilme = request.params.id
    const resultFilme = await controllerFilme.excluirFilme(idFilme)
    response.status(resultFilme.status_code).json(resultFilme)
})
/*****************************************************************************************************************/

// atualizar filme por ID
app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const idFilme = request.params.id
    const dadosBody = request.body

    const resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)
    response.status(resultFilme.status_code).json(resultFilme)
})


/**********************************************************************************************************************************/
/*********************************************************GENERO********************************************************************/
/**********************************************************************************************************************************/

// INSERIR UM NOVO GÊNERO
app.post('/v1/controle-filmes/genero', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    
    const resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)
    console.log(resultGenero)
    response.status(resultGenero.status_code).json(resultGenero)

})

/*****************************************************************************************************************/

// LISTAR TODOS OS GÊNEROS
app.get('/v1/controle-filmes/genero', cors(), async (request, response) => {
    const result = await controllerGenero.listarGeneros()
    response.status(result.status_code).json(result)
})

/*****************************************************************************************************************/

// BUSCAR GÊNERO POR ID
app.get('/v1/controle-filmes/genero/:id', cors(), async (request, response) => {
    const idGenero = request.params.id

    const result = await controllerGenero.buscarGeneroPorId(idGenero)
    response.status(result.status_code).json(result)
})

/*****************************************************************************************************************/

// ATUALIZAR GÊNERO POR ID
app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async (request, response) => {
    const idGenero = request.params.id
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)
    response.status(result.status_code).json(result)
})

/*****************************************************************************************************************/

// EXCLUIR GÊNERO POR ID
app.delete('/v1/controle-filmes/genero/:id', cors(), async (request, response) => {
    const idGenero = request.params.id

    const result = await controllerGenero.excluirGenero(idGenero)
    response.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/
/*********************************************************IDIOMA*******************************************************************/
/**********************************************************************************************************************************/

// inserir Idioma
app.post('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// listar todos os idiomas
app.get('/v1/controle-filmes/idioma', cors(), async (request, response) => {
    const result = await controllerIdioma.listarIdiomas()

    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// buscar idioma por ID
app.get('/v1/controle-filmes/idioma/:id', cors(), async (request, response) => {
    const idIdioma = request.params.id

    const result = await controllerIdioma.buscarIdiomaPorId(idIdioma)

    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// buscar idioma por nome
app.get('/v1/controle-filmes/idioma/nome/:nome', cors(), async (request, response) => {
    const nome = request.params.nome

    const result = await controllerIdioma.buscarIdiomaPorNome(nome)

    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// atualizar idioma
app.put('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async (request, response) => {
    const idIdioma = request.params.id
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerIdioma.atualizarIdioma(idIdioma, dadosBody, contentType)

    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// excluir idioma
app.delete('/v1/controle-filmes/idioma/:id', cors(), async (request, response) => {
    const idIdioma = request.params.id

    const result = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(result.status_code).json(result)
})

/**********************************************************************************************************************************/
/*******************************************************NACIONALIDADE**************************************************************/
/**********************************************************************************************************************************/


// inserir nacionalidade
app.post('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)
    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// listar todas as nacionalidades
app.get('/v1/controle-filmes/nacionalidade', cors(), async (request, response) => {
    const result = await controllerNacionalidade.listarNacionalidades()
    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// buscar nacionalidade por ID
app.get('/v1/controle-filmes/nacionalidade/:id', cors(), async (request, response) => {
    const id = request.params.id
    const result = await controllerNacionalidade.buscarNacionalidadePorId(id)
    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// atualizar nacionalidade
app.put('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async (request, response) => {
    const id = request.params.id
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const result = await controllerNacionalidade.atualizarNacionalidade(id, dadosBody, contentType)
    response.status(result.status_code).json(result)
})
/*****************************************************************************************************************/

// excluir nacionalidade
app.delete('/v1/controle-filmes/nacionalidade/:id', cors(), async (request, response) => {
    const id = request.params.id
    const result = await controllerNacionalidade.excluirNacionalidade(id)
    response.status(result.status_code).json(result)
})



/**********************************************************************************************************************************/
/*******************************************************PAIS***********************************************************************/
/**********************************************************************************************************************************/

app.post('/v1/controle-filmes/pais', cors(), bodyParserJSON, async (req, res) => {
    const contentType = req.headers['content-type']
    const dadosBody = req.body

    const result = await controllerPais.inserirPais(dadosBody, contentType)
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

// LISTAR PAÍSES
app.get('/v1/controle-filmes/pais', cors(), async (req, res) => {
    const result = await controllerPais.listarPaises()
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

// BUSCAR PAÍS POR ID
app.get('/v1/controle-filmes/pais/:id', cors(), async (req, res) => {
    const result = await controllerPais.buscarPaisPorId(req.params.id)
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

// ATUALIZAR PAÍS
app.put('/v1/controle-filmes/pais/:id', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerPais.atualizarPais(req.params.id, req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

// EXCLUIR PAÍS
app.delete('/v1/controle-filmes/pais/:id', cors(), async (req, res) => {
    const result = await controllerPais.excluirPais(req.params.id)
    res.status(result.status_code).json(result)
})

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////ATUALIZADO POR CONTA DA RELAÇÃO 1xN COM FILME////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


app.get('/v1/filmes/pais/:id', cors(), async (req, res) => {
    const idPais = req.params.id;
    const result = await controllerPais.getFilmesPorPais(idPais);
    res.status(result.status).json(result.data || { message: result.message });
});

/**********************************************************************************************************************************/
/*******************************************************SEXO***********************************************************************/
/**********************************************************************************************************************************/

app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerSexo.inserirSexo(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.get('/v1/controle-filmes/sexo', cors(), async (req, res) => {   
    const result = await controllerSexo.listarSexos()
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.get('/v1/controle-filmes/sexo/:id', cors(), async (req, res) => {
    const result = await controllerSexo.buscarSexo(req.params.id)
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerSexo.atualizarSexo(req.params.id, req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.delete('/v1/controle-filmes/sexo/:id', cors(), async (req, res) => {
    const result = await controllerSexo.excluirSexo(req.params.id)
    res.status(result.status_code).json(result)
})
 
/**********************************************************************************************************************************/
/*******************************************************USUARIO***********************************************************************/
/**********************************************************************************************************************************/

app.post('/v1/controle-filmes/usuario', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerUsuario.inserirUsuario(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.get('/v1/controle-filmes/usuario', cors(), async (req, res) => {
    const result = await controllerUsuario.listarUsuarios()
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.get('/v1/controle-filmes/usuario/:id', cors(), async (req, res) => {
    const result = await controllerUsuario.buscarUsuario(req.params.id)
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.put('/v1/controle-filmes/usuario/:id', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerUsuario.atualizarUsuario(req.params.id, req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})
/**********************************************************************************************************************************/

app.delete('/v1/controle-filmes/usuario/:id', cors(), async (req, res) => {
    const result = await controllerUsuario.excluirUsuario(req.params.id)
    res.status(result.status_code).json(result)
})



/**********************************************************************************************************************************/
/*******************************************************PRODUTORA******************************************************************/
/**********************************************************************************************************************************/

app.post('/v1/controle-filmes/produtora', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerProdutora.inserirProdutora(req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

app.get('/v1/controle-filmes/produtora', cors(), async (req, res) => {
    const result = await controllerProdutora.listarProdutoras()
    res.status(result.status_code).json(result)
})

app.get('/v1/controle-filmes/produtora/:id', cors(), async (req, res) => {
    const result = await controllerProdutora.buscarProdutoraPorId(req.params.id)
    res.status(result.status_code).json(result)
})

app.put('/v1/controle-filmes/produtora/:id', cors(), bodyParserJSON, async (req, res) => {
    const result = await controllerProdutora.atualizarProdutora(req.params.id, req.body, req.headers['content-type'])
    res.status(result.status_code).json(result)
})

app.delete('/v1/controle-filmes/produtora/:id', cors(), async (req, res) => {
    const result = await controllerProdutora.excluirProdutora(req.params.id)
    res.status(result.status_code).json(result)
})






/*-----------------------------------------------------------------------------------------*/





//servidor
app.listen(8080, () => {
    console.log('API funcionando e aguardando requisições na porta 8080...')
})
