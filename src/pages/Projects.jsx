import React from 'react';
import Tabs, {Tab, TabHeader } from '../components/UI/Tabs/Tabs'; 
import Select from '../components/UI/Select/Select';
import { Link } from 'react-router-dom';
const secendoryData = [
    {
      id: 1,
      level: 1,
      time: '14Д',
      title: 'Проверка палиндрома',
      description: 'Задание: Напишите функцию, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).',
      exp: 50,
      money: 75,
      lockLevel: 1,
    },
    {
      id: 2,
      level: 2,
      time: '2Д',
      title: 'Сортировка массива',
      description: 'Задание: Напишите функцию, которая сортирует массив чисел по возрастанию.',
      exp: 70,
      money: 100,
      lockLevel: 2,
    },
    {
      id: 3,
      level: 3,
      time: '1Д',
      title: 'Поиск максимального числа',
      description: 'Задание: Напишите функцию, которая находит максимальное число в массиве.',
      exp: 60,
      money: 90,
      lockLevel: 3,
    },
    {
      id: 4,
      level: 2,
      time: '3Д',
      title: 'Факториал числа',
      description: 'Задание: Напишите функцию, которая вычисляет факториал заданного числа.',
      exp: 80,
      money: 120,
      lockLevel: 2,
    },
    {
      id: 5,
      level: 1,
      time: '1Д',
      title: 'Обратный порядок строки',
      description: 'Задание: Напишите функцию, которая возвращает строку в обратном порядке.',
      exp: 50,
      money: 75,
      lockLevel: 1,
    },
    {
      id: 6,
      level: 6,
      time: '2Д',
      title: 'Проверка на четность числа',
      description: 'Задание: Напишите функцию, которая проверяет, является ли число четным.',
      exp: 70,
      money: 100,
      lockLevel: 6,
    },
  ];
const startedData = [
    {
        id: 1,
        level: "1",
        time: "1Д",
        title: "Проверка на анаграмму",
        description: "Задание: Напишите функцию, которая проверяет, являются ли две строки анаграммами (содержат одни и те же буквы в разном порядке).",
        exp: "50",
        money: "75"
    }
]
const completedData = [
    {
        id: 1,
        level: "1",
        stars: "5",
        title: "Проверка числа на простоту",
        description: "Напишите функцию, которая проверяет, является ли число простым (делится только на 1 и на само себя).",
        exp: "50",
        money: "75"
    },
    {
        id: 2,
        level: "2",
        stars: "20",
        title: "Объединение двух массивов",
        description: "Напишите функцию, которая объединяет два массива в один, исключая дубликаты.",
        exp: "70",
        money: "100"
    },
    {
        id: 3,
        level: "3",
        stars: "300",
        title: "Фибоначчи до N",
        description: "Напишите функцию, которая выводит последовательность Фибоначчи до N.",
        exp: "60",
        money: "90"
    },
    {
        id: 4,
        level: "3",
        stars: "1.5к",
        title: "Фибоначчи до N",
        description: "Напишите функцию, которая выводит последовательность Фибоначчи до N.",
        exp: "60",
        money: "90"
    }
]


const Projects = () => {
  // Данные для табов
  const tabs = [
    { id: 'additional', label: 'Дополнительные' },
    { id: 'started', label: 'Начатые' },
    { id: 'finished', label: 'Завершенные' },
  ];

  const sortedModes = [
    { value: "time", label: "по Времени" },
    { value: "level", label: "по Уровню" },
];
  return (
    <main className="main--dark">
      <section id="projects">
        <div className="container">
          <div className="row">

              <Tabs tabs={tabs} defaultActiveTab="additional">
              <div className="col-lg-8  tabs  projects__tabs">          <TabHeader tabs={tabs} /></div>
              <div className="col-lg-1"></div>
                    <div className="col-lg-3 projects__tabs projects__tabs--sort">
                        <h6>Сортировка</h6>
                        <div className='select'>
                        <Select options={sortedModes} defaultValue='По умолчанию' placeholder='Выбери сортировку'/>
                        </div>
                    </div>
                <Tab id="additional" key={"additional"}>
                <div className="row tab-content">
                  {secendoryData
                    .map((project) => (
                        <div className="col-lg-4" key={project.id}>
                          <div   className="projects__project">
                            <Link to={"/project/" + project.id}></Link>
                            <span className="projects__project__level-access">{project.level}</span>
                            <span className="projects__project__time">
                              <img src="images/clock.svg" alt="" /> {project.time}
                            </span>
                            <h5>{project.title}</h5>
                            <p className="projects__project__description">{project.description}</p>
                            <div className="projects__project__res">
                              <div className="projects__project__exp">
                                <span className="exp-img">EXP</span> {project.exp}
                              </div>
                              <div className="projects__project__money">
                                <img src="images/money.png" alt="money" /> {project.money}
                              </div>
                            </div>
                            <div className="projects__project__lock">
                              <img src="images/lock.svg" alt="" /> <span>НУЖЕН УРОВЕНЬ</span>
                            </div>
                          </div>
                        </div>

                    ))}
                    </div>
                </Tab>

                <Tab id="started" key={"started"}>
                <div  className="row tab-content">
                  {startedData
                    .map((project) => (

                        <div className="col-lg-4" key={project.id}>
                          <div  className="projects__project">
                            <a href="#"></a>
                            <span className="projects__project__level-access">{project.level}</span>
                            <span className="projects__project__time">
                              <img src="images/clock.svg" alt="" /> {project.time}
                            </span>
                            <h5>{project.title}</h5>
                            <p className="projects__project__description">{project.description}</p>
                            <div className="projects__project__res">
                              <div className="projects__project__exp">
                                <span className="exp-img">EXP</span> {project.exp}
                              </div>
                              <div className="projects__project__money">
                                <img src="images/money.png" alt="money" /> {project.money}
                              </div>
                            </div>
                            <div className="projects__project__lock">
                              <img src="images/lock.svg" alt="" /> <span>НУЖЕН УРОВЕНЬ</span>
                            </div>
                          </div>
                        </div>

                    ))}
                   </div>
                </Tab>

                <Tab id="finished" key={"finished"}>
                <div  className="row tab-content">
                  {completedData
                    .map((project) => (

                        <div className="col-lg-4" key={project.id}>
                        <div  className="projects__project">
                          <a href="#"></a>
                          <span className="projects__project__level-access">{project.level}</span>
                          <span className="projects__project__stars projects__project__stars--1">
                            <img src="images/star.svg" alt="" />{project.stars}</span>
                          <h5>{project.title}</h5>
                          <p className="projects__project__description">{project.description}</p>
                          <div className="projects__project__res">
                            <div className="projects__project__exp">
                              <span className="exp-img">EXP</span> {project.exp}
                            </div>
                            <div className="projects__project__money">
                              <img src="images/money.png" alt="money" /> {project.money}
                            </div>
                          </div>
                          <div className="projects__project__lock">
                            <img src="images/lock.svg" alt="" /> <span>НУЖЕН УРОВЕНЬ</span>
                          </div>
                        </div>
                      </div>
                      
                    ))}
                    </div>
                </Tab>
              </Tabs>
            </div>
          </div>
      </section>
    </main>
  );
};

export default Projects;
