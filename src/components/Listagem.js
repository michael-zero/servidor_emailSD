import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'


import Form from './Form'
import Responder from './Responder'
import {Context} from '../Logado'
import { useHistory } from 'react-router'
import Encaminhar from './Encaminhar'


const Listagem = () => {
    let history= useHistory();
    const {logado, setLogado} = React.useContext(Context)
    const [tipo,setTipo]=React.useState('principal')
    const [emails, setEmails] = React.useState(null)
    const [alteraBd, setAlterouBD] = React.useState(false)

   

    const obterEmails = async () => {
        if(logado){
            const res = await axios.get(`http://localhost:8080/api/emails/${logado.email}`)
        
        const {data} = await res 

        setEmails(data.emails)   
        }else{
            alert('deslogado');
            history.push('/')
        }
     

    }


    const deletar = async (id) => {
        try {
          const res = await axios.delete(`http://localhost:8080/api/emails/${id}`)
          console.log(res)
          setAlterouBD(!alteraBd)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        obterEmails()
    },[alteraBd])

    return (
        <div className='container-fluid'>

         <div className="row">
            
             <div className="col-10 mx-sm-auto ml-md-auto  ">
             <nav className="nav d-flex justify-space-evenly w-md-100  w-sm-50">
                <div className="nav-item  tipos-box w-25">
                <Link className='btn tipos' to='/' onClick={(e)=>{setTipo('principal')}}><i className="fa fa-tablet" aria-hidden="true"></i> Principal</Link>
                </div>
                <div className="nav-item tipos-box w-25">
                <Link className='btn tipos' to='/' onClick={(e)=>{setTipo('social')}}><i className="fa fa-users" aria-hidden="true"></i> Social</Link>
                </div>
                <div className="nav-item tipos-box w-25">
                <Link className='btn tipos' to='/' onClick={(e)=>{setTipo('promocoes')}}><i className="fa fa-tag" aria-hidden="true"></i> Promocões</Link>
                </div>
                </nav>
             </div>
            
         </div>

         
         <div className="row my-5">
        
               <ul class="list-group  col-sm-3 barra-lateral w-100 ">
                <Form/>


             
                <li class="list-group-item"><i className="fa fa-tablet" aria-hidden="true"> Caixa de entrada</i></li>
                <li class="list-group-item"><i className="fa fa-star-o" aria-hidden="true"> Com estrela</i></li>
                <li class="list-group-item"><i className="fa fa-clock-o" aria-hidden="true"></i> Adiados</li>
                <li class="list-group-item"><i className="fa fa-paper-plane" aria-hidden="true"></i> Enviados</li>
                <li class="list-group-item"><i className="fa fa-file-o" aria-hidden="true"></i> Rascunhos</li>
                <li class="list-group-item"><i className="fa fa-chevron-down" aria-hidden="true"></i> Mais</li>
                </ul>
              
             <div className=" col-sm-9 listador">
             <table className="table table-borderless ">
            
                <tbody>
                    {
                        emails ? emails.map((email,i)=>{
                            return(
                                <tr key={i} className='d-flex justify-content-between fila '>
                                    <td >{email.remetente}</td>
                                    <td>{email.assunto}</td>
                                    <td>{email.mensagem}</td>
                                    <td>
                                        <i className="ml-2 fa fa-trash-o botao apagar-btn" aria-hidden="true" title='apagar' onClick={() => {deletar(email.id)}}></i>
                                        <Responder email={email}/>
                                        <Encaminhar email={email}/>
                                        </td>


                                   
                                </tr>
                            )
                        }) : <tr><td><p>Voce n tem emails</p></td></tr>
                    }
                </tbody>
                </table>
             </div>
         </div>
        </div>
    )
}

export default Listagem