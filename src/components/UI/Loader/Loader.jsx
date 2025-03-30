import React from 'react';
import c from "./Loader.module.css";

const Loader = ({ fullPage = true }) => {
    return (
        <div className={fullPage ? c.background : c.background+ " " + c.background_low }>
            <span className={c.loader}></span>
        </div>
    );
};

export default Loader;
