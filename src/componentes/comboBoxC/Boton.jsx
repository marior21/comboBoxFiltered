import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.css'

export default function Boton(props) {
    return (
        <div style={{ display: props.visible ? 'inline' : 'none' }}>
            {props.visible && <input type='button' className={styles.Boton} id={props.id} value={props.titulo} onClick={props.onClick} />}
        </div>
    )
}

Boton.PropTypes = {
    visible: PropTypes.bool        
}

Boton.defaultProps = {
    visible: false
}