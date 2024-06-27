import { IBase } from "../Base";
import { Domicilio } from "../Domicilio/Domicilio";
import { SucursalShort } from "../Empresas/Sucursal";
import { DetallePedidoDto } from "./DetallePedido";
import { Factura, FormaPago } from "./Factura";
import { PersonaShort } from "../Persona";

export enum EstadoPedido {
    PENDIENTE_PAGO = "PENDIENTE_PAGO",
    PAGADO = "PAGADO",
    PREPARACION = "PREPARACION",
    PENDIENTE_ENTREGA = "PENDIENTE_ENTREGA",
    EN_CAMINO = "EN_CAMINO",
    CANCELADO = "CANCELADO",
    NOTA_CREDITO = "NOTA_CREDITO",
    COMPLETADO = "COMPLETADO"
}

export enum TipoEnvio {
    DELIVERY = "DELIVERY",
    TAKE_AWAY = "TAKE_AWAY"
}   

/*export interface Pedido extends IBase {
    horaEstimadaFinalizacion: Date,
    total: number,
    totalCosto: number,
    estadoPedido: EstadoPedido,
    tipoEnvio: TipoEnvio,
    formaPago: FormaPago,
    fechaPedido: Date,
    domicilio: Domicilio,
    sucursal: SucursalShort,
    factura: Factura,
    //cliente: Cliente,
    //detallePedidos: DetallePedido[],
    //empleado: Empleado
}*/

export interface PedidoDto extends IBase {
    horaEstimadaFinalizacion: Date,
    total: number,
    estadoPedido: EstadoPedido,
    tipoEnvio: TipoEnvio,
    formaPago: FormaPago,
    fechaPedido: Date,
    domicilio: Domicilio,
    sucursal: SucursalShort,
    factura: Factura,
    cliente: PersonaShort,
    detallePedidos: DetallePedidoDto[],
    //empleado: PersonaShort
}