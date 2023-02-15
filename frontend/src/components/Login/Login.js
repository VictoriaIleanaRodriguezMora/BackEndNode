import React from 'react'

const Login = () => {
    return (
        <div id="divAuth">
            <div id="divAuth_description">
                <h1>LOGIN</h1>
                <p>Hi! Please LOGIN yourself to continue</p>
            </div>

            <form action="/login" method="POST">
                {/* <!-- NOMBRE --> */}
                <div>
                    <label>
                        Nombre
                        <input id="nameLogin" name="nameLogin" value="nombre" type="text" placeholder="Nombre"
                            required /></label>
                </div>
                {/* <!-- CONTRASEÑA -->{} */}
                <div>
                    <label>
                        Password
                        <input id="contrasenaLogin" name="contrasenaLogin" value="1234" type="password" placeholder="password"
                            required /></label>
                </div>
                <input type="submit" value="Enviar!" id="enviarLogin" />
            </form>

            <button id="goToLogin">
                <a href="/signup">Go to SIGN UP</a>
            </button>

        </div>
    )
}

export default Login