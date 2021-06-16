import React from 'react'

const ListaHorizontal = ({botoes}) => {

    const items= botoes;


    return (
        <ul className="list-inline d-none d-sm-block">
            {items.map((item,i)=>{
                return(
                    <li key={i} className="list-inline-item">
                        {item}
                    </li>
                )
            })}
        </ul>
    )
}

export default ListaHorizontal
