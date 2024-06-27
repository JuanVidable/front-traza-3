import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Sucursal } from "../../types/Empresas/Sucursal";

interface IInitialState {
    sucursalesSelected: Sucursal[];
}

const initialState: IInitialState= {
    sucursalesSelected: [],
}

interface PayloadElement {
    element: Sucursal;
}

export const SucursalesReducer = createSlice({
    name: "SucursalesReducer",
    initialState,
    reducers: {

        setSucursalesSelected(state, action: PayloadAction<Sucursal[]>) {
            state.sucursalesSelected = action.payload; 
        },

        addSucursalSelected(state, action: PayloadAction<PayloadElement>) {
            var aux: Sucursal = action.payload.element;
            var f = 0;
            var found = state.sucursalesSelected.some(function(element, index) { 
                f = index; return element.id == aux.id; 
            });
            if(found){
                state.sucursalesSelected.splice(f, 1);
            }
        },
        
        removeSucursalselected(state, action: PayloadAction<PayloadElement>) {
            var aux: Sucursal = action.payload.element;
            var found = state.sucursalesSelected.some(function(element) { 
                return element.id == aux.id; 
            });
            if(found){
                state.sucursalesSelected.push(aux);
            }
        },
    }
})

export const { setSucursalesSelected, addSucursalSelected, removeSucursalselected } =
    SucursalesReducer.actions;

export default SucursalesReducer.reducer;