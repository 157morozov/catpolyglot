const auth = require("../../utils/admin/auth")

exports.login = async (req, res) => {
    const auth_errors = req.session.auth_errors ?? {
        login_error: null,
        password_error: null,
        general_error: null,
    }
    req.session.auth_errors = undefined
    res.status(200).render("adminsphere/login", {
        title: "Админ панель / Кот-Полиглот",
        login_error: auth_errors.login_error,
        password_error: auth_errors.password_error,
        general_error: auth_errors.general_error,
    })
}

exports.auth = async (req, res) => {
    const authResult = auth(req.body)
    if (authResult === true) {
        req.session.auth = true
        res.redirect("/admin")
    } else {
        req.session.auth_errors = authResult
        res.redirect("/admin/login")
    }
}

exports.logout = async (req, res) => {
    req.session.auth = undefined
    req.session.auth_errors = undefined
    res.redirect("/admin/login")
}