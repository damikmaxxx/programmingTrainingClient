import { create } from "zustand";

export const useMapStore = create((set) => ({
  domElements: [
    // // Первый уровень
    // { id: 1, position: { x: 200, y: 150 }, params: { draggable: true } },   // Проверка палиндрома
    // { id: 2, position: { x: 450, y: 150 }, params: { draggable: true } },   // Сортировка массива
    // { id: 3, position: { x: 700, y: 150 }, params: { draggable: true } },   // Поиск максимального числа
  
    // // Развилка на первом уровне
    // { id: 4, position: { x: 950, y: 150 }, params: { draggable: true } },   // Факториал числа
    // { id: 5, position: { x: 950, y: 400 }, params: { draggable: true } },   // Обратный порядок строки
  
    // // Второй уровень
    // { id: 6, position: { x: 1200, y: 150 }, params: { draggable: true } },   // Проверка на четность числа
    // { id: 7, position: { x: 1200, y: 400 }, params: { draggable: true } },   // Сумма элементов массива
  
    // // Развилка на втором уровне
    // { id: 8, position: { x: 1450, y: 150 }, params: { draggable: true } },   // Фибоначчи
    // { id: 9, position: { x: 1450, y: 400 }, params: { draggable: true } },   // Поиск минимального числа
  
  ],
  
  
  
  
  
  
  domConnection: [
    // Основной путь первого уровня
    // { id: 1, from: 1, to: 2, params:{arrow:true, brokenLine:true} },
    // { id: 2, from: 2, to: 3, params:{arrow:true, brokenLine:false} },

    // // Развилка на первом уровне
    // { id: 3, from: 3, to: 4, params:{arrow:false, brokenLine:true} },
    // { id: 4, from: 3, to: 5, params:{arrow:false, brokenLine:true} },

    // // Основной путь второго уровня
    // { id:5 ,from :4 ,to :6 ,params:{arrow:false ,brokenLine:true}},
    // { id :6 ,from :5 ,to :7 ,params:{arrow:false ,brokenLine:true}},

    // // Развилка на втором уровне
    // { id :7 ,from :6 ,to :8 ,params:{arrow:false,brokenLine:true}},     // от четности к Фибоначчи 
    // { id :8 ,from :6 ,to :9 ,params:{arrow:false,brokenLine:true}},     // от четности к минимальному числу 
    // { id :9 ,from :7 ,to :8 ,params:{arrow:false,brokenLine:true}},     // от суммы к Фибоначчи 
    // { id :10 ,from :7 ,to :9 ,params:{arrow:false,brokenLine:true}},     // от суммы к минимальному числу 
],


  

  setDomElements: (elements) => set({ domElements: elements }),
  setDomConnections: (connections) => set({ domConnection: connections }),

  setMapData: (elements, connections) => set({ domElements: elements, domConnection: connections })

}));
