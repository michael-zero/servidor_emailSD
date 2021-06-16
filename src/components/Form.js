import React from 'react'
import cross from '../imgs/cross.png'

import axios from 'axios'

const Form = () => {

        const [assunto,setAssunto]=React.useState('');
        const [remetente,setRemetente]=React.useState('');
        const [destinatario,setDestinatario]=React.useState('');
        const [mensagem,setMensagem]=React.useState('');



        const enviar =  async (e)=>{
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

        <>
        <button type="button" className="btn  escrever-btn" data-toggle="modal" data-target="#exampleModal"><img src={cross} alt="escrever" /></button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Escrever</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            {/* ------------- */}
            <form onSubmit={enviar}>
           
                <input type='email' className='form-control'   name='remetente' placeholder='Digite o remetente' onChange={(e)=>{setRemetente(e.target.value)}}/> <br/>
                <input type='email' className='form-control'   name='destinatario' placeholder='Digite o destinatario' onChange={(e)=>{setDestinatario(e.target.value)}}/> <br/>
                <input type='text' className='form-control '   name='assunto' placeholder='Digite o assunto' onChange={(e)=>{setAssunto(e.target.value)}}/> <br/>
                {/* <input type='text' className='form-control'   name='mensagem' placeholder='Digite a mensagem' onChange={(e)=>{setMensagem(e.target.value)}}/> <br/> */}
                <textarea placeholder='mensagem ...' class="form-control mb-2" name='mensagem' onChange={(e)=>{setMensagem(e.target.value)}} rows="3"></textarea>

                {/* <button type="submit" className="btn btn-secondary" data-dismiss="modal">enviar</button> */}
             
                  <div className="form-group">
                <button type="submit" className="btn btn-primary">Enviar</button>
              
                </div>
           
            </form>
            {/* --------------- */}
            </div>
            </div>
        </div>
        </div>
</>
    )
}

export default Form
