import { faker } from "@faker-js/faker";

function generarUsuario(id) {
  return {
    id: faker.datatype.uuid(),
    nombre: faker.name.firstName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.avatar(),
  };
}

export { generarUsuario };
