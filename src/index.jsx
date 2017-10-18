import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ComboBoxC from './componentes/comboBoxC/ComboBoxC.jsx'


inicializarComboBoxC()
function inicializarComboBoxC() {
    
    Array.from(document.querySelectorAll('[data-comboboxc]')).forEach((cadacombo) => {      
        let parent = cadacombo
        let offSetTop = 0
        let offSetBottom = 0
        while(parent) {        
            offSetTop += parent.offsetTop
            offSetBottom += parent.offsetBottom
            parent = parent.offsetParent
        }
        ReactDOM.render(<ComboBoxC datasource={JSON.parse(cadacombo.dataset.datasource)}
            columnas={JSON.parse(cadacombo.dataset.columnas)}
            elementosPagina={cadacombo.dataset.elementosPagina}
            campoIdentificador={cadacombo.dataset.campoId}
            campoDescripcion={cadacombo.dataset.campoDescripcion}
            valor={cadacombo.dataset.valor}
            id={cadacombo.dataset.idElemento} 
            obligatorio={cadacombo.dataset.val}
            mensajeObligatorio={cadacombo.dataset.valRequired} 
            readonly={cadacombo.getAttribute('readonly')}
            offsetTopContenedor={offSetTop}
            offsetBottomContenedor={offSetBottom} />, cadacombo);
    })
}

