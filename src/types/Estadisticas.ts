export interface RankingProductos {
    countVentas: number,
    denominacion: string
}

export interface CostoGanancia {
    costos: number,
    ganancias: number,
    resultado: number
}

export interface IngresosDiarios {
    fecha: Date,
    ingresos: number
}

export interface IngresosMensuales {
    mes: string,
    ingresos: number
}

export interface PedidosCliente {
    email: string,
    cantidadPedidos: number
}