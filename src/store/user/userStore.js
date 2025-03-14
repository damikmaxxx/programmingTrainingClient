import { create } from 'zustand';
import { devtools } from "zustand/middleware";
export const useUserStore = create(devtools((set) => ({
  isAuth: false,
  role:"user",
  id: 0,
  name: '',
  coins: 0,
  exp: 0,
  stars: 0,
  profileStyleId:0,
  nicknameStyleId:0,

  description: "Люблю кодить и решать сложные задачи!",
  recentProjects: ["Калькулятор", "Чат-бот", "Игра на React"],
  skills: [
    { name: "JavaScript", percentage: 70 },
    { name: "Python", percentage: 65 },
    { name: "React", percentage: 90 }
  ],
  timeExpDiagram: {
    time: ["12.02", "13.02", "14.02", "15.02"],
    exp: [30, 45, 20, 60],
  },
  
  setAuth: (status) => set({ isAuth: status }),
  setAuthData: (data) => set({ authData: data }),
  setUser: ({id, name, coins,stars}) => set({ id, name, coins,stars }),
  clearUser: () => set({ id: null, name: '', coins: 0, exp: 0, stars: 0, isAuth: false }),
  setTestProfileStyle: (styleName) => set({ testProfileStyle: styleName }),

  // Метод для обновления всех данных пользователя (например, при редактировании профиля)
  setUserData: (data) => set({ 
    description: data.description,
    recentProjects: data.recentProjects,
    skills: data.skills,
    timeExpDiagram: data.timeExpDiagram,
  }),
})));
