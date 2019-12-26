const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const requerido = 'Este campo es requerido';

let numVal = {
    values: [0, 1, 2],
    message: '{VALUE} No es un rol Valido'
}

let ReservSchema = new Schema({
    date: {
        type: Date,
        require: [true, requerido]
    },
    hours: {
        type: Number,
        enum: numVal
    },
    kidsNumber: {
        type: Number
    },
    time_in: {
        type: Date,
        require: [true, requerido]
    },
    time_out: {
        type: Date,
        require: [true, requerido]
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cangu_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
})


module.exports = mongoose.model('Reservas', ReservSchema);