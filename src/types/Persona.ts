import { IImagen } from "./Articulos/ImagenArticulo";
import { IBase } from "./Base";
import { Usuario } from "./Usuario";

export interface Persona extends IBase {
    nombre: String,
    apellido: String,
    telefono: String,
    fechaNacimiento: Date,

    usuario: Usuario,
    imagenPersona?: IImagen
}


export interface PersonaShort extends IBase {
    nombre: string,
    apellido: string,
    telefono: string
}