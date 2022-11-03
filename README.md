> Instruction: Make a server project based on node.js and express that offers a RESTful API of products. In detail, incorporating the following routes

> Comands 
**cd PUG**
**cd EJS**
**cd HBS**



- Make the corresponding templates that allow to go through the array of products and represent it in the form of a dynamic table, with its headers being the name of the product, the price and its photo (the photo will be shown as an image in the table) In the event that it is not found data, show the message: 'There are no products'.
- **Using the same product API of the deliverable project of the previous class, build a web server (not REST) ​​that incorporates:**
- **A product upload form in the root path (set the '/products' path to receive the POST, and redirect to the same form).**
- **A view of the products loaded (using handlebar templates) on the GET route '/products'.**
- **Both pages will have a button that redirects to the other.**


| Verb   |          Route           | Action                                                            |
| ------ | :----------------------: | ----------------------------------------------------------------- |
| GET    | 'http://localhost:8000/' | Main Page                                                         |
| GET    |     '/formProducts'      | Return the HTML form, to POST new product                         |
| GET    |     '/api/productos'     | Return all the products                                           |
| GET    |   '/api/productos/:id'   | Return the product specified by ID parameters                     |
| POST   |     '/api/productos'     | Receives and adds a product, and returns it with its assigned id. |
| PUT    |   '/api/productos/:id'   | Receives an ID and update by ID                                   |
| DELETE |   '/api/productos/:id'   | Receives an ID and delete by ID                                   |

_Each product will be represented by an object with the following format:_

**! I have fixed something so important. The method getById(), didnt return anything. The asynchronus, doesn't take into account the return of a loop, always need the method the method itself a return to work.**

**! If after used the form in HTML, when I'm in JSON page, it creates a new object, with a new ID, but with the sme data. But works!!.**

**PUT - It update the object, just "lcoal". Needs write the fily to works rigth. I can prove it, with a getById that the same element.**

**PUT should give back the changed ELEMENT, not the thing without change. Cause that doesnt work**

**The validation of put was missing so that it allows changing more values**
