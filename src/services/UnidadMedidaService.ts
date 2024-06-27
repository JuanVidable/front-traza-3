import { UnidadMedida } from "../types/Articulos/UnidadMedida";
import { BackendClient, base } from "./BackendClient";

export class UnidadMedidaService extends BackendClient<UnidadMedida> {
    baseUrl: string = base + "unidadesMedidas"; 
}