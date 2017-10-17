import React from 'react'
import PropTypes from 'prop-types'

export default function Pie(props) {
    return (
        <tfoot>
            <tr>
                <td colSpan='3'>
                    {props.pagina} de {props.totalPaginas}. Nº elementos {props.totalItems}
                </td>
            </tr>
        </tfoot>
    )
}

Pie.PropTypes = {
    pagina: PropTypes.number.isRequired,  
    totalPaginas: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired
}