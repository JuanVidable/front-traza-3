import { CostoGanancia, IngresosDiarios, IngresosMensuales, PedidosCliente, RankingProductos } from "../types/Estadisticas";
import formatDate from "../types/formats/dateFormat";
import { base } from "./BackendClient";

export class EstadisticasService {
  protected baseUrl: string = base + "estadisticas";

  //get ranking por sucursal
  async getRankingSucursal(idSucursal: number, desde: Date, hasta: Date): Promise<RankingProductos[]> {
    const response = await fetch(`${this.baseUrl}/rankingSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as RankingProductos[];
  }

  //get ranking por empresa
  async getRankingEmpresas(idEmpresa: number,desde: Date, hasta: Date): Promise<RankingProductos[]> {
    const response = await fetch(`${this.baseUrl}/rankingEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as RankingProductos[];
  }

  //get ingresos diarios por sucursal
  async getIngresosDiariosSucursal(idSucursal: number, desde: Date, hasta: Date): Promise<IngresosDiarios[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesDiariasSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosDiarios[];
  }

  //get ingresos diarios por empresa
  async getIngresosDiariosEmpresa(idEmpresa: number, desde: Date, hasta: Date): Promise<IngresosDiarios[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesDiariasEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosDiarios[];
  }

  //get ingresos mensuales por sucursal
  async getIngresosMensualesSucursal(idSucursal:number, desde: Date, hasta: Date): Promise<IngresosMensuales[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesMensualesSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosMensuales[];
  }

  //get ingresos mensuales por empresa
  async getIngresosMensualesEmpresa(idEmpresa: number, desde: Date, hasta: Date): Promise<IngresosMensuales[]> {
    const response = await fetch(`${this.baseUrl}/recaudacionesMensualesEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as IngresosMensuales[];
  }

  //get ganancias por sucursal
  async getCostosGananciasSucursal(idScursal: number, desde: Date, hasta: Date): Promise<CostoGanancia> {
    const response = await fetch(`${this.baseUrl}/costosGanancias/${idScursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as CostoGanancia;
  }

  //get ganancias por empresa
  async getCostosGananciasEmpresa(idEmpresa: number, desde: Date, hasta: Date): Promise<CostoGanancia> {
    const response = await fetch(`${this.baseUrl}/costosGananciasEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as CostoGanancia;
  }

  //get cantidad de pedidos por clientes por sucursal
  async getPedidosClienteSucursal(idSucursal: number, desde: Date, hasta: Date): Promise<PedidosCliente[]> {
    const response = await fetch(`${this.baseUrl}/pedidosClienteSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as PedidosCliente[];
  }

  //get cantidad de pedidos por clientes por empresa
  async getPedidosClienteEmpresa(idEmpresa: number, desde: Date, hasta: Date): Promise<PedidosCliente[]> {
    const response = await fetch(`${this.baseUrl}/pedidosClienteEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const newData = await response.json();
    return newData as PedidosCliente[];
  }

  //generar Excel para sucursal
  async generateExcelSucursal(idSucursal: number, desde: Date, hasta: Date) {
    const urlServer: string = `${this.baseUrl}/excelSucursal/${idSucursal}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`;
    window.open(urlServer, "_blank");
  }

  //generar Excel para sucursal
  async generateExcelEmpresa(idEmpresa: number, desde: Date, hasta: Date) {
    const urlServer: string = `${this.baseUrl}/excelEmpresa/${idEmpresa}?fechaDesde=${formatDate(desde)}&fechaHasta=${formatDate(hasta)}`;
    window.open(urlServer, "_blank");
  }
}