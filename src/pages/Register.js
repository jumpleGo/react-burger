import React, {useEffect, useState} from "react";
import { Input, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";

import RegisterStyles from "../styles/pages/Register.module.css";
import {useAuth} from "../hooks/useAuth";
import {getCookie} from "../services/utils/cookie";

function Register() {
    const navigate  = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const {register, ...auth} = useAuth()
    useEffect(() => {
        if (getCookie('token')) navigate('/profile')
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(formData);
            navigate('/profile')
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <main className={RegisterStyles.wrapper}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <form onSubmit={handleRegister}>
                <Input
                    name="name"
                    value={formData.name}
                    extraClass="mt-6"
                    type="text"
                    placeholder="Имя"
                    icon="ShowIcon"
                    onChange={handleInputChange}
                />
                <EmailInput
                    name="email"
                    value={formData.email}
                    extraClass="mt-6"
                    onChange={handleInputChange}
                />
                <Input
                    name="password"
                    value={formData.password}
                    extraClass="mt-6"
                    type="password"
                    placeholder="Пароль"
                    icon="ShowIcon"
                    onChange={handleInputChange}
                />
                <Button
                    extraClass="mt-6"
                    size="large"
                    htmlType="submit"
                    disabled={!formData.email || !formData.password || !formData.name}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className={`${RegisterStyles.footer} mt-20`}>
                <div className={`${RegisterStyles.linkBlock} text_type_main-default`}>
                    <span>Уже зарегистрированы?</span>
                    <NavLink className={RegisterStyles.link} to="/login">
                        Войти
                    </NavLink>
                </div>
            </div>
        </main>
    );
}

export default Register;