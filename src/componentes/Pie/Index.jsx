import React from 'react'

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