import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ArticuloInsumo } from "../../types/Articulos/ArticuloInsumo";

interface IInitialState {
    ingredientes: ArticuloInsumo[];
}

const initialState: IInitialState= {
    ingredientes: [],
}

interface PayloadElement {
    element: ArticuloInsumo;
}

export const IngredientesReducer = createSlice({
    name: "IngredientesReducer",
    initialState,
    reducers: {

        setIngredientes(state, action: PayloadAction<ArticuloInsumo[]>) {
            state.ingredientes = action.payload; 
        },

        addIngrediente(state, action: PayloadAction<PayloadElement>) {
            var aux: ArticuloInsumo = action.payload.element;
            var f = 0;
            var found = state.ingredientes.some(function(element, index) { 
                f = index; return element.id == aux.id; 
            });
            if(found){
                state.ingredientes.splice(f, 1);
            }
        },
        
        removeIngrediente(state, action: PayloadAction<PayloadElement>) {
            var aux: ArticuloInsumo = action.payload.element;
            var found = state.ingredientes.some(function(element) { 
                return element.id == aux.id; 
            });
            if(found){
                state.ingredientes.push(aux);
            }
        },
    }
})

export const { setIngredientes, addIngrediente, removeIngrediente } =
    IngredientesReducer.actions;

export default IngredientesReducer.reducer;