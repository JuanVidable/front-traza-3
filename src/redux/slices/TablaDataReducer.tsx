import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {
    dataTable: any[];
    elementActive: null | any;
}

const initialState: IInitialState= {
    dataTable: [],
    elementActive: null,
}

interface PayloadSetElement {
    element: any;
}

export const TableDataReducer = createSlice({
    name: "TableDataReducer",
    initialState,
    reducers: {
        // Reducer para establecer los datos de la tabla
        setDataTable(state, action: PayloadAction<any[]>) {
            state.dataTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
        },
        // Reducer para establecer el elemento activo
        setElementActive(state, action: PayloadAction<PayloadSetElement>) {
            state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
        },
        // Reducer para eliminar el elemento activo
        removeElementActive(state) {
            state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
        },
    }
})

export const { setDataTable, setElementActive, removeElementActive } =
    TableDataReducer.actions;

export default TableDataReducer.reducer;