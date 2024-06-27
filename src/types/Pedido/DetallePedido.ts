import { ArticuloShort } from "../Articulos/Articulo";
import { PromocionShort } from "../Articulos/Promocion";
import { IBase } from "../Base";

export interface DetallePedidoDto extends IBase {
    cantidad: number,
    subTotal: number,
    articulo?: ArticuloShort,
    promocion?: PromocionShort
}
