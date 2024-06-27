import { IBase } from "./Base";

export enum Rol {
    ADMIN = "ADMIN",
    CLIENTE = "CLIENTE",
    COCINERO = "COCINERO",
    CAJERO = "CAJERO",
    DELIVERY = "DELIVERY",
    GERENTE = "GERENTE"
}

export interface Usuario extends IBase {
    auth0Id: string,
    username: String,
    email: String,
    rol: Rol 
}