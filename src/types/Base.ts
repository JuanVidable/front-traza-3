export interface IBase{
    id: number;
    eliminado: boolean;
}

export class Base implements IBase{
    id = 0;
    eliminado = false;
}