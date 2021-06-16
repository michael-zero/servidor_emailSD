import React from 'react'
import axios from 'axios'
import {Context} from '../Logado'
import { useHistory } from 'react-router'


const Login = () => {

    const {setLogado} = React.useContext(Context)
    let history = useHistory()
    const [nome, setNome] = React.useState(null)

 
    
    const logar = async (e, nome) => {
        
        e.preventDefault();
         console.log(nome);
        try {
          const res = await axios.get(`http://localhost:8080/api/logar/${nome}`)  
          
         if(res.status === 201){
            alert("USuario nao encontrado")
        }else if(res.status === 200){
            const {data} = await res
            setLogado(data)
            history.push('/listagem')
            
          
            
        }
         

        } catch (error) {
             console.log(error);
        }
        

       

        // const {email} = await res.data
       
        // console.log(email)
        
    }

    return (
       <div className="container">
           <div className="row">
               <div className="col-sm-10 col-md-6 mx-auto py-5">
                   {/* <p>{logado ? logado : "nao logado"}</p> */}
                   <form className='mx-auto custom-center' onSubmit={(e) => logar(e, nome)}>
                       <div className="form-group">
                      
                       <input  onChange={(e) => setNome(e.target.value)}
                       className='form-control  mx-auto text-left' type="text" name="" id='login' placeholder='Digite seu nome' />
                       <input className='btn btn-primary mt-3' type='submit'/>
                       </div>
                   </form>
               </div>
           </div>
       </div>
    )
}

export default Login

/***
 


 <form onSubmit={logar}>
            <input value={nome} name='nome' onChange={(e) => setNome(e.target.value)}/>
        </form>
 */


        /**
         * 
        
         return <Redir to='' ></Redir
        
        
        
        
        */