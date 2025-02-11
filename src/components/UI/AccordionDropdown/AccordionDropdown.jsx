import { useEffect, useRef, useState } from "react";
import styles from "./AccordionDropdown.module.css";

const AccordionDropdown = ({ isOpen, setIsOpen, children }) => {
  const dropdownRef = useRef(null);
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      const { width } = parentRef.current.getBoundingClientRect();
      setParentWidth(width);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        parentRef.current &&
        !parentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={parentRef}>
      <div
        ref={dropdownRef}
        className={`${styles.dropdownContent} ${isOpen ? styles.dropdownContentOpen : ""}`}
        style={{ width: `${parentWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionDropdown;
