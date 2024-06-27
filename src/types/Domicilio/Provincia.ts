import { IBase } from "../Base";
import { Pais } from "./Pais";

export interface Provincia extends IBase {
    nombre: string,
    pais: Pais
}