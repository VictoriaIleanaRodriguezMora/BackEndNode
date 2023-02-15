import React from "react";
import { useState } from "react";
const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (email, pass) => {
        if (email === "hola" && password === "test") {
            alert("login correcto");
        } else {
            alert("login INcorrecto");
        }
    };

    const conditionsLogin = (email, password) => {
        if (!email.includes('a')) { return 'Email incorrecto' }
        if (password.length < 4) { return 'contraseña incorrecta' }

    }

    const errorMessage = conditionsLogin(email, password)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                login(email, password);
            }}
        >
            <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
            </input>
            <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            >
            </input>
            <p>{errorMessage}</p>
            <button type="submit">GO</button>
        </form>
    );
};

export default Form;
