const http = require('http')
// const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, createMensagem, getMensagens} = require('./controllers/mensagemController')
const {createUsuario, getUsuarios, obterEmails, enviarEmail, logar} = require('./controllers/usuairosController')

require('./database/conexao')

const Email = require('./models/Email')
const Usuario = require('./models/Usuario')
const sequelize = require('./database/conexao');
const { deletaEmail } = require('./controllers/mensagemController')
const headers = require('./config/headers')
Usuario.hasMany(Email, {as: "MeusEmails", foreignKey:'usuarioId'}); 
Email.belongsTo(Usuario, {as:"Dono", foreignKey:'usuarioId'});
sequelize.sync();

//Ao abrir a conexão você recebe todos os cabeçalhos, mas não recebe o BODY , então será preciso concatená-lo com o req.on('data')
const server = http.createServer((req, res) => {
    // Status da requisicao 
    // Contet-Type > informa o tipo de mídia de um recurso - html, json , video , etc ...
    // é no header que passamos informações adicionais na req ou na res. 
    // console.log("REQ", req.url.split('/')[3])

    //  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');



  
   
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
      }

  
    if (["GET","POST","DELETE"].indexOf(req.method) > -1) {
        //  console.log(headers)
        //  res.writeHead(200, headers);

            if(req.url.match(/\/api\/emails\/\w+/) && req.method === 'GET'){
               
                const email = req.url.split('/')[3]
                obterEmails(req,res,email)
            }
            else if(req.url.match(/\/api\/emails\/([0-9]+)/) && req.method === 'DELETE'){
                const id = req.url.split('/')[3]
                deletaEmail(req, res, id)    
            }
            else if(req.url === '/api/usuarios' && req.method === 'GET'){
                getUsuarios(req, res)
            }
            else if(req.url === '/api/usuario' && req.method === 'POST'){
                createUsuario(req, res)
            }
        
            else if(req.url === '/api/email' && req.method === 'POST'){
                // const idDestinatario = req.url.split('/')[3]
                enviarEmail(req,res)
            }
            else if(req.url.match(/\/api\/logar\/\w+/) && req.method === 'GET'){
                const nome = req.url.split('/')[3]
                logar(req, res,nome)
            }
    }

    // else if(req.url.match(/\/api\/usuarios\/\w+/) && req.method === 'GET'){
    //     const id = req.url.split('/')[3]
    //     //getProduct(req,res,id)
    //      getMensagens(req, res, id)
    
    else{
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({msg: 'Rota não encontrada'}))
    }

})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))