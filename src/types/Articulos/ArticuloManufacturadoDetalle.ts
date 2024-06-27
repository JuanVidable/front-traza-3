import { Base } from "../Base";
import { ArticuloInsumo } from "./ArticuloInsumo";

export class ArticuloManufacturadoDetalle extends Base{
    cantidad: number = 0;
    articuloInsumo: ArticuloInsumo = new ArticuloInsumo();

    constructor(){
        super();
    };

    /**
     * createFrom
     */
    public createFrom(d: ArticuloManufacturadoDetalle){
        this.articuloInsumo = d.articuloInsumo;
        this.cantidad = d.cantidad;
        this.eliminado = d.eliminado;
        this.id = d.id ;
    }
}