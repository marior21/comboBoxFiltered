import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Item from './componentes/Item'
import Columna from './componentes/Columna'
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
            pagina: 0
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
        var losClientes = this.state.datos.filter(dato => dato.Nombre.includes(e.target.value));
        this.setState({
            datosFiltrados: losClientes,
            valor: e.target.value
        })
    }
    handleOnSelectValor(e) {
        var losClientes = this.state.datos.filter(dato => dato.Nombre.includes(e.target.innerText));
        this.setState({
            datosFiltrados: losClientes,
            ventanaVisible: false, valor: e.target.innerText
        })
    }
    handleOnNext() {
        this.handleStateButtons(1)
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
        return (
            <div ref={(div) => { this.divContenedor = div }}>
                <div>
                    <input className={styles.ComboInput} type='text'
                        onFocus={this.handleOnFocus}
                        onChange={this.handleOnChange}
                        value={this.state.valor} />
                </div>
                {this.state.ventanaVisible &&
                    <div className={styles.VentanaEmergente}>
                        {this.state.prevVisible &&
                            <input type='button' id='BtAnterior' value='Anterior' onClick={this.handleOnPrev} />}
                        <table>
                            <thead>
                                <Columna />
                            </thead>
                            <tbody>
                                {this.state.datosFiltrados.slice(
                                    this.state.pagina * this.props.elementosPagina,
                                    (this.state.pagina + 1) * this.props.elementosPagina).map((dato) => (
                                        <Item onSelectValor={this.handleOnSelectValor} elemento={dato} />                                        
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='3'>
                                        {this.state.pagina + 1} de {this.state.datosFiltrados.length / this.props.elementosPagina}, {this.state.datosFiltrados.length}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        {this.state.nextVisible &&
                            <input type='button' value='Siguiente' onClick={this.handleOnNext} />}
                    </div>}
            </div>
        )
    }

}

window.__comboBoxC_container = document.getElementById('comboBoxC')

ReactDOM.render(
    <ComboBoxC datasource={JSON.parse(window.__comboBoxC_container.dataset.datasource)}
        elementosPagina={200} />, window.__comboBoxC_container)
