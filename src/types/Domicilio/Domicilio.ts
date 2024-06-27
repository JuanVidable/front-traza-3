import { IBase } from "../Base";
import { Localidad } from "./Localidad";

export interface Domicilio extends IBase {
    calle: string,
    numero: number,
    cp: number,
    piso: number,
    nroDpto: number,
    localidad: Localidad
}