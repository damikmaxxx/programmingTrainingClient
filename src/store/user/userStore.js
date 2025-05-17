import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import authAPI from "../../api/auth";
export const useUserStore = create(devtools((set) => ({
  isAuth: false,
  role:"user",
  id: 0,
  name: '',
  coins: 0,
  exp: 0,
  stars: 0,
  photo: null,
  profileStyleId:0,
  nicknameStyleId:0,

  description: "",
  recentProjects: ["Калькулятор", "Чат-бот", "Игра на React"],
  skills: [
    { name: "JavaScript", percentage: 70 },
    { name: "Python", percentage: 65 },
    { name: "React", percentage: 90 }
  ],
  timeExpDiagram: [
  ],
  
  setAuth: (status) => set({ isAuth: status }),
  setAuthData: (data) => set({ authData: data }),
  setUser: (data) => set(data),
  clearUser: () => set({ id: null, name: '', coins: 0, exp: 0, stars: 0, isAuth: false }),
  setTestProfileStyle: (styleName) => set({ testProfileStyle: styleName }),
  updateTimeExpDiagram: (data) => set({timeExpDiagram: data}),
  // Метод для обновления всех данных пользователя (например, при редактировании профиля)
  setUserData: (data) => set({ 
    description: data.description,
    recentProjects: data.recentProjects,
    skills: data.skills,
    timeExpDiagram: data.timeExpDiagram,
  }),
  logout: () =>  {
    authAPI.logout();
    set({
      isAuth: false,
      role: "user",
      id: 0,
      name: '',
      coins: 0,
      exp: 0,
      stars: 0,
      photo: null,
      profileStyleId: 0,
      nicknameStyleId: 0,
      description: "",
      recentProjects: [],
      skills: [],
      timeExpDiagram: { time: [], exp: [] },
    });

    localStorage.removeItem("recent_project_id");
  }
})));
