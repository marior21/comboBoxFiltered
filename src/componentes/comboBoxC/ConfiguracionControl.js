export default function configControl(props, state) {
    const ancho = props.width ? props.width : '100%'
        let numeroPaginas = state.datosFiltrados.length / props.elementosPagina
        if (numeroPaginas % 1 > 0) {
            numeroPaginas = Math.floor(numeroPaginas) + 1
        }
        const mostrarPie = numeroPaginas > 1 && state.mostrarNoResultados == false
        const mostrarCabecera = props.columnas.length > 1
        const offSet = 20
        const alturaControl = 31
        const alturaCabecera = mostrarCabecera ? 34 : 0
        const alturaPie = alturaCabecera
        const margenTabla = 3
        const alturaBotones = 35
        const alturaPaginacion = mostrarPie ? alturaPie + margenTabla + alturaBotones : 0
        const alturaVentana = 39 * (
            props.datasource.length > props.elementosPagina ?
                props.elementosPagina :
                props.datasource.length) + alturaCabecera

        const windowHeight = document.documentElement.offsetHeight;
        //const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const alturaCompararAbajo = windowHeight - alturaControl - props.offsetTopContenedor
        const alturaCompararArriba = alturaControl + props.offsetTopContenedor
        let topVentana = alturaControl + 2
        let alturaComparar = alturaCompararAbajo - offSet
        const alturaMayorArriba = alturaCompararArriba > alturaCompararAbajo
        if (alturaMayorArriba) {
            alturaComparar = alturaCompararArriba - offSet
            topVentana = alturaComparar > alturaVentana ? -(alturaVentana + alturaPaginacion) : -alturaComparar
        }
        let altura = String(alturaComparar) + 'px'
        if (alturaComparar > alturaVentana) {
            altura = 'auto'
        }
        let estilosPrincipal = 'k-widget k-combobox k-header'
        let estilosSecundario = 'k-widget k-dropdown-wrap k-state-default'
        let estilosInput = 'k-input'
        if (state.ventanaVisible) {
            estilosPrincipal += (alturaMayorArriba === true ? ' k-state-border-up' : ' k-state-border-down')
            estilosSecundario += ' k-active ' + (alturaMayorArriba === true ? ' k-state-border-up' : ' k-state-border-down')
        }
        if (props.estilo) {
            estilosInput += ' ' + props.estilo
        }

        return {
            ancho,
            altura,
            topVentana,
            estilosPrincipal,
            estilosSecundario,
            estilosInput,
            mostrarPie,
            numeroPaginas
        }
}