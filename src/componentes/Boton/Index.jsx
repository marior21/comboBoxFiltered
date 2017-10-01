import React from 'react'

export default function Boton(props) {
    return (
        <div style={{ display: props.visible ? 'block' : 'none' }}>
            {props.visible && <input type='button' id={props.id} value={props.titulo} onClick={props.onClick} />}
        </div>
    )
}