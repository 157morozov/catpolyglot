module.exports = function (body) {
    // Errors
    const auth_errors = {
        login_error: null,
        password_error: null,
        general_error: null,
    }

    // Get Login&Password
    const login = body.login ?? null
    const password = body.password ?? null

    // All allowed symbols in Login&Password
    const allowed_symbols = /[A-Za-z0-9]/g
    const allowed_symbols_in_login = login.match(allowed_symbols) ?? []
    const allowed_symbols_in_password = password.match(allowed_symbols) ?? []

    // Checking is valid login
    if (login) {
        if (!(allowed_symbols_in_login.length === login.length)) {
            auth_errors.login_error = "Неверный формат ввода."
        }
    } else {
        auth_errors.login_error = "Заполните данное поле."
    }

    // Checking is valid password
    if (password) {
        if (!(allowed_symbols_in_password.length === password.length)) {
            auth_errors.password_error = "Неверный формат ввода."
        }
    } else {
        auth_errors.password_error = "Заполните данное поле."
    }

    // Login&Password matching and Errors return
    if (auth_errors.login_error || auth_errors.password_error) {
        return auth_errors
    } else {
        if (!(process.env.ADMIN_LOGIN === login && process.env.ADMIN_PASSWORD === password)) {
            auth_errors.login_error = null
            auth_errors.password_error = null
            auth_errors.general_error = "Неверный Логин и/или Пароль."
            return auth_errors
        }
    }

    return true
}