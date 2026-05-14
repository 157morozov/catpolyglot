exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "News"])
    const news = [...data.News].reverse()
    res.status(200).render("news", {
        title: "Новости / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        News: news,
    })
}

exports.new = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "News"])
    const news = [...data.News].reverse()
    const currentNew = news.find((_new) => _new.new_id == req.params.new_id)

    res.status(200).render("new", {
        title: `${currentNew ? currentNew.new_title : "Ошибка"} / Кот-Полиглот`,
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        CurrentNew: currentNew,
    })
}
