import { Domicilio } from "../types/Domicilio/Domicilio";
import { BackendClient, base } from "./BackendClient";

export class DomicilioService extends BackendClient<Domicilio> {
    baseUrl: string = base +"domicilios"; 
}