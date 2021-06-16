const Usuario = require('../models/Usuario')
const Email = require('../models/Email')
const {getPostData} = require('../utils')
const headers = require('../config/headers')

// @desc Obtem todos os usuarios
// @route GET api/usuarios

async function logar(req, res,nome){
    try {
        const usuario = await Usuario.findOne({where: {nome: nome}});
        res.writeHead(200, headers)
        // end é uma resposta, onde pode passar ou não um dado no corpo.
        if(!usuario){
            res.writeHead(201, headers)
            return res.end(JSON.stringify({error: "Usuario nao encontrado"}))   
        }
        res.end(JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}

async function getUsuarios(req, res){
    try {
        const usuarios = await Usuario.findAll();
        res.writeHead(200, headers)
        // end é uma resposta, onde pode passar ou não um dado no corpo.
        res.end(JSON.stringify(usuarios))
    } catch (error) {
        console.log(error)
    }
}
// @desc Cria um Usuario 
// @route POST api/usuarios
async function createUsuario(req, res){
    try {
       const body = await getPostData(req)

       const {nome, senha, email}  = JSON.parse(body)

       const u = await Usuario.findOne({where: {nome: nome}})

       if(u){
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({msg: 'Usuário já existe'}))   
       }

       const Usu = {
        nome,
        senha,
        email
       }

        const newUsuario = await Usuario.create(Usu)

         res.writeHead(201, headers)
        return res.end(JSON.stringify(newUsuario))

    } catch (error) {
        console.log(error)
    }
}

///PUXAR OS EMAILS ATRAVES DO MODEL DO USUARIO
async function obterEmails(req,res,emailDestino){
    try{

        // const usuarios= await Usuario.findAll({where:{nome}, include:[{model:Email, as: "MeusEmails"}]});
        const emails = await Email.findAll({where:{destinatario: emailDestino}});
         res.writeHead(200, headers)
        return res.end(JSON.stringify({emails: emails}))   
       
    }catch(erro){
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: erro}))   
    }
}

async function enviarEmail(req, res){
    try {
        const body = await getPostData(req)
        const {remetente, destinatario, mensagem, assunto} = JSON.parse(body)

        const usuario = await Usuario.findOne({where:{email:destinatario}})
        
        if(!usuario){
             res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({msg: 'Destinatário não existe'}))   
        }


        
        // console.log(remetente, destinatario, mensagem)
        
        const email = await Email.create({
            remetente:remetente,
            destinatario:destinatario, 
            assunto: assunto,
            mensagem:mensagem,
            usuarioId:usuario.id})
        
        // res.writeHead(201, { 'access-control-allow-origin': '*', 'content-type': 'application/json; charset=utf-8' })//201 arquivo criado
        res.writeHead(200, headers)
        return res.end(JSON.stringify({msg: 'Mensagem Enviada', email: email}))   

    } catch (error) {
        res.writeHead(404, { 'access-control-allow-origin': '*' })//erro ao criar mensagem
        //  res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({msg: error}))         
    }
}

module.exports = {createUsuario, getUsuarios, obterEmails, enviarEmail, logar}