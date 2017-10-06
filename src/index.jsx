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
            valor: '',
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
        this.handleOnSelectValor = this.handleOnSelectValor.bind(this)
        this.handleStateButtons = this.handleStateButtons.bind(this)
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDocumentClick)
    }

    handleDocumentClick(e) {
        const contenedor = this.divContenedor
        if (!contenedor.contains(e.target) && e.target.id !== 'BtAnterior') {
            this.setState({ ventanaVisible: false })
        }
    }

    handleOnFocus(e) {
        this.setState({ ventanaVisible: true })
    }

    handleOnChange(e) {
        var losDatos = this.state.datos.filter((dato) => {
            let contiene = false
            this.props.columnas.forEach((columna) => {
                if (dato[columna].toUpperCase().includes(e.target.value.toUpperCase())) {
                    contiene = true
                }
            });
            return contiene
        });
        this.setState({
            datosFiltrados: losDatos,
            valor: e.target.value,
            pagina: 0,
            nextVisible: this.props.elementosPagina < losDatos.length,
            mostrarNoResultados: losDatos.length == 0
        })

    }
    handleOnSelectValor(e) {
        var losDatos = this.state.datos.filter(dato => dato.Nombre.includes(e.target.value));
        this.setState({
            datosFiltrados: losDatos,
            ventanaVisible: false, valor: e.target.innerText
        })
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
            nextVisible: ((prevState.pagina + sumatorio) * props.elementosPagina) < prevState.datosFiltrados.length
        }))
    }

    render() {
        let numeroPaginas = this.state.datosFiltrados.length / this.props.elementosPagina
        if (numeroPaginas % 1 > 0) {
            numeroPaginas = Math.floor(numeroPaginas) + 1
        }

        return (
            <div ref={(div) => { this.divContenedor = div }}>
                <div>
                    <input className={styles.ComboInput} type='text'
                        onFocus={this.handleOnFocus}
                        onChange={this.handleOnChange}
                        value={this.state.valor} />
                    <span className="k-select"><span className="k-icon k-i-arrow-60-down"></span></span>
                </div>
                {this.state.ventanaVisible &&
                    <div ref={(div) => (this.divVentana = div)} className={styles.VentanaEmergente}>
                        <Boton id='BtAnterior' visible={this.state.prevVisible} titulo='Anterior' onClick={this.handleOnPrev} />
                        <table>
                            <Columnas columnas={this.props.columnas} />
                            <tbody>
                                {this.state.datosFiltrados.slice(
                                    this.state.pagina * this.props.elementosPagina,
                                    (this.state.pagina + 1) * this.props.elementosPagina).map((dato) => (
                                        <Item onSelectValor={this.handleOnSelectValor} elemento={dato} columnas={this.props.columnas} />
                                    ))}
                            </tbody>
                            {this.state.mostrarNoResultados == false && <Pie pagina={this.state.pagina + 1}
                                totalPaginas={numeroPaginas}
                                totalItems={this.state.datosFiltrados.length} />}
                        </table>
                        {this.state.mostrarNoResultados && <div className='DivNoResultados'>No se han encontrado resultados</div>}
                        <Boton id='BtSiguiente' visible={this.state.nextVisible} titulo='Siguiente' onClick={this.handleOnNext} />
                    </div>}
            </div>
        )
    }
}


ComboBoxC.PropTypes = {
    datasource: PropTypes.array.isRequired,
    columnas: PropTypes.array.isRequired,
    elementosPagina: PropTypes.number
}

ComboBoxC.defaultProps = {
    elementosPagina: 100
}

window.__comboBoxC_container = document.getElementById('comboBoxC')

ReactDOM.render(
    <ComboBoxC
        datasource={JSON.parse(window.__comboBoxC_container.dataset.datasource)}
        columnas={JSON.parse(window.__comboBoxC_container.dataset.columnas)}
        elementosPagina={200} />, window.__comboBoxC_container)
