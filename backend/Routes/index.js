const express = require("express");
const api = express.Router();
const {
    verifyAdmin,
    verifyToken,
    verifyCangu
} = require('../Middlewares/Auth.Middleware')

const {
    SignUp,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    DestroyUser,
    LoginUser
} = require("../Controllers/User.controller");

//Rutas de los Usuarios
api.post("/signUp", SignUp);
api.post("/login", LoginUser);
api.get("/user", verifyToken, GetUsers);
api.get("/user/:id", verifyToken, GetUser);
api.put("/user/:id", verifyToken, UpdateUser);
api.delete("/user/:id", verifyToken, DeleteUser);
api.delete("/user/:id/destroy", verifyToken, DestroyUser);

const {
    CreateReserv,
    GetReservs,
    GetReserv,
    UpdateReserv,
    DeleteReserv
} = require("../Controllers/Reservas.controller");

//Rutas para las reservas
api.post("/reserva", verifyToken, CreateReserv);
api.get("/reserva", verifyToken, GetReservs);
api.get("/reserva/:id", verifyToken, GetReserv);
api.put("/reserva/:id", verifyToken, UpdateReserv);
api.delete("/reserva/:id", verifyToken, DeleteReserv);

module.exports = api;