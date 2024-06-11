import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {
    id: null,
    email: '',
    role: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = { id: null, email: '', role: '' };
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
