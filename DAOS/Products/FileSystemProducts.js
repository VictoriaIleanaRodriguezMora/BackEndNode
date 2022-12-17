import ContainerFileSystem from "../MainContainers/ContainerFileSystem";


class ProductsDaoFileSystem  extends ContainerFileSystem {
    constructor(){
        super("../.././DaosOutput./DaoProducts.json")
    }
    //  aquí, deberia ser particular, los campos con los que se crea el archivo
    // tamara instala dotenv
}


export default ProductsDaoFileSystem

