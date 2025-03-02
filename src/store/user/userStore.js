import { create } from 'zustand';

export const useUserStore = create((set) => ({
  isAuth: true,       
  id: 8786,           
  name: 'USERNAME',           
  coins: 500,
  exp:0,
  stars:5,    
  profileStyle:"",
  nicknameStyle:"Neon Blue",       
  setAuth: (status) => set({ isAuth: status }),    
  setAuthData: (data) => set({ authData: data }),  
  setUser: (id, name, coins) => set({ id, name, coins }),
  clearUser: () => set({ id: null, name: '', coins: 0,exp:0,stars:0, isAuth: false }), 
}));
