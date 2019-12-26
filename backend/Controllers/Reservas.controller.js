const _ = require('underscore');
const Reservas = require('../Models/Reservas.model')

let CreateReserv = (req, res) => {
    let body = _.pick(req.body, [
        'date',
        'hours',
        'kidsNumber',
        'time_in',
        'time_out'
    ]);
    body.user_id = req.user._id

    let newReserv = new Reservas(body);

    Reservas.countDocuments({ date: body.date }, (err, cont) => {
        if (err) res.status(500)
            .json({
                ok: false,
                err
            });
        if (cont >= 2) res.status(300)
            .json({
                ok: false,
                msg: `Nuestra agenda para este dia ya se encuentra ocupada`
            });
        newReserv.save((err, reserva) => {
            if (err) res.status(500)
                .json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                reserva
            })
        })
    });
}

let GetReservs = (req, res) => {
    let user = req.user;
    if (user.role == ("CANGU_ROLE" || "ADMIN_ROLE")) {
        Reservas.find({}, (err, reservas) => {
            if (err) res.status(500).json({ ok: false, err })
            res.json({
                ok: true,
                reservas
            })
        })
    }
    Reservas.find({ user_id: user._id }, (err, r) => {
        if (err) res.status(500).json({ ok: false, err })
        res.json({
            ok: true,
            reservas: r
        })
    })
}

let GetReserv = (req, res) => {
    let id = req.params.id;
    let user = req.user;
    Reservas.findById(id, (err, r) => {
        if (r.user_id == user._id || r.cangu_id == user._id) {
            if (err) res.status(500).json({ ok: false, err })
            res.json({
                ok: true,
                reserva: r
            })
        }
        res.status(300).json({
                ok: false,
                msg: 'This is not your <3 '
            })
            /* 
            if (r.user_id !== user._id || user.role !== 'CANGU_ROLE' || user.role !== 'ADMIN_ROLE' || user._id !== r.cangu_id) {
                return;
            } */

    })
}

let UpdateReserv = (req, res) => {
    let id = req.params.id;
    let user = req.user;
    Reservas.findById(id, (e, r) => {
        if (r.user_id !== user._id && (user.role !== 'CANGU_ROLE' || user.role !== 'ADMIN_ROLE')) {
            return;
        }
        if (user.role === "CANGU_ROLE") {
            Reservas.findByIdAndUpdate(r._id, { cangu_id: user._id }, (er, re) => {
                if (er) {
                    return res.status(400).json({
                        ok: false,
                        err: er
                    });
                }
                res.json({
                    ok: true,
                    reserva: re
                });
            });
        }
        if (user._id === r.user_id) {
            let body = _.pick(req.body, [
                'date',
                'hours',
                'kidsNumber',
                'time_in',
                'time_out'
            ]);
            Reservas.findByIdAndUpdate(r._id, body, (er, re) => {
                if (er) {
                    return res.status(400).json({
                        ok: false,
                        err: er
                    });
                }
                res.json({
                    ok: true,
                    reserva: re
                });
            })
        }

    });
}

let DeleteReserv = (req, res) => {
    let id = req.params.id;

    Reservas.findByIdAndUpdate(id, { deleted_at: Date.now() }, (err, reserva) => {
        if (err) res.status(500).json({ ok: false, err })
        res.json({
            ok: true,
            reserva
        })
    })
}


module.exports = {
    CreateReserv,
    GetReservs,
    GetReserv,
    UpdateReserv,
    DeleteReserv
}