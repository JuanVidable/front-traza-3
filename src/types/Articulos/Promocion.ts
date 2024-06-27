import { IBase } from "../Base";
import { Sucursal } from "../Empresas/Sucursal";
import { IImagen } from "./ImagenArticulo";
import { PromocionDetalle, PromocionDetalleCreate, PromocionDetalleShort } from "./PromocionDetalle";

export enum TipoPromocion {
    HAPPY_HOUR = "HAPPY_HOUR",
    PROMOCION = "PROMOCION"
}

export interface Promocion extends IBase {
    denominacion: string,
    fechaDesde: Date,
    fechaHasta: Date,
    horaDesde: Date,
    horaHasta: Date,
    habilitado: boolean,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: TipoPromocion, //!

    promocionDetalles: PromocionDetalle[],
    imagenes?: IImagen[],
    sucursales?: Sucursal[] //!
}

export interface PromocionCreate extends IBase {
    denominacion: string,
    fechaDesde: Date,
    fechaHasta: Date,
    horaDesde: Date,
    horaHasta: Date,
    habilitado: boolean,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: TipoPromocion, //!

    promocionDetalles: PromocionDetalleCreate[],
    imagenes?: IImagen[],
    idsSucursales: number[]
}

export interface PromocionShort extends IBase {
    denominacion: string,
    fechaDesde: Date,
    fechaHasta: Date,
    horaDesde: Date,
    horaHasta: Date,
    habilitado: boolean,
    descripcionDescuento: string,
    precioPromocional: number,
    tipoPromocion: TipoPromocion, //!

    promocionDetalles: PromocionDetalleShort[],
    imagenes?: IImagen[]
}

