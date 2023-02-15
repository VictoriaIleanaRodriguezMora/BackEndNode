
import React from 'react'

const LoginError = () => {
    return (
        <>
            <h1>login error :(</h1>
            <p>Esta siendo redireccionado a LOGIN</p>
            {setTimeout(() => { window.location.href = "/login"; }, 5000)}
        </>
    )
}

export default LoginError