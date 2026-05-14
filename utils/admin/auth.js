module.exports = function (body) {
    const auth_errors = {
        login_error: null,
        password_error: null,
        general_error: null,
    }

    const login = typeof body.login === "string" ? body.login.trim() : ""
    const password = typeof body.password === "string" ? body.password : ""

    // allow any visible non-space characters for credentials
    const credentialPattern = /^\S+$/

    if (!login) {
        auth_errors.login_error = "Заполните данное поле."
    } else if (!credentialPattern.test(login)) {
        auth_errors.login_error = "Неверный формат ввода."
    }

    if (!password) {
        auth_errors.password_error = "Заполните данное поле."
    } else if (!credentialPattern.test(password)) {
        auth_errors.password_error = "Неверный формат ввода."
    }

    if (auth_errors.login_error || auth_errors.password_error) {
        return auth_errors
    }

    if (!(process.env.ADMIN_LOGIN === login && process.env.ADMIN_PASSWORD === password)) {
        auth_errors.general_error = "Неверный Логин и/или Пароль."
        return auth_errors
    }

    return true
}
