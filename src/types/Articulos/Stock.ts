import { IBase } from "../Base";
import { SucursalShort, Sucursal } from "../Empresas/Sucursal";
import { ArticuloInsumoShort, ArticuloInsumo } from "./ArticuloInsumo";

export interface Stock extends IBase {
    stockActual: number,
    stockMinimo: number,
    stockMaximo: number,
    articuloInsumo: ArticuloInsumoShort,
    sucursal: SucursalShort
}

export interface StockCreate extends IBase {
    stockActual: number,
    stockMinimo: number,
    stockMaximo: number,
    idArticuloInsumo: number,
    idSucursal: number
}

export interface StockShort extends IBase {
    stockActual: number,
    stockMinimo: number,
    stockMaximo: number,
    articuloInsumo: ArticuloInsumoShort,
    sucursal: SucursalShort
}