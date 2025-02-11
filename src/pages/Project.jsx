import React, { useState } from "react";
import Select from "../components/UI/Select/Select";
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import { Link, useParams } from 'react-router-dom';

function Project() {
    const [activeTab, setActiveTab] = useState("theory");
    const [selectedLang, setSelectedLang] = useState("javascript");



    const languageOptions = [
        { value: "javascript", label: "JavaScript" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
    ];
    const tabs = [
        { id: "theory", label: "Теория" },
        { id: "description", label: "Описание задания" },
    ]
    const { id } = useParams(); // Получаем ID проекта из URL
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="task__block task__block--height">
                        <Tabs tabs={tabs} defaultActiveTab="theory">
                            <TabHeader tabs={tabs} />
                            <Tab id="theory">
                                <h5 >Теория:</h5>
                                <p>
                                    <strong>Что такое палиндром?</strong><br />
                                    Палиндром — это слово, фраза, число или последовательность символов, которые
                                    читаются одинаково
                                    слева направо и справа налево. Например, слова "радар", "кот" и фразы "А
                                    роза упала на лапу Азора" являются палиндромами.
                                    Палиндромы интересны тем, что они могут быть как короткими, так и длинными.
                                    Например, фраза "А роза упала на лапу Азора" состоит из множества слов и
                                    пробелов, но при этом сохраняет свое значение при чтении в обоих
                                    направлениях.
                                </p>
                                <p>
                                    <strong>Как проверить палиндром?</strong><br />
                                    Для проверки строки на палиндром можно использовать несколько подходов:
                                </p>
                                <ul>
                                    <li>Удалить все пробелы и привести строку к одному регистру (например, к
                                        нижнему).</li>
                                    <li>Сравнить строку с её обратной версией.</li>
                                    <li>Или пройтись по строке с двух концов и сравнить символы.</li>
                                    <li>Также можно использовать регулярные выражения для удаления нежелательных
                                        символов и пробелов.</li>
                                </ul>
                                <p>
                                    <strong>Пример проверки:</strong><br />
                                    Рассмотрим строку "A man a plan a canal Panama". После удаления пробелов и
                                    приведения к нижнему регистру она становится "amanaplanacanalpanama",
                                    которая является палиндромом.
                                    Важно отметить, что не только слова могут быть палиндромами; даже числа
                                    могут быть палиндромами, например, 12321.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam temporibus
                                    saepe tempore maiores voluptas harum maxime ducimus asperiores, cum illo.
                                    Dolores est magnam, atque in quia quae modi alias architecto?
                                </p>
                            </Tab>
                            <Tab id="description">
                                <h5>Описание задания:</h5>
                                <p>
                                    <strong>Задание:</strong> Напишите функцию, которая проверяет, является ли
                                    строка палиндромом (читается одинаково слева направо и справа налево).
                                    <br /><br />
                                    <strong>Описание:</strong> Игнорируйте пробелы и регистр. Обратите внимание
                                    на
                                    возможные специальные символы, которые также могут влиять на проверку.
                                    <br /><br />
                                    <strong>Пример:</strong>
                                </p>
                                <ul>
                                    <li><code>is_palindrome("A man a plan a canal Panama")</code> — вернет
                                        <strong>true</strong>
                                    </li>
                                    <li><code>is_palindrome("Hello World")</code> — вернет
                                        <strong>false</strong>
                                    </li>
                                    <li><code>is_palindrome("12321")</code> — вернет <strong>true</strong></li>
                                    <li><code>is_palindrome("Was it a car or a cat I saw?")</code> — вернет
                                        <strong>true</strong>
                                    </li>
                                </ul>
                                <p>
                                    <em>Подсказка:</em> Используйте методы для работы со строками, такие как
                                    `toLowerCase()` для приведения к нижнему регистру и `replace()` для удаления
                                    пробелов.
                                </p>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="task__block task__block--height">
                        <div className="task__block__tools">
                            <div className="task__block__tools__button">
                                <a className="button me-3 button-primary" href="#">Запустить код</a>
                                <a className="button me-3 button-primary" href="#">Подтвердить </a>
                                <a > </a>
                                <Link className="button button-primary" to={"/projectsolution/" + id} > Решения</Link>
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
                        <div className="task__block__editor">
                            <CodeEditor
                                language={selectedLang}
                                initialCode={"function sum(a, b) {\n\treturn a + b;\n}\nconsole.log(sum(5, 6)); // Этот код добавляется через JS"}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
