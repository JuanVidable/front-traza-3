import { Form } from "react-bootstrap"
import { EstadoPedido } from "../../types/Pedido/Pedido"
import { FC, useEffect, useState } from "react"

interface IPropsEstadoSelect {
    itemActual: {
        id: number,
        estado: EstadoPedido
    },
    handleChangeEstado: (id: number, estado: string) => void,
    nextEstados: Promise<EstadoPedido[]>
}

export const EstadoSelect : FC<IPropsEstadoSelect> = ({
    itemActual,
    handleChangeEstado,
    nextEstados
}) => {
  const [estados, setEstados] = useState<EstadoPedido[]>([]);

  useEffect(() => {
    nextEstados.then((data) => {
        setEstados(data);
    })
  }, []);

  return (
    <Form.Select onChange={(e) => handleChangeEstado(itemActual.id, e.target.value)}>
        <option value={itemActual.estado}>{itemActual.estado.toString()}</option>
        { estados!=undefined &&
            estados.map((estado: EstadoPedido, index: number) => 
                <option key={index} value={estado.toString()}>{estado.toString()}</option>
            )
        }
    </Form.Select>
  )
}
