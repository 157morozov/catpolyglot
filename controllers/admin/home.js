exports.default = async (req, res) => {
    const login = process.env.ADMIN_LOGIN
    res.status(200).render("adminsphere/home", {
        title: `Добро пожаловать, ${login}! / Кот-Полиглот`,
        admin_login: login,
    })
}