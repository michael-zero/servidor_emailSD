// import React from 'react'
// import axios from 'axios'

// const ItemLista = ({email, alteraBd, setAlterouBD}) => {


//     const deletar = async (id) => {
//       try {
//         const res = await axios.delete(`http://localhost:8080/api/emails/${id}`)
//         console.log(res)
//         setAlterouBD(!alteraBd)
//       } catch (error) {
//           console.log(error)
//       }
//     }

//     return (
//         <>
//             <li className="list-group-item">{email.remetente}</li>
//             <li className="list-group-item">{email.assunto}</li>
//             <li className="list-group-item">{email.mensagem}</li>
//             <li className="list-group-item" onClick={() => {deletar(email.id)}}>
//                  <i className="fa fa-trash-o" aria-hidden="true"></i>
//             </li>
//         </>
//     )
// }

// export default ItemLista
