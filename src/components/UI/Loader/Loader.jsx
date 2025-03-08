import React from 'react';
import c from "./Loader.module.css"
const Loader = () => {
    return (
        <div className={c.background}>
            <span className={c.loader}></span>
        </div>
    );
};

export default Loader;