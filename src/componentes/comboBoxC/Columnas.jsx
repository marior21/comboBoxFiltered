import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.css'
import uuid from 'uuid/v4'

export default function Columnas(props) {
    return (
        <thead className={styles.Cabecera}>
            <tr>
                {props.columnas.map(cadaColumna =>
                    <td key={uuid()}>{cadaColumna.Caption}</td>
                )}
            </tr>
        </thead>
    )
}

Columnas.PropTypes = {
    columnas: PropTypes.array.isRequired
}
