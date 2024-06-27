import { IBase } from "../Base";
import { Articulo, ArticuloCreate } from "./Articulo";
import { StockShort } from "./Stock";

export interface IArticuloInsumo extends IBase {
    precioCompra: number,
    esParaElaborar: boolean,
    stocksInsumo: StockShort[]
}

export class ArticuloInsumo extends Articulo implements IArticuloInsumo{
    precioCompra: number = 0;
    esParaElaborar: boolean = false;
    stocksInsumo: StockShort[] = [];
}

export interface ArticuloInsumoShort extends IBase {
    denominacion: string
}

export interface ArticuloInsumoCreate extends ArticuloCreate {
    precioCompra: number,
    stockActual: number,
    stockMaximo: number,
    stockMinimo: number,
    esParaElaborar: boolean
}
