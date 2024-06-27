import { Articulo } from "../Articulos/Articulo";
import { IBase } from "../Base";

export interface DetalleFactura extends IBase {
    cantidad: number,
    subtotal: number,
    articulo: Articulo
}