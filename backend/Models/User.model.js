const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE", "CANGU_ROLE", "DEVEP_ROLE"],
    message: "{VALUE} No es un rol Valido"
};
const uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new Schema({
    name: {
        type: String,
        require: [true, "El nombre es requerido"]
    },
    lastName: {
        type: String,
        require: [true, "El apellido es requerido"]
    },
    dni: {
        type: String,
        require: [true, "Su numero de DNI es requerido"],
        unique: [true, "Este DNI ya fue usado por otro usuario..."]
    },
    google: {
        type: Boolean,
        default: false
    },
    bornDate: {
        type: Date,
        require: [true, "Su fecha de nacimiento es requerida"]
    },
    email: {
        type: String,
        require: [true, "Su correo electronico es requerido"],
        unique: [true, "Email ya existe en nuestra base de datos"]
    },
    phone: {
        type: Number,
        require: [true, "Su numero de telefono es Necesario"],
        unique: [true, "El numero telefonico ya ha sido usado en otra cuenta"]
    },
    password: {
        type: String,
        require: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

UserSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
});

module.exports = mongoose.model("Users", UserSchema);