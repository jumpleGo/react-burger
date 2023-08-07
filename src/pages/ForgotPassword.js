
import React, {useEffect, useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {forgotPasswordRequest} from "../api/auth";
import {NavLink, useNavigate} from "react-router-dom";
import ForgotPasswordStyles from '../styles/pages/ForgotPasswordStyles.module.css'
import LoginStyles from "../styles/pages/Login.module.css";
import {getCookie} from "../services/utils/cookie";

function ForgotPassword () {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault()
        forgotPasswordRequest({email})
            .then(() => navigate('/reset-password'))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (getCookie('token')) navigate('/profile')
    }, [])

    return (
        <main class={ForgotPasswordStyles.wrapper}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <form onSubmit={submit}>
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button size="large" htmlType={'submit'} extraClass={'mt-6'}>Восстановить</Button>
            </form>
            <div className={`${ForgotPasswordStyles.footer} text_type_main-default`}>
                <span>
                    Вспомнили пароль?
                </span>
                <NavLink to="/login" className={ForgotPasswordStyles.link} >Войти</NavLink>
            </div>
        </main>
    )
}

export default ForgotPassword