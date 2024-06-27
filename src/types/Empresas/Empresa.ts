import { IBase } from "../Base";
import { Sucursal } from "./Sucursal";

export interface Empresa extends IBase{
    nombre: string,
    razonSocial: string,
    cuit: number,
    logo?: string,
    sucursales: Sucursal[]
}