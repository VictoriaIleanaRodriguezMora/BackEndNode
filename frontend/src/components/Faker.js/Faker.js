import React from 'react'
import "../../SCSS/index.scss"
import io from "socket.io-client";
const socket = io("/");

const Faker = () => {

    const handleFaker = (dataPRODS) => {
        const tBody = document.querySelector('#tbodyFaker')

        let tr = dataPRODS
            .map((item) => {
                // console.log(item);
                return ` 
          <tr>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.thumbnail}</td>
          </tr>
          `
            })
            .join(' ')

        tBody.innerHTML = tr
    }
    // ----------- FAKER - NORMALIZR -----------

    socket.on('fakerInfo', async (dataProds) => {
        handleFaker(dataProds)
        console.log('fakerInfo', dataProds)
    })

    // ----------- FAKER - NORMALIZR -----------



    return (
        <div id="containerFaker">
            <h3>FAKER</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                    </tr>
                </thead>
                <tbody id="tbodyFaker"></tbody>
            </table>
        </div>
    )
}

export default Faker