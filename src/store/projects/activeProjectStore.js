import { create } from "zustand";

export const useActiveProjectStore = create((set) => ({
  activeProject: {
    theory: `<p>
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
                                </p>`,
    description: `                                <p>
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
                                    toLowerCase() для приведения к нижнему регистру и replace() для удаления
                                    пробелов.
                                </p>`,
  },
  // Добавление проекта в категорию "временные"
  setActiveProject: (project) =>
    set((state) => ({
      temporaryProjects: project,
    })),
}));
