import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import Columnas from './Columnas'
import Pie from './Pie'
import Boton from './Boton'
import styles from './index.css'

export default class ComboBoxC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ventanaVisible: false,
            datos: this.props.datasource,
            datosFiltrados: this.props.datasource,
            filtro: this.props.valor ?
                this.props.datasource.find(
                    (cadaElemento) => cadaElemento[this.props.campoIdentificador] === this.props.valor)[this.props.campoDescripcion] : '',
            selectValue: this.props.valor,
            nextVisible: this.props.datasource.length > this.props.elementosPagina,
            prevVisible: false,
            pagina: 0,
            mostrarNoResultados: this.props.datasource.length == 0,
            offsetTopContenedor:0
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
                if (dato[columna.Nombre] && String(dato[columna.Nombre]).toUpperCase().includes(elfiltro.toUpperCase())) {
                    contiene = true
                }
            });
            return contiene
        }) : this.state.datos;
    }

    handleDocumentClick(e) {
        const contenedor = this.divContenedor
        if (!contenedor.contains(e.target) &&
            e.target.id !== 'BtAnterior' &&
            e.target.id !== 'BtSiguiente') {
            this.setState({ ventanaVisible: false })
        }
    }

    handleOnFocus() {
        if (this.state.ventanaVisible || this.props.readonly === 'readonly') {
            return
        }
        this.setState({
            ventanaVisible: true,
            pagina: 0,
            nextVisible: this.props.elementosPagina < this.state.datosFiltrados.length,
            prevVisible: false
        })
    }
    //TODO Hay que obtener los datos dento de una función en el setstate
    handleOnChange(e) {
        var losDatos = this.getDatos(e.target.value)
        this.setState({
            datosFiltrados: losDatos,
            filtro: e.target.value,
            pagina: 0,
            nextVisible: this.props.elementosPagina < losDatos.length,
            mostrarNoResultados: losDatos.length == 0
        })

        if (e.target.value === '') {
            this.setState({ selectValue: '' })
        }

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

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        console.log(error);
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
       // console.log( body.scrollHeight)
       // console.log( body.offsetHeight)
      //  console.log(html.clientHeight)
      //  console.log(html.scrollHeight)
        console.log (this.divContenedor ? this.divContenedor.offsetTop :-1)
        //console.log (this.divVentana ? this.divVentana.clientHeight :0)
     

      //  console.log(windowHeight)
      //  console.log(docHeight)
      //  console.log(windowBottom)      
      //  console.log(window.pageYOffset)
      
        let altura = String(html.clientHeight - 210) + 'px';
       // console.log(altura)
        let ancho = this.props.width ? this.props.width : '100%'
        let numeroPaginas = this.state.datosFiltrados.length / this.props.elementosPagina
        if (numeroPaginas % 1 > 0) {
            numeroPaginas = Math.floor(numeroPaginas) + 1
        }
        let mostrarPie = numeroPaginas > 1 && this.state.mostrarNoResultados == false
        let mostrarCabecera = this.props.columnas.length > 1
        let estilosPrincipal = 'k-widget k-combobox k-header'
        let estilosSecundario = 'k-widget k-dropdown-wrap k-state-default'
        let estilosInput = 'k-input'
        if (this.state.ventanaVisible) {
            estilosPrincipal += ' k-state-border-down'
            estilosSecundario += ' k-active k-state-border-down'
        }
        if (this.props.estilo) {
            estilosInput += ' ' + this.props.estilo
        }

        return (
            <span ref={(span) => { this.divContenedor = span }}
                title={this.props.titulo}
                className={estilosPrincipal}
                style={this.props.width ? { width: this.props.width } : { width: '100%' }}>
                <span className={estilosSecundario}>
                    <input style={{ width: '100%' }} type='text' className={estilosInput}
                        onFocus={this.handleOnFocus} placeholder={this.props.placeHolder}
                        onChange={this.handleOnChange}
                        value={this.state.filtro}
                        readOnly={this.props.readonly} />
                    <input type='text' style={{ display: 'none' }}
                        value={this.state.selectValue}
                        id={this.props.id}
                        name={this.props.id}
                        data-val={this.props.obligatorio}
                        data-val-required={this.props.mensajeObligatorio}
                        readOnly={this.props.readonly}
                    />
                    {this.props.readonly != 'readonly' && <span className="k-select" onClick={this.handleOnFocus}><span className="k-icon k-i-arrow-s"></span></span>}
                </span>
                {this.state.ventanaVisible &&
                    <div ref={(div) => (this.divVentana = div)}
                        className={['k-animation-container ' + styles.VentanaEmergente]}
                        style={{ width: ancho }}>
                        <Boton id='BtAnterior'
                            visible={this.state.prevVisible}
                            titulo='Anterior'
                            onClick={this.handleOnPrev} />
                        <table className={styles.TablaVentana}>
                            {mostrarCabecera && <Columnas columnas={this.props.columnas} />}
                            <tbody>
                                {this.state.datosFiltrados.slice(
                                    this.state.pagina * this.props.elementosPagina,
                                    (this.state.pagina + 1) * this.props.elementosPagina).map((dato) => (
                                        <Item key={dato[this.props.campoIdentificador]}
                                            onSelectItem={() => this.handleOnSelectItem(dato)}
                                            elemento={dato} columnas={this.props.columnas}
                                            seleccionado={dato[this.props.campoIdentificador] === this.state.selectValue} />
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
    campoDescripcion: PropTypes.string.isRequired,
    readonly: PropTypes.string,
    obligatorio: PropTypes.string,
    estilo: PropTypes.string,
    titulo: PropTypes.string,
    placeHolder: PropTypes.string,
    width: PropTypes.string,
    id: PropTypes.string.isRequired,
    valor: PropTypes.string,
    obligatorio: PropTypes.bool,
    mensajeObligatorio: PropTypes.string,
    readonly: PropTypes.string
}

ComboBoxC.defaultProps = {
    elementosPagina: 100,
    placeHolder: 'Seleccione un elemento'
}