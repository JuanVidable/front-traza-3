import { ArticuloManufacturado } from "../types/Articulos/ArticuloManufacturado";
import { BackendClient, base } from "./BackendClient";

export class ArticuloManufacturadoService extends BackendClient<ArticuloManufacturado> {
    baseUrl: string = base + "articulosManufacturados"; 
    
    async changeHabilitadoState(id: number) {
        let url = this.baseUrl + `/changeHabilitado/${id}`;
        let method:string = "PUT";
        const response = await fetch(url, {
          "method": method,
          "headers": {
            "Content-Type": 'application/json'
          }
        });
        if (!response.ok) {
            throw new Error(`Error al cambiar el estado del elemento con ID ${id}`);
        }
    }
    
  //obtener todos por sucursal
  async getAllBySucursalId(id: number): Promise<ArticuloManufacturado[]>{
    const response = await fetch(`${this.baseUrl}/getManufacturadosPorSucursal/${id}`);
    const data = await response.json();
    return data as ArticuloManufacturado[];
  }
}