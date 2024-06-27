import { IBase } from "../Base";
import { Domicilio } from "../Domicilio/Domicilio";
import { Empresa } from "./Empresa";

export interface Sucursal extends IBase{
    nombre: string,
    horarioApertura: string,
    horarioCierre: string,
    esCasaMatriz: boolean
    domicilio: Domicilio,
    empresa: Empresa,
}

export interface SucursalShort extends IBase {
    nombre: string
}