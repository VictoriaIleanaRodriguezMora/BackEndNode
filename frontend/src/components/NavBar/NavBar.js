import React from 'react'
import "../../SCSS/index.scss"

const NavBar = () => {
    return (
        <header>
            <nav>

                <ul>
                    <li> <a href="/">Inicio</a> </li>
                    <li> <a href="/">Quienes Somos</a> </li>
                    <li> <a href="/">Contacto</a> </li>
                </ul>

                <ul id="auth">
                    <li><a href="/signup">SIGN UP</a></li>
                    <li><a href="/login">LOG IN</a></li>
                </ul>

            </nav>
        </header>
    )
}

export default NavBar