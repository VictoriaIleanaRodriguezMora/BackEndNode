import React from 'react'

const SignUpError = () => {
    return (
        <>
            <h1>ERROR SIGN UP</h1>

            <a href="/signup">Ir a sign up</a>

            {setTimeout(() => { window.location.href = "/signup"; }, 5000)}

        </>
    )
}

export default SignUpError