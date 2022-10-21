import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    username: null,
    userId: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.accessToken = action.payload.accessToken;
            
        },
        setUserDetails: (state, action: PayloadAction) =>{
            state.userId = action.payload.id;
            state.username = action.payload.username;
        },
        unsetAuth: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.username = null;
            state.userId = null;
        }
    }
});


export const { setAuth, unsetAuth, setUserDetails } = authSlice.actions
export default authSlice.reducer