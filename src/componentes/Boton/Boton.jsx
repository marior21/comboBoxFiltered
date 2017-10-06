import React from 'react'
import PropTypes from 'prop-types'

export default function Boton(props) {
    return (
        <div style={{ display: props.visible ? 'block' : 'none' }}>
            {props.visible && <input type='button' id={props.id} value={props.titulo} onClick={props.onClick} />}
        </div>
    )
}

Boton.PropTypes = {
    visible: PropTypes.bool        
}

Boton.defaultProps = {
    visible: false
}