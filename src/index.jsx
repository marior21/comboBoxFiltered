import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Item from './componentes/Item/Item.jsx'
import Columnas from './componentes/Columnas/Columnas.jsx'
import Pie from './componentes/Pie/Pie.jsx'
import Boton from './componentes/Boton/Boton.jsx'
import styles from './index.css'

class ComboBoxC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ventanaVisible: false,
            datos: this.props.datasource,
            datosFiltrados: this.props.datasource,
            filtro: '',
            selectValue: '',
            nextVisible: this.props.datasource.length > this.props.elementosPagina,
            prevVisible: false,
            pagina: 0,
            mostrarNoResultados: this.props.datasource.length == 0
        }
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnFocus = this.handleOnFocus.bind(this)
        this.handleOnNext = this.handleOnNext.bind(this)
        this.handleOnPrev = this.handleOnPrev.bind(this)
        this.handleStateButtons = this.handleStateButtons.bind(this)
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDocumentClick)
    }

    getDatos(elfiltro) {
        return elfiltro ? this.state.datos.filter((dato) => {
            let contiene = false
            this.props.columnas.forEach((columna) => {
                if (dato[columna].toUpperCase().includes(elfiltro.toUpperCase())) {
                    contiene = true
                }
            });
            return contiene
        }) : this.state.datos;
    }

    handleDocumentClick(e) {
        const contenedor = this.divContenedor
        if (!contenedor.contains(e.target) && e.target.id !== 'BtAnterior' && e.target.id !== 'BtSiguiente') {
            this.setState({ ventanaVisible: false })
        }
    }

    handleOnFocus(e) {
        if (this.state.ventanaVisible) {
            return
        }
        this.setState({
            ventanaVisible: true,
            pagina: 0,
            nextVisible: this.props.elementosPagina < this.state.datosFiltrados.length,
            prevVisible: false
        })
    }

    handleOnChange(e) {
        var losDatos = this.getDatos(e.target.value)
        this.setState({
            datosFiltrados: losDatos,
            filtro: e.target.value,
            pagina: 0,
            nextVisible: this.props.elementosPagina < losDatos.length,
            mostrarNoResultados: losDatos.length == 0
        })

    }
    handleOnSelectItem(elDato) {
        this.setState((prevState, props) => ({
            datosFiltrados: prevState.datos,
            ventanaVisible: false,
            filtro: elDato[props.campoDescripcion],
            selectValue: elDato[props.campoIdentificador]
        }))

    }
    handleOnNext() {
        this.handleStateButtons(1)
        this.divVentana.scrollTop = 0
    }

    handleOnPrev() {
        if (this.state.pagina < 0) {
            return;
        }
        this.handleStateButtons(-1)
    }

    handleStateButtons(sumatorio) {
        this.setState((prevState, props) => ({
            ventanaVisible: true,
            pagina: prevState.pagina + sumatorio,
            prevVisible: prevState.pagina + sumatorio > 0,
            nextVisible:
            ((prevState.pagina + 1 + sumatorio) * props.elementosPagina) < prevState.datosFiltrados.length
        }))
    }

    render() {
        let numeroPaginas = this.state.datosFiltrados.length / this.props.elementosPagina
        if (numeroPaginas % 1 > 0) {
            numeroPaginas = Math.floor(numeroPaginas) + 1
        }
        let mostrarPie = numeroPaginas > 1 && this.state.mostrarNoResultados == false
        let mostrarCabecera = this.props.columnas.length > 1
        let estilosPrincipal = 'k-widget k-combobox k-header'
        let estilosSecundario = 'k-dropdown-wrap k-state-default'
        if(this.state.ventanaVisible) {
            estilosPrincipal += ' k-state-border-down'
            estilosSecundario += ' k-active k-state-border-down'
        }        

        return (
            <span ref={(span) => { this.divContenedor = span }} className={estilosPrincipal}>
                <span className={estilosSecundario}>
                    <input style={{ width: '100%' }} type='text' className='k-input'
                        onFocus={this.handleOnFocus} placeholder="Seleccione un elemento"
                        onChange={this.handleOnChange}
                        value={this.state.filtro} />
                    <input type='text' style={{ display: 'none' }}
                        value={this.state.selectValue} />
                    <span className="k-select"  onClick={this.handleOnFocus}><span className="k-icon k-i-arrow-s"></span></span>
                </span>
                {this.state.ventanaVisible &&
                    <div ref={(div) => (this.divVentana = div)} className='k-animation-container'>
                        <Boton id='BtAnterior'
                            visible={this.state.prevVisible}
                            titulo='Anterior'
                            onClick={this.handleOnPrev} />
                        <table className='k-list k-reset'>
                            {mostrarCabecera && <Columnas columnas={this.props.columnas} />}
                            <tbody>
                                {this.state.datosFiltrados.slice(
                                    this.state.pagina * this.props.elementosPagina,
                                    (this.state.pagina + 1) * this.props.elementosPagina).map((dato) => (
                                        <Item key={dato[this.props.campoIdentificador]}
                                            onSelectItem={() => this.handleOnSelectItem(dato)}
                                            elemento={dato} columnas={this.props.columnas} />
                                    ))}
                            </tbody>
                            {mostrarPie && <Pie pagina={this.state.pagina + 1}
                                totalPaginas={numeroPaginas}
                                totalItems={this.state.datosFiltrados.length} />}
                        </table>
                        {this.state.mostrarNoResultados &&
                            <div className='DivNoResultados'>No se han encontrado resultados</div>}
                        <Boton id='BtSiguiente'
                            visible={this.state.nextVisible}
                            titulo='Siguiente'
                            onClick={this.handleOnNext} />
                    </div>}
            </span>
        )
    }
}

ComboBoxC.PropTypes = {
    datasource: PropTypes.array.isRequired,
    columnas: PropTypes.array.isRequired,
    elementosPagina: PropTypes.number,
    campoIdentificador: PropTypes.string.isRequired,
    campoDescripcion: PropTypes.string.isRequired
}

ComboBoxC.defaultProps = {
    elementosPagina: 100
}

document.querySelectorAll('[data-comboboxc]').forEach((cadacombo) => {
    ReactDOM.render(
        <ComboBoxC
            datasource={JSON.parse(cadacombo.dataset.datasource)}
            columnas={JSON.parse(cadacombo.dataset.columnas)}
            elementosPagina={cadacombo.dataset.elementosPagina}
            campoIdentificador={cadacombo.dataset.campoId}
            campoDescripcion={cadacombo.dataset.campoDescripcion} />, cadacombo)
});
