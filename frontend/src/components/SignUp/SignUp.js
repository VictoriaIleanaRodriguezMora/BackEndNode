import React from 'react'

const SignUp = () => {
    return (
        <div id="divAuth">
            <div id="divAuth_description">
                <h1>REGISTER</h1>
                <p>Hi! Please REGISTER yourself to continue</p>
            </div>
            <form method="post" action="/signup">
                <input placeholder="your username" name="username" />
                <input placeholder="your password" name="password" />
                <input id="submitAuth" type="submit" value="Register!" />
            </form>

            <button id="goToLogin">
                <a href="/login">Go to LOG IN</a>
            </button>

        </div>

    )
}

export default SignUp