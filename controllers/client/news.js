exports.default = async (req, res) => {
    const cache = req.cache

    res.status(200).render("news", {
        title: "Новости / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            News: cache.News,
        },
    })
}

exports.new = async (req, res) => {
    const cache = req.cache

    const new_id = req.params.new_id
    let current_new = undefined
    let page_title = "Ошибка"
    if (typeof cache.News == "object") {
        current_new = cache.News.find((_new) => {
            if (_new.new_id == new_id) return _new
        })
    }
    if (current_new) page_title = current_new.new_title

    res.status(200).render("new", {
        title: `${page_title} / Кот-Полиглот`,
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            CurrentNew: current_new,
        },
    })
}