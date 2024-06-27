import { IBase } from "../Base";

export interface IImagen extends IBase {
    url: string,
    name: string
}

//type para imagenes con archivo
export interface ImageFile {
    imagen: IImagen,
    file?: File
}