import React from 'react'
import io from "socket.io-client";
import "../../SCSS/index.scss"
const socket = io("/");


const Products = () => {
    // ----------------- Socket Products -----------------

    socket.on('products', (dataProds) => {
        // La dataProds es un [{...}, {...}]
        console.log('Products from BACK: ', dataProds)
        const tBody = document.querySelector('#tbodyProds')

        let tr = dataProds
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
    })

    const inputProds = () => {
        const title = document.querySelector('#titleProd').value
        const price = document.querySelector('#priceProd').value
        const thumbnail = document.querySelector('#thumbProd').value

        const contentInputs = { title, price, thumbnail }

        socket.emit('products', contentInputs)
    }

    // ----------------- Socket Products -----------------
    return (
        <div id="divTableProds">
            <h3>Enter a PRODUCT</h3>
            {/* Form */}
            <form id="chatForm">
                <label>
                    Title Prod
                    <input type="text" id="titleProd" value="titleProd" />
                </label>

                <label>
                    Price Prod
                    <input type="text" id="priceProd" value="priceProd" />
                </label>

                <label>
                    Thumb Prod
                    <input type="text" id="thumbProd" value="thumbProd" />
                </label>

                <button id="submitProds" onclick="inputProds()">SUBMIT</button>
            </form>
            {/* Form */}

            {/* Table  */}
            <table id="tableProds">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                    </tr>
                </thead>
                <tbody id="tbodyProds"></tbody>
            </table>
            {/* Table */}
        </div>

    )
}

export default Products