import React from 'react'
import PropTypes from 'prop-types'

export default function Columnas(props) {
    return (
        <thead>
            <tr>
                {props.columnas.map(cadaColumna =>
                    <td>{cadaColumna}</td>
                )}
            </tr>
        </thead>
    )
}

Columnas.PropTypes = {
    columnas: PropTypes.array.isRequired
}
