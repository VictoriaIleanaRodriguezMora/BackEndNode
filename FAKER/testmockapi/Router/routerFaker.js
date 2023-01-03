// cd ./testmockapi
import { Router } from "express";
import ApiUsuariosMock from "../ClassApiUsuariosMock/ApiUsuariosMock.js";

const apiUsuarios = new ApiUsuariosMock();

const routerFaker = Router();

// GET
routerFaker.get("/", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.getAll());
  } catch (err) {
    next(err);
  }
});

// GET
routerFaker.get("/:id", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

// POST /popular
routerFaker.post("/popular", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.popular(req.query.cant));
  } catch (err) {
    next(err);
  }
});

// POST
routerFaker.post("/", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.guardar(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT /:id
routerFaker.put("/:id", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.actualizar({ ...req.body, id: req.params.id }));
  } catch (err) {
    next(err);
  }
});

// DELETE /:id
routerFaker.delete("/:id", async (req, res, next) => {
  try {
    res.json(await apiUsuarios.borrar(req.params.id));
  } catch (err) {
    next(err);
  }
});

routerFaker.use((err, req, res, next) => {
  const erroresNoEncontrado = [
    "Error al listar: elemento no encontrado",
    "Error al actualizar: elemento no encontrado",
    "Error al borrar: elemento no encontrado",
  ];

  if (erroresNoEncontrado.includes(err.message)) {
    res.status(404);
  } else {
    res.status(500);
  }
  res.json({ message: err.message });
});

export default routerFaker;
