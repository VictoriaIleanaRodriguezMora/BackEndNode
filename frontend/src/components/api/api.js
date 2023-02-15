import React, { useEffect, useState } from "react";

const Api = () => {

    const [dataBack, setDataBack] = useState([{}])

    useEffect(() => {
        fetch("127.0.0.0:4040/api")
            .then((response) => response.json()
                .then((data) => { setDataBack(data) })
            )
    }, [])
    console.log(dataBack);

    const toShow = typeof dataBack.users === 'undefined' ? (<p>Loading...</p>) : (
        dataBack.users.map((user, i) => (
            <p key={i} >{user}</p>
        ))
    )
    console.log(toShow);
    return (
        <div>{toShow}</div>
    )
}

export default Api
