import { createSlice } from "@reduxjs/toolkit";

type NavbarState = {
    isVisible: boolean;
}
const initialState: NavbarState = {
    isVisible: true,
}

let navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleNavbar: (state,action) => {
            state.isVisible = action.payload;
        }
    }
})

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;


