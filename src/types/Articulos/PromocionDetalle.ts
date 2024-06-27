import { Base, IBase } from "../Base";
import { Articulo, ArticuloShort } from "./Articulo";

export interface PromocionDetalle extends Base {
    cantidad: number,
    articulo: Articulo
}

export interface PromocionDetalleCreate extends IBase {
    cantidad: number,
    idArticulo: number
}

export interface PromocionDetalleShort extends IBase {
    cantidad: number,
    articulo: ArticuloShort
}

export class PromocionDetalleClass {
    public static createFrom(viejo: PromocionDetalle, nuevo: PromocionDetalle) : PromocionDetalle {
        nuevo.id = viejo.id;
        nuevo.eliminado = viejo.eliminado;
        nuevo.cantidad = viejo.cantidad;
        nuevo.articulo = viejo.articulo;
        return nuevo;
    }

    public static transform(detalles: PromocionDetalle[]) : PromocionDetalleCreate[] {
        let nuevos: PromocionDetalleCreate[] = [];
        detalles.forEach((detalle: PromocionDetalle) => {
            let nuevo: PromocionDetalleCreate = {
                id: detalle.id,
                eliminado: detalle.eliminado,
                cantidad: detalle.cantidad,
                idArticulo: detalle.articulo.id
            }
            nuevos.push(nuevo)
        });
        return nuevos;
    }
}