import React from 'react'
import "../../SCSS/index.scss"

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <a href="https://twitter.com/VirmCode">
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/victoriarodriguezmora">
                        <i class="fab fa-linkedin" aria-hidden="true"> </i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/virmcode/">
                        <i class="fab fa-instagram" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="https://api.whatsapp.com/send/?phone=5491133990583&text=Hola+Victoria+&type=phone_number&app_absent=0">
                        <i class="fab fa-whatsapp" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>

            <p><a href="https://victoriarodriguez-portfolio.netlify.app/"> <i class="far fa-copyright" aria-hidden="true"></i>
                Victoria Ileana Rodriguez Mora 2022 </a></p>

        </footer>
    )
}

export default Footer