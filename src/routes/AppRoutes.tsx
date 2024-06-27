import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProductosCrud } from "../components/AdminDashboard/Productos/Productos.tsx"
import { CategoriasCrud/*, loadCategorias*/ } from "../components/AdminDashboard/Categorias/Categorias.tsx"
import { InsumosCrud } from "../components/AdminDashboard/Insumos/Insumos.tsx"
import { InsumosForm, insumoLoader } from "../components/AdminDashboard/Insumos/Formulario/InsumosForm.tsx"
import { Sucursales } from "../components/AdminConsole/Sucursales/Sucursales"
import { Empresas } from "../components/AdminConsole/Empresas/Empresas"
import { SucursalCrud } from "../components/AdminDashboard/Sucursales/Sucursales.tsx"
import { Inicio } from "../components/AdminDashboard/Inicio/Inicio"
import { Empleados } from "../components/AdminDashboard/Empleados/Empleados"
import { UnidadesMedidaCrud, unidadesMedidaLoader } from "../components/AdminDashboard/UnidadesMedida/UnidadesMedida.tsx"
import { CategoriaForm } from "../components/AdminDashboard/Categorias/Formulario/CategoriaForm"
import { UnidadMedidaForm } from "../components/AdminDashboard/UnidadesMedida/Formulario/UnidadMedidaForm.tsx"
import { ProductoForm, productoLoader } from "../components/AdminDashboard/Productos/Formulario/ProductoForm.tsx"
import { Promociones } from "../components/AdminDashboard/Promociones/Promociones.tsx"
import { PromocionForm, promocionLoader } from "../components/AdminDashboard/Promociones/Formulario/PromocionForm.tsx"
import { Stock } from "../components/AdminDashboard/Stock/Stock.tsx"
import { Estadisticas } from "../components/AdminDashboard/Estadisticas/Estadisticas"
import { EmpleadoForm, empleadoLoader } from "../components/AdminDashboard/Empleados/Formulario/EmpleadoForm"
import { StockForm, stockLoader } from "../components/AdminDashboard/Stock/StockForm.tsx"
import { ImagesContextProvider } from "../context/ImagenesContext.tsx"
import { EstadisticasSucursal } from "../components/AdminDashboard/Estadisticas/EstadisticasSucursal.tsx"
import { Pedidos } from "../components/AdminDashboard/Pedidos/Pedidos.tsx"
import { CocineroLayout } from "./layouts/CocineroLayout.tsx"
import { CajeroLayout } from "./layouts/CajeroLayout.tsx"
import { DeliveryLayout } from "./layouts/DeliveryLayout.tsx"
import { PedidosEnCamino } from "../components/DeliveryConsole/PedidosEnCamino.tsx"
import { PedidosEnPreparacion } from "../components/CocineroConsole/PedidosEnPreparacion.tsx"
import { PedidosNuevos } from "../components/CajeroConsole/PedidosNuevos.tsx"
import { PedidosEntregaPendiente } from "../components/CajeroConsole/PedidosEntregaPendiente.tsx"
import { ImageContextProvider } from "../context/ImagenContext.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="admin-console">
        <Route index element={<Empresas />}></Route>
        <Route path="sucursales/:id" element={<Sucursales />}></Route>
      </Route>

      <Route path="cocinero-console" element={<CocineroLayout/>}>
        <Route index  element={<PedidosEnPreparacion/>}/>
        <Route path="stock">
          <Route index element={<Stock/>} />
          <Route path="form/:id?" element={<StockForm/>} loader={stockLoader} />
        </Route>
      </Route>

      <Route path="cajero-console" element={<CajeroLayout/>}>
        <Route index element={<PedidosNuevos/>} />
        <Route path="entrega_pendiente" element={<PedidosEntregaPendiente/>}/>
      </Route>

      <Route path="delivery-console" element={<DeliveryLayout/>}>
        <Route index  element={<PedidosEnCamino/>}/>
      </Route>

      <Route path="dashboard" element={<DashboardLayout />} >
        <Route index element={<Inicio />} />
        <Route path="sucursales">
          <Route index element={<SucursalCrud />} />
        </Route>
        <Route path="productos">
          <Route index element={<ProductosCrud />}/>
          <Route path="form/:id?" element={<ImagesContextProvider><ProductoForm/></ImagesContextProvider>} loader={productoLoader} />
        </Route>
        <Route path="categorias">
          <Route index element={<CategoriasCrud />} /*loader={loadCategorias}*//>
          <Route path="form/:id?" element={<CategoriaForm />} />
        </Route>
        <Route path="unidadesMedida">
          <Route index element={<UnidadesMedidaCrud />} loader={unidadesMedidaLoader} />
          <Route path="form/:id?" element={<UnidadMedidaForm />} />
        </Route>
        <Route path="empleados" >
          <Route index element={<Empleados />} />
          <Route path="form/:id?" element={<ImageContextProvider><EmpleadoForm/></ImageContextProvider>} loader={empleadoLoader} />
        </Route>
        <Route path="promociones">
          <Route index element={<Promociones/>} />
          <Route path="form/:id?" element={<ImagesContextProvider><PromocionForm /></ImagesContextProvider>} loader={promocionLoader} />
        </Route>
        <Route path="insumos">
          <Route index element={<InsumosCrud />}/>
          <Route path="form/:id?" element={<ImagesContextProvider><InsumosForm /></ImagesContextProvider>} loader={insumoLoader} />
        </Route>
        <Route path="stock">
          <Route index element={<Stock/>} />
          <Route path="form/:id?" element={<StockForm/>} loader={stockLoader} />
        </Route>
        <Route path="estadisticas" >
          <Route index element={<Estadisticas/>} />
          <Route path="sucursal" element={<EstadisticasSucursal/>} />
        </Route>
        <Route path="pedidos">
          <Route index element={<Pedidos/>}/>
        </Route>
      </Route>
    </Route>
  )
)

export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}
