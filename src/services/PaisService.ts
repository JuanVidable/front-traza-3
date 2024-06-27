import { Pais } from "../types/Domicilio/Pais";
import { BackendClient, base } from "./BackendClient";

export class PaisService extends BackendClient<Pais> {
    baseUrl: string = base + "paises"; 
}