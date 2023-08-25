import NotFoundStyles from '../styles/pages/NotFound.module.css'
import React from "react";
import {NavLink} from "react-router-dom";

function NotFound () {
    return (
        <div className={NotFoundStyles.wrapper}>
            <h1 className={NotFoundStyles.title}>404</h1>
            <h3 className={NotFoundStyles.subtitle}>Страница не найдена</h3>
            <NavLink to="/" className={NotFoundStyles.link}>на главную</NavLink>
        </div>
    )
}

export default NotFound