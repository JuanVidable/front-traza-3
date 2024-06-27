import { IBase } from "../Base";
import { Provincia } from "./Provincia";

export interface Localidad extends IBase{
    nombre: string,
    provincia: Provincia
}