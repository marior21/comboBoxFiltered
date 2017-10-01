import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default function Item(props) {
    return (
        <tr onClick={props.onSelectValor}>
            <td>{props.elemento['Nombre']}</td>
            <td>{props.elemento['Apellidos']}</td>
            <td>{props.elemento['Empresa']}</td>
        </tr>
    )
}