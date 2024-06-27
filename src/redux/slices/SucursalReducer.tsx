import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sucursal } from "../../types/Empresas/Sucursal";

interface ISucursalReducerType {
    sucursal: null | Sucursal;
}

const initialState: ISucursalReducerType = {
    sucursal: null,
}

export const SucursalReducer = createSlice({
    name: "SucursalReducer",
    initialState,
    reducers: {
        setSucursal(state, action: PayloadAction<any>) {
            state.sucursal = action.payload;
        },
        
    }
});

export const { setSucursal } = SucursalReducer.actions;

export default SucursalReducer.reducer;