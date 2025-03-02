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
    let level = 1;
    let expToNext = 0;
  
    for (let i = 0; i < levelMap.length; i++) {
      if (totalExp < levelMap[i].exp) {
        expToNext = levelMap[i].exp - totalExp;
        break;
      }
      level = levelMap[i].level;
    }
  
    return { level, expToNext };
  }