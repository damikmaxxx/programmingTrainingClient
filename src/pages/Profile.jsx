import React, { useEffect } from 'react';
import DefaultProfile from '../components/profileStyles/DefaultPage/DefaultProfile';


function Profile() {
  const userData = {
    avatar: "https://www.gravatar.com/avatar/?d=mp",
    name: "User Usernamovich",
    coins:500,
    stars: 5,
    exp: 800,
    description: "Люблю кодить и решать сложные задачи!",
    recentProjects: ["Калькулятор", "Чат-бот", "Игра на React"],
    skills: [
      { name: "JavaScript", percentage: 70 },
      { name: "Python", percentage: 65 },
      { name: "React", percentage: 90 }
    ],
    experience: 3400,
    projectTimes: 45,
    timeExpDiagram:{
      time: ["12.02", "13.02", "14.02", "15.02"],
      exp: [30, 45, 20, 60],
    }

  };
  return (
    <DefaultProfile {...userData}/>

  );
}

export default Profile;
