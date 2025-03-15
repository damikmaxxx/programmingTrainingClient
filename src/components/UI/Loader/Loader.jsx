import React from 'react';
import c from "./Loader.module.css";

const Loader = ({ fullPage = true }) => {
    return (
        <div className={fullPage ? c.background : ""}>
            <span className={c.loader}></span>
        </div>
    );
};

export default Loader;
