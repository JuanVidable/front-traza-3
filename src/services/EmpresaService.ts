import { Empresa } from "../types/Empresas/Empresa";
import { BackendClient, base } from "./BackendClient";

export class EmpresaService extends BackendClient<Empresa> {
    baseUrl: string = base + "empresas"; 

    async getFull(id: number): Promise<Empresa[]>{
        const response = await fetch(`${this.baseUrl}/full/${id}`);
        const data = await response.json();
        return data as Empresa[];
    }
}