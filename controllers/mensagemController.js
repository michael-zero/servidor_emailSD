// const Product = require('../model/mensagemModel')
const {getPostData} = require('../utils')
const Email = require('../models/Email')
const Usuario = require('../models/Usuario')
const headers = require('../config/headers')

// @desc Deleta uma mensagem 
// @route Delete api/mensagens/:id
async function deletaEmail(req, res,id){
    try {
    
       const email = await Email.findOne({where: {id}})
       
       if(!email){
        res.writeHead(404, { 'access-control-allow-origin': '*' })//erro ao criar mensagem   
        // res.writeHead(400, {"Content-Type": "application/json"})
            // end é uma resposta, onde pode passar ou não um dado no corpo.
            res.end(JSON.stringify({msg: 'Email não encontrado'}))
       }else{

            
            await email.destroy()
            
            res.writeHead(200, { 'access-control-allow-origin': '*'})//201 arquivo criado
            // res.writeHead(200, headers)
            return res.end(JSON.stringify({msg: "Email apagado com sucesso"}))
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = {deletaEmail}