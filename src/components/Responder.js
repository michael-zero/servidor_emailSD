import React from 'react'


import axios from 'axios'

const Responder = ({email}) => {

    // console.log(email)
    const [remetente,setRemetente]=React.useState(email.destinatario);
    const [destinatario,setDestinatario]=React.useState(email.remetente);
     
    const [assunto,setAssunto]=React.useState('resposta a '+email.assunto);
    const [mensagem,setMensagem]=React.useState('');
      
    

        const responder =  async (e)=>{
            e.preventDefault();
            const email= {
                assunto: assunto,
                mensagem: mensagem,
                remetente: remetente,
                destinatario: destinatario
            }
                console.log("emaiL RESPOSTA = ", email)
                await axios.post('http://localhost:8080/api/email',email)
        }



        // React.useEffect(()=>{
        //    setDestinatario(destinatario)
        //    setRemetente(remetente)
        // },[]);

    return (

        <>
        {/* <button type="button" className="btn  escrever-btn" data-toggle="modal" data-target="#responder"><img src={cross} alt="escrever" /></button> */}
        <i className="ml-2 fa fa-paper-plane-o botao responder-btn" data-toggle="modal" data-target="#responder" title='responder' ></i>
        
        <div className="modal  fade" id="responder" tabIndex="-1" aria-labelledby="responderLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
               
                 <div className="d-flex justify-content-around">
                     <div className=''>
                         <p className='text-muted mb-0'> <strong>  De:</strong>   {remetente}</p>
                        <p className='text-muted mb-0'><strong>  Para:</strong> {destinatario}</p>
                     </div>
                     <div>

                
                     </div>
                 </div>
            </div>
            <div className="modal-body">
            {/* ------------- */}
            <form onSubmit={responder}>
           
                
                
               
                {/* <input type='text' className='form-control ' required   name='assunto' placeholder='Digite o assunto' onChange={(e)=>{setAssunto(e.target.value)}}/> <br/> */}
                {/* <input type='text' className='form-control' required  name='mensagem' placeholder='Digite a mensagem' onChange={(e)=>{setMensagem(e.target.value)}}/> <br/> */}
                <textarea required placeholder='mensagem ...' class="form-control mb-2" name='mensagem' onChange={(e)=>{setMensagem(e.target.value)}} rows="3"></textarea>


                {/* <button type="submit" className="btn btn-secondary" data-dismiss="modal">enviar</button> */}
             
                  <div className="form-group">
                <button type="submit" className="btn btn-primary">Responder</button>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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

export default Responder
