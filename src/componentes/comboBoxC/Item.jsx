import React from 'react'
import Highlighter from 'react-highlight-words'
import PropTypes from 'prop-types'
import styles from './index.css'
import uuid from 'uuid/v4'

export default function Item(props) {
    let estilos = styles.Item;
    if (props.seleccionado) {
        estilos += ' ' + styles.Seleccionado
    }
    return (
        <tr onClick={props.onSelectItem} className={estilos}>
            {props.columnas.map(cadaColumna =>
                <td key={uuid()}>
                    <Highlighter                      
                        searchWords={[props.filtro]}
                        textToHighlight={props.elemento[cadaColumna.Nombre] ? String(props.elemento[cadaColumna.Nombre]) : ''}
                    />
                    
                </td>
            )}
        </tr>
    )
}

Item.PropTypes = {
    elemento: PropTypes.object.isRequired,
    columnas: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    seleccionado: PropTypes.bool.isRequired,
    filtro: PropTypes.string.isRequired
}