import { IBase } from "../Base";
import { DetalleFactura } from "./DetalleFactura";

export enum FormaPago {
    EFECTIVO = "EFECTIVO",
    MERCADO_PAGO = "MERCADO_PAGO"
}

export interface Factura extends IBase {
    fechaFacturacion: Date,
    montoDescuento: number,
    formaPago: FormaPago,
    totalVenta: number,
    detalleFacturas: DetalleFactura
}