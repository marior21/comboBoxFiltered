import React from 'react'
import PropTypes from 'prop-types'

export default function Item(props) {
    return (
        <tr onClick={props.onSelectItem}>
             {props.columnas.map(cadaColumna => 
                    <td className='k-item'>{props.elemento[cadaColumna]}</td>
                )}         
        </tr>
    )
}

Item.PropTypes = {
    elemento: PropTypes.object.isRequired,
    columnas: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired    
}