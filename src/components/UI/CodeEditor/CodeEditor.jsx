import React, { useState, useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java"; // Добавляем импорт для Java
import { dracula } from "@uiw/codemirror-theme-dracula";
import styles from "./CodeEditor.module.css";

// Маппинг языков
const languageMap = {
  javascript: javascript(),
  cpp: cpp(),
  python: python(),
  java: java(), // Добавляем Java в маппинг
};

const CodeEditor = ({
  language = "javascript",
  initialCode = "",
  height = "400px",
  isReadOnly = false,
  onChange: onChangeExternal,
  onSave: onSaveExternal,
  ...props
}) => {
  const [value, setValue] = useState(initialCode);

  // Синхронизация value с initialCode, если он изменится
  useEffect(() => {
    setValue(initialCode);
  }, [initialCode]);

  const onChangeInternal = useCallback(
    (val) => {
      if (!isReadOnly) {
        setValue(val);
        if (onChangeExternal) {
          onChangeExternal(val); // Передаём значение наружу
        }
      }
    },
    [isReadOnly, onChangeExternal]
  );

  // Обработчик нажатия клавиш для Ctrl + S
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Предотвращаем стандартное поведение браузера
        if (onSaveExternal && !isReadOnly) {
          onSaveExternal(value); // Вызываем внешнюю функцию сохранения с текущим кодом
        }
      }
    },
    [onSaveExternal, isReadOnly, value]
  );

  // Добавляем слушатель событий клавиатуры
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Очищаем слушатель при размонтировании
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.codeContainer} {...props}>
      <CodeMirror
        value={value}
        theme={dracula}
        extensions={[languageMap[language]]}
        onChange={onChangeInternal}
        className={styles.CodeMirror}
        height={height}
        editable={!isReadOnly}
      />
    </div>
  );
};

export default CodeEditor;