import { Base } from "../Base";
import { Sucursal } from "../Empresas/Sucursal";

export class Categoria extends Base{
    denominacion: string = "";
    categoriaPadre?: Categoria;
    hijos?: Categoria[];
    esInsumo: boolean = false;
    //solo pasar ids
    sucursales?: Sucursal[];
}

export class CategoriaCreate {
    denominacion: string = "";
    idCategoriaPadre?: number;
    esInsumo: boolean = false;
    idSucursales?: number[];
}