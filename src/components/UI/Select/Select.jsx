import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.css"; // Подключение стилей

const defaultOptions = [
  { value: "1 опция", label: "1 ОПЦИЯ" },
  { value: "2 опция", label: "2 ОПЦИЯ" },
  { value: "3 опция", label: "3 ОПЦИЯ" },
];

const Select = ({ 
  options = defaultOptions, 
  defaultValue = null, 
  defaultLabel = "Значение по умолчанию",
  placeholder = "", 
  onChange 
}) => {
  if(defaultLabel === "Значение по умолчанию") {
    defaultLabel = defaultValue
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelecteValue] = useState(defaultValue);
  const [selectedLabel, setselectedLabel] = useState(defaultLabel);
  const selectRef = useRef(null);

  // Обработчик выбора элемента
  const handleSelect = (option) => {
    setSelecteValue(option.value);
    setselectedLabel(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange({value:option.value, label:option.label});
    }
  };

  // Закрытие селекта при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.selectUI} ${isOpen ? styles.active : ""}`}
      ref={selectRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.selected}>{selectedLabel}</div>
      {isOpen && (
        <div className={styles.options}>
          <div className={styles.option + " " +styles.optionInfo}>{placeholder}</div>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
