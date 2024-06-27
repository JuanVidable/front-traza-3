import { createSlice } from "@reduxjs/toolkit"; 
import { PayloadAction } from "@reduxjs/toolkit";
import { Empresa } from "../../types/Empresas/Empresa";

interface IEmpresaReducerType {
    empresa: null | Empresa;
    idActiveSucursal: null | number;
}

const initialState: IEmpresaReducerType = {
    empresa: null,
    idActiveSucursal: null,
}

export const EmpresaReducer = createSlice({
    name: "EmpresaReducer",
    initialState,
    reducers: {
        setEmpresa(state, action: PayloadAction<any>) {
            state.empresa = action.payload;
        },
        setActiveSucursal(state, action: PayloadAction<any>) {
            state.idActiveSucursal = action.payload;
        }
    }
});

export const { setEmpresa, setActiveSucursal } = EmpresaReducer.actions;

export default EmpresaReducer.reducer;