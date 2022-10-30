> Instruction: Make a server project based on node.js and express that offers a RESTful API of products. In detail, incorporating the following routes


| Verb   |        Route         | Action                                                            |
| ------ | :------------------: | ----------------------------------------------------------------- |
| GET    |   '/api/productos'   | Return all the products                                           |
| GET    | '/api/productos/:id' | Return the product specified by ID parameters                     |
| POST   |   '/api/productos'   | Receives and adds a product, and returns it with its assigned id. |
| PUT    | '/api/productos/:id' | Receives an ID and update by ID                                   |
| DELETE | '/api/productos/:id' | Receives an ID and delete by ID                                   |

_Each product will be represented by an object with the following format:_

```js{
title: (product name),
price: (price),
thumbnail: (url of the logo or photo of the product)
}
```

```js
// Each stored item will have a numerical id provided by the backend, starting at 1, and which will increase as products are added. That id will be used to identify a product that will be listed individually.

// In the event that a product does not exist, the object will be returned:
{ error : 'product not found' }

/* mplement the API in a separate class, using an array as memory persistence support.
Incorporate the Express Router in the base url '/api/products' and configure all sub-routes based on it.
Create a public server space containing an index.html document with a product entry form with the appropriate data.
The server must be based on express and must implement connection messages to port 8080 and in case of error, render its description.
The responses from the server will be in JSON format. The functionality will be tested through Postman and the login form.
*/

```
**! I have fixed something so important. The method getById(), didnt return anything. The asynchronus, doesn't take into account the return of a loop, always need the method the method itself a return to work.** 

**! If after used the form in HTML, when I'm in JSON page, it creates a new object, with a new ID, but with the sme data. But works!!.**

**PUT - It update the object, just "lcoal". Needs write the fily to works rigth. I can prove it, with a getById that the same element.** 

**PUT should give back the changed ELEMENT, not the thing without change. Cause that doesnt work**

**The validation of put was missing so that it allows changing more values**
