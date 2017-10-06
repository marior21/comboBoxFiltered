import React from 'react'
import PropTypes from 'prop-types'

export default function Item(props) {
    return (
        <tr onClick={props.onSelectValor}>
             {props.columnas.map(cadaColumna => 
                    <td>{props.elemento[cadaColumna]}</td>
                )}         
        </tr>
    )
}

Item.PropTypes = {
    elemento: PropTypes.object.isRequired,
    columnas: PropTypes.array.isRequired,
    onSelectValor: PropTypes.func.isRequired    
}