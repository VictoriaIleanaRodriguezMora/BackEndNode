import React from 'react'

const Logout = () => {
    return (
        <><h3>LogOut</h3>

            <p>
                {/* <%= content %> */}
            </p>

            {setTimeout(() => { window.location.href = "/"; }, 5000)}
        </>
    )
}

export default Logout