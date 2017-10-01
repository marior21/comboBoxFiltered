import React from 'react'

export default function Columnas(props) {
    return (
        <thead>
            <tr>
                {props.columnas.map((cadaColumna) => {
                    return <td>{cadaColumna}</td>
                })}
            </tr>
        </thead>
    )
}