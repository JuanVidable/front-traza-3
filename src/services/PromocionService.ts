import { Promocion, PromocionCreate } from "../types/Articulos/Promocion";
import { BackendClient, base } from "./BackendClient";

export class PromocionService extends BackendClient<Promocion> {
    protected baseUrl: string = base + "promociones";

    //cambiar habilitado de promoción
    async changeHabilitadoState(id: number) {
        let url = this.baseUrl + `/changeHabilitado/${id}`;
        const response = await fetch(url, {
          "method": "PUT",
          "headers": {
            "Content-Type": 'application/json'
          }
        });
        if (!response.ok) {
            throw new Error(`Error al cambiar el estado del elemento con ID ${id}`);
        }
    }

    //obtener todas por el id de sucursal
    async getAllBySucursalId(id: number): Promise<Promocion[]>{
        const response = await fetch(`${this.baseUrl}/getPromocionPorSucursal/${id}`);
        const data = await response.json();
        return data as Promocion[];
    }

    //crear promocion
    async create(nuevo: PromocionCreate) {
        let url = this.baseUrl + "/create";
        const response = await fetch(url, {
          "method": "POST",
          "headers": {
          "Content-Type": 'application/json'
          },
          "body": JSON.stringify(nuevo)
        });
        const data = await response.json();
        return data as Promocion;
    }
  
    async darDeBaja(idPromo: number, idSucursal: number): Promise<void> {
      const response = await fetch(`${this.baseUrl}/baja/${idPromo}/${idSucursal}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el elemento con ID ${idPromo}`);
      }
    }
}