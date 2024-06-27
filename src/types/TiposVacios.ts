import { Sucursal, SucursalShort } from "./Empresas/Sucursal"
import { Empleado } from "./Empresas/Empleado";
import { Rol, Usuario } from "./Usuario";
import { Empresa } from "./Empresas/Empresa";
import { Domicilio } from "./Domicilio/Domicilio";
import { Pais } from "./Domicilio/Pais";
import { Provincia } from "./Domicilio/Provincia";
import { Localidad } from "./Domicilio/Localidad";
import { UnidadMedida } from "./Articulos/UnidadMedida";
import { Categoria } from "./Articulos/Categoria";
import { Promocion, TipoPromocion } from "./Articulos/Promocion";
import { ArticuloInsumo, ArticuloInsumoCreate, ArticuloInsumoShort } from "./Articulos/ArticuloInsumo";
import { StockShort } from "./Articulos/Stock";
import { IImagen, ImageFile } from "./Articulos/ImagenArticulo";

export const paisVacio: Pais = {
    id: 0,
    nombre: "",
    eliminado: false
  };

export const provinciaVacia: Provincia = {
    id: 0,
    nombre: "",
    pais: paisVacio,
    eliminado: false
};

export const localidadVacia: Localidad = {
    id: 0,
    nombre: "",
    provincia: provinciaVacia,
    eliminado: false
};

export const domicilioVacio: Domicilio = {
    id: 0,
    calle: "",
    numero: 0,
    cp: 0,
    piso: 0,
    nroDpto: 0,
    localidad: localidadVacia,
    eliminado: false
}

export const empresaVacia: Empresa = {
    id: 0,
    eliminado: false,
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
    sucursales: []
}

export const sucursalVacia: Sucursal = {
    id: 0,
    eliminado: false,
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    domicilio: domicilioVacio,
    empresa: empresaVacia,
    esCasaMatriz: false
}

export const usuarioVacio: Usuario = {
    id: 0,
    eliminado: false,
    auth0Id: "",
    username: "",
    email: "",
    rol: Rol.DELIVERY
}

export const empleadoVacio: Empleado = {
    id: 0,
    eliminado: false,
    nombre: "",
    apellido: "",
    telefono: "",
    fechaNacimiento: new Date(),
    usuario: usuarioVacio,
    sucursal: sucursalVacia
};

export const unidadMedidaVacia: UnidadMedida = {
    id: 0,
    eliminado: false,
    denominacion: ""
}

export const categoriaVacia: Categoria = {
    id: 0,
    eliminado: false,
    denominacion: "",
    esInsumo: true
}

export const insumoVacio: ArticuloInsumo = {
    id: 0,
    eliminado: false,
    denominacion: "",
    precioVenta: 0,
    precioCompra: 0,
    esParaElaborar: false,
    codigo: "",
    habilitado: true,
    imagenes: [],
    unidadMedida: unidadMedidaVacia,
    categoria: categoriaVacia,
    stocksInsumo: []
}

export const insumoCreateVacio: ArticuloInsumoCreate = {
    id: 0,
    eliminado: false,
    denominacion: "",
    precioVenta: 0,
    precioCompra: 0,
    esParaElaborar: false,
    codigo: "",
    habilitado: true,
    imagenes: [],
    idUnidadMedida: 0,
    idCategoria: 0,
    stockMinimo: 0,
    stockActual: 0, 
    stockMaximo: 0
}

export const promocionVacia: Promocion = {
    id: 0,
    eliminado: false,
    denominacion: "",
    fechaDesde: new Date,
    fechaHasta: new Date,
    horaDesde: new Date,
    horaHasta: new Date,
    habilitado: true,
    descripcionDescuento: "",
    precioPromocional: 0,
    tipoPromocion: TipoPromocion.PROMOCION,
    promocionDetalles: []
}

export const insumoShortVacio: ArticuloInsumoShort = {
    id: 0,
    eliminado: false,
    denominacion: ""
}

export const sucursalShortVacia: SucursalShort = {
    id: 0,
    eliminado: false,
    nombre: ""
}

export const stockShortVacio: StockShort = {
    id: 0,
    eliminado: false,
    stockActual: 0,
    stockMaximo: 0,
    stockMinimo: 0,
    articuloInsumo: insumoShortVacio,
    sucursal: sucursalShortVacia
}

export const imageFileVacio: ImageFile = {
    imagen: {
        id: 0,
        eliminado: false,
        url: "",
        name: ""
    }
}

export const imagenVacia: IImagen = {
    id: 0,
    eliminado: false,
    url: "",
    name: ""
}