import { createSlice } from "@reduxjs/toolkit"

export enum ModalState{
    HIDDEN = 0,
    NUMBER_PROVIDER = 1
}
export interface IModal{
    status: ModalState
}
const initialState: IModal = {
    status: ModalState.HIDDEN
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        hiddenModal: (state) =>{
            state.status = ModalState.HIDDEN
        },
        displayNumberPopup : (state) =>{
            state.status = ModalState.NUMBER_PROVIDER
        },
    }
})

export const {hiddenModal,displayNumberPopup} = modalSlice.actions

export default modalSlice.reducer