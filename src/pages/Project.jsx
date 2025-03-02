import React, { useState } from "react";
import Select from "../components/UI/Select/Select";
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import { useActiveProjectStore } from '../store/store.js';
import Button from "../components/UI/Button/Button.jsx";
import ProjectSolution from "../components/ProjectSolutions.jsx";
function Project() {
    const [selectedLang, setSelectedLang] = useState("javascript");
    const { activeProject } = useActiveProjectStore();

    const [isMyCodeBlock, setIsMyCodeBlock] = useState(true)

    const languageOptions = [
        { value: "javascript", label: "JavaScript" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
    ];
    const tabs = [
        { id: "theory", label: "Теория" },
        { id: "description", label: "Описание задания" },
    ]

    const solutions = [
        {
            id: 1,
            author: 'User1',
            code: `function calculatePrimeFactors(number) {
                    let factors = [];
                    let divisor = 2;
        
                    // Проходим через возможные делители от 2 до квадратного корня из числа
                    while (number >= divisor * divisor) {
                        if (number % divisor === 0) {
                            factors.push(divisor); // Добавляем делитель в список
                            number = number / divisor; // Уменьшаем число
                        } else {
                            divisor++; // Увеличиваем делитель, если не нашли кратность
                        }
                    }
        
                    // Если число больше 1, то оно простое и добавляем его в список
                    if (number > 1) {
                        factors.push(number);
                    }
        
                    return factors;
                }
            `,
            stars: 10,
            liked: false,
            showComments: false,
            comments: [
                { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
                { author: 'Dokopatel', text: 'Можно еще оптимизировать. Можно еще оптимизировать Можно еще оптимизировать Можно еще оптимизировать Можно еще оптимизировать', date: '2025-02-21' },
                { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
                { author: 'Dokopatel', text: 'Можно еще оптимизировать.', date: '2025-02-21' },
                { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
                { author: 'Dokopatel', text: 'Можно еще оптимизировать.', date: '2025-02-21' },
                { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
                { author: 'Dokopatel', text: 'Можно еще оптимизировать.', date: '2025-02-21' },
                { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
                { author: 'Dokopatel', text: 'Можно еще оптимизировать.', date: '2025-02-21' },
            ],
        },
        {
            id: 2,
            author: 'User2',
            code: `
        const multiply = (a, b) => a * b;
        
        const add = (a, b) => a + b;
        
        const subtract = (a, b) => a - b;
        
        const divide = (a, b) => {
          if (b === 0) {
            throw new Error('Division by zero');
          }
          return a / b;
        };
        
        console.log(multiply(5, 3));
        console.log(add(2, 3));
        console.log(subtract(8, 4));
        console.log(divide(10, 2));
            `,
            stars: 5,
            liked: false,
            showComments: false,
            comments: [
                { author: 'Krutoi', text: 'Хорошая идея!', date: '2025-02-20' },
                { author: 'CHETO_NADO', text: 'Добавь обработку ошибок.', date: '2025-02-19' },
            ],
        },
        {
            id: 3,
            author: 'User2',
            code: `
        const multiply = (a, b) => a * b;
        
        const factorial = (n) => {
          if (n === 0) return 1;
          return n * factorial(n - 1);
        };
        
        const isPrime = (n) => {
          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
          }
          return n > 1;
        };
        
        const reverseString = (str) => str.split('').reverse().join('');
        
        console.log(multiply(5, 3));
        console.log(factorial(5));
        console.log(isPrime(7));
        console.log(reverseString('hello'));
            `,
            stars: 5,
            liked: false,
            showComments: false,
            comments: [
                { author: 'Krutoi', text: 'Хорошая идея!', date: '2025-02-20' },
                { author: 'CHETO_NADO', text: 'Добавь обработку ошибок.', date: '2025-02-19' },
            ],
        },
        {
            id: 4,
            author: 'User2',
            code: `
        const multiply = (a, b) => a * b;
        
        const mergeArrays = (arr1, arr2) => [...arr1, ...arr2];
        
        const filterEvenNumbers = (arr) => arr.filter(num => num % 2 === 0);
        
        const findMax = (arr) => Math.max(...arr);
        
        const isPalindrome = (str) => {
          const reversed = str.split('').reverse().join('');
          return str === reversed;
        };
        
        console.log(multiply(5, 3));
        console.log(mergeArrays([1, 2], [3, 4]));
        console.log(filterEvenNumbers([1, 2, 3, 4, 5]));
        console.log(findMax([1, 2, 3, 4, 5]));
        console.log(isPalindrome('madam'));
            `,
            stars: 5,
            liked: false,
            showComments: false,
            comments: [
                { author: 'Krutoi', text: 'Хорошая идея!', date: '2025-02-20' },
                { author: 'CHETO_NADO', text: 'Добавь обработку ошибок.', date: '2025-02-19' },
            ],
        },

    ]

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="task__block task__block--height">
                        <Tabs tabs={tabs} defaultActiveTab="theory">
                            <TabHeader tabs={tabs} />
                            <Tab id="theory">
                                <div className="task__block__section">
                                    <h5 >Теория:</h5>
                                    <div dangerouslySetInnerHTML={{ __html: activeProject.theory }} />
                                </div>

                            </Tab>
                            <Tab id="description">
                                <div className="task__block__section">
                                    <h5>Описание задания:</h5>
                                    <div dangerouslySetInnerHTML={{ __html: activeProject.description }} />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="task__block task__block--height">
                        <div className="task__block__tools">
                            <div className="task__block__tools__button">
                                {isMyCodeBlock ? <>
                                    <Button variant="small" className=" me-3">Запустить код</Button>
                                    <Button variant="small" className=" me-3">Подтвердить</Button>
                                    <Button variant="small" className=" me-3" onClick={() => setIsMyCodeBlock(false)}>Другие решения</Button>
                                </> : <><Button variant="small" className=" me-3" onClick={() => setIsMyCodeBlock(true)}>Мое решение</Button></>}




                            </div>
                            <div className="select">
                                <Select
                                    options={languageOptions}
                                    defaultValue="JavaScript"
                                    placeholder="Выберите язык"
                                    onChange={(value) => setSelectedLang(value)}
                                />
                            </div>
                        </div>
                        {isMyCodeBlock ?
                            <div className="task__block__editor">
                                <CodeEditor
                                    language={selectedLang}
                                    initialCode={"function sum(a, b) {\n\treturn a + b;\n}\nconsole.log(sum(5, 6));"}
                                />
                            </div> :
                            <div className="task__block__solution">
                                <ProjectSolution sortedLang={selectedLang} solutions={solutions} />
                            </div>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
