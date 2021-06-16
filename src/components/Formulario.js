import React from 'react'
import axios from 'axios'

const Formulario = () => {

        // const [mensagem,setMensagem]=React.useState(null);

        const [assunto,setAssunto]=React.useState('');
        const [remetente,setRemetente]=React.useState('');
        const [destinatario,setDestinatario]=React.useState('');
        const [mensagem,setMensagem]=React.useState('');
        

    const enviar =  async (e)=>{
        // console.log(assunto,remetente,destinatario,mensagem)
        e.preventDefault();
        const email= {
            assunto: assunto,
            mensagem: mensagem,
            remetente: remetente,
            destinatario: destinatario
        }
       
        
            console.log("emaiL = ", email)
            await axios.post('http://localhost:8080/api/email',email)
        
        
    }


    return (
       <form onSubmit={enviar}>
           <p>{assunto}</p>
           <input type='text'   name='assunto' placeholder='Digite o assunto' onChange={(e)=>{setAssunto(e.target.value)}}/> <br/>
           <input type='text'   name='mensagem' placeholder='Digite a mensagem' onChange={(e)=>{setMensagem(e.target.value)}}/> <br/>
           <input type='text'   name='destinatario' placeholder='Digite o destinatario' onChange={(e)=>{setDestinatario(e.target.value)}}/> <br/>
           <input type='text'   name='remetente' placeholder='Digite o remetente' onChange={(e)=>{setRemetente(e.target.value)}}/> <br/>

           <input type='submit'/>
       </form>
    )
}


/// mensagem= e.target.value

export default Formulario
