import { Base, IBase } from "../Base";
import { Categoria } from "./Categoria";
import { IImagen } from "./ImagenArticulo";
import { UnidadMedida } from "./UnidadMedida";

export interface IArticulo extends IBase {
    denominacion: string,
    precioVenta: number,
    imagenes?: IImagen[],
    unidadMedida: UnidadMedida,
    categoria: Categoria,
    codigo: string,
    habilitado: boolean
}

export class Articulo extends Base implements IArticulo {
    denominacion: string = "";
    precioVenta: number = 0;
    imagenes?: IImagen[];
    unidadMedida: UnidadMedida = new UnidadMedida();
    categoria: Categoria = new Categoria();
    codigo: string = "";
    habilitado: boolean = true;
}

export interface ArticuloCreate extends IBase {
    denominacion: string;
    precioVenta: number;
    imagenes?: IImagen[];
    idUnidadMedida: number;
    idCategoria: number;
    codigo: string;
    habilitado: boolean;
}

export interface ArticuloShort extends IBase {
    denominacion: string,
    precioVenta: number,
    habilitado: boolean,
    codigo: string
}