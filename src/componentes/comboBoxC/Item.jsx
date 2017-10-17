import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.css'

export default function Item(props) {
    let estilos = styles.Item;
    if(props.seleccionado) {
        estilos += ' ' + styles.Seleccionado
    }
    return (
        <tr onClick={props.onSelectItem} className={estilos}>
             {props.columnas.map(cadaColumna => 
                    <td>{props.elemento[cadaColumna.Nombre]}</td>
                )}         
        </tr>
    )
}

Item.PropTypes = {
    elemento: PropTypes.object.isRequired,
    columnas: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    seleccionado: PropTypes.bool.isRequired  
}