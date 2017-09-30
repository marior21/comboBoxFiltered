//import  { h, render, Component } from 'preact'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'
import { clientes } from './datos.js'
import './assets/Spinner.gif';

class ComboBoxC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ventanaVisible: false,
            datos: clientes,
            datosFiltrados: clientes,
            valor: '',
            nextVisible: clientes.length > 40,
            prevVisible: false,
            pagina: 0,
            elementosPagina: 40
        }
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDocumentClick)
    }

    /* using fat arrow to bind to instance */
    handleDocumentClick(e) {
        //const contenedor = ReactDOM.findDOMNode(this.refs.contenedor);
        const contenedor = this.divContenedor

        if (!contenedor.contains(e.target) && e.target.id !== 'BtAnterior') {
            this.setState({ ventanaVisible: false })
        }

    }

    handleOnFocus(e) {
        if (this.state.ventanaVisible === false) {
            // alert('Hola Munedo')
        }
        this.setState({ ventanaVisible: true })
    }
    handleOnBlur(e) {
        this.setState({ ventanaVisible: false })
    }
    handleOnChange(e) {
        var losClientes = clientes.filter(dato => dato.Nombre.includes(e.target.value));
        this.setState({
            datosFiltrados: losClientes,
            valor: e.target.value
        })
    }
    handleOnSelectValor(e) {
        var losClientes = clientes.filter(dato => dato.Nombre.includes(e.target.innerText));
        this.setState({
            datosFiltrados: losClientes,
            ventanaVisible: false, valor: e.target.innerText
        })
    }
    handleOnNext() {
        var numeroPagina = this.state.pagina + 1;
        this.setState({
            ventanaVisible: true,
            pagina: numeroPagina,
            prevVisible: numeroPagina > 0,
            nextVisible: (numeroPagina * this.state.elementosPagina) < this.state.datosFiltrados.length
        })
    }

    handleOnPrev() {
        if (this.state.pagina < 0) {
            return;
        }
        var numeroPagina = this.state.pagina - 1;
        this.setState({
            ventanaVisible: true,
            pagina: numeroPagina,
            prevVisible: numeroPagina > 0,
            nextVisible: (numeroPagina * this.state.elementosPagina) < this.state.datosFiltrados.length
        })
    }
    render() {
        return (
            <div ref={(div) => { this.divContenedor = div }}>
                <div>
                    <input className={styles.ComboInput} type='text'
                        onFocus={(e) => this.handleOnFocus(e)}
                        onChange={(e) => this.handleOnChange(e)}
                        value={this.state.valor} />
                    <img src='spinner.gif' />
                </div>
                {this.state.ventanaVisible ?
                    <div className={styles.VentanaEmergente}>
                        {this.state.prevVisible ? <input type='button' id='BtAnterior' value='Anterior' onClick={() => this.handleOnPrev()} /> : null}
                        <table>
                            <thead>
                                <tr>
                                    <td>Nombre</td>
                                    <td>Apellidos</td>
                                    <td>Empresa</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datosFiltrados.slice(this.state.pagina * this.state.elementosPagina, (this.state.pagina + 1) * this.state.elementosPagina).map((dato) => (
                                    <tr onClick={(e) => this.handleOnSelectValor(e)}>
                                        <td>{dato['Nombre']}</td>
                                        <td>{dato['Apellidos']}</td>
                                        <td>{dato['Empresa']}</td>
                                    </tr>
                                ))}

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='3'>{this.state.pagina + 1} de {this.state.datosFiltrados.length / this.state.elementosPagina}, {this.state.datosFiltrados.length}</td>
                                </tr>
                            </tfoot>
                        </table>
                        {this.state.nextVisible ? <input type='button' value='Siguiente' onClick={() => this.handleOnNext()} /> : null}
                    </div> : null}
            </div>
        )
    }

}

window.__comboBoxC_container = document.getElementById('comboBoxC')

ReactDOM.render(
    <ComboBoxC />, window.__comboBoxC_container)
