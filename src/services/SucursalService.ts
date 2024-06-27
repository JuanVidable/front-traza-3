import { Sucursal } from "../types/Empresas/Sucursal";
import { BackendClient, base } from "./BackendClient";

export class SucursalService extends BackendClient<Sucursal> {
    baseUrl: string = base + "sucursales";

    async findByEmpresaId(idEmpresa: number): Promise<Sucursal[]>{
        const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`);
        const data = await response.json();
        return data as Sucursal[];
    }
}