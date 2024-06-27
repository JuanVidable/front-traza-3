import { Sucursal } from "./Sucursal";
import { Persona } from "../Persona";

export interface Empleado extends Persona {
    sucursal: Sucursal;
}

export interface EmpleadoCreate extends Persona {
    idSucursal: number
}