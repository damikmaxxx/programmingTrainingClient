export const levelMap = [
    { level: 2, exp: 100 },
    { level: 3, exp: 150 },
    { level: 4, exp: 300 },
    { level: 5, exp: 600 },
    { level: 6, exp: 900 },
    { level: 7, exp: 1300 },
    { level: 8, exp: 1800 },
    { level: 9, exp: 2500 },
    { level: 10, exp: 3500 },
    { level: 11, exp: 4700 },
    { level: 12, exp: 6000 },
    { level: 13, exp: 7500 },
    { level: 14, exp: 9500 },
    { level: 15, exp: 12000 },
    { level: 16, exp: 15000 },
    { level: 17, exp: 18500 },
    { level: 18, exp: 22500 },
    { level: 19, exp: 27000 },
    { level: 20, exp: 32000 }
  ];

export function getLevelInfo(totalExp) {
  let currentLevel = 1; // Начинаем с уровня 1
  let expOnCurrentLevel = totalExp; // Оставшийся опыт после достижения текущего уровня
  let expForNextLevel = 0; // Опыт, нужный для следующего уровня
  let progressPercentage = 0; // Процент прогресса до следующего уровня

  // Проходим по карте уровней
  for (let i = 0; i < levelMap.length; i++) {
      const requiredExp = levelMap[i].exp;
      if (totalExp >= requiredExp) {
          // Если опыта хватает, вычитаем его и повышаем уровень
          totalExp -= requiredExp;
          currentLevel = levelMap[i].level;
          expOnCurrentLevel = totalExp;
      } else {
          // Если опыта недостаточно, останавливаемся
          expForNextLevel = requiredExp;
          progressPercentage = (expOnCurrentLevel / expForNextLevel) * 100;
          break;
      }
  }
  console.log(levelMap.find(obj => obj.level === currentLevel+1).exp)
  // Возвращаем результат
  return {
      level: currentLevel, // Текущий уровень
      expOnCurrentLevel: expOnCurrentLevel, // Опыт на текущем уровне
      progressPercentage: progressPercentage.toFixed(3), // Процент прогресса (3 знака после запятой)
      expToNextLevel: levelMap.find(obj => obj.level === currentLevel+1).exp
  };
}

