import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
import styles from "./CodeEditor.module.css"; // Импортируй модуль стилей

// Маппинг языков
const languageMap = {
  javascript: javascript(),
  cpp: cpp(),
  python: python(),
};

const CodeEditor = ({ language = "javascript", initialCode = "" }) => {
  const [value, setValue] = useState(initialCode);

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <div className={styles.codeContainer}> {/* Если нужно, добавь родительский класс */}
      <CodeMirror
        value={value}
        theme={dracula}
        extensions={[languageMap[language]]}
        onChange={onChange}
        className={styles.CodeMirror}
        height="600px"
      />
    </div>
  );
};

export default CodeEditor;
