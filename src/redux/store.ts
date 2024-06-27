import { configureStore } from "@reduxjs/toolkit"
import TableDataReducer from "./slices/TablaDataReducer"
import EmpresaReducer from "./slices/EmpresaReducer";
import SucursalReducer from "./slices/SucursalReducer";
import SucursalesReducer from "./slices/SucursalesReducer";

export const store = configureStore({
    reducer: {
        tableDataReducer: TableDataReducer,
        empresaReducer: EmpresaReducer,
        sucursalReducer: SucursalReducer,
        sucursalesReducer: SucursalesReducer
    }
})


// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;