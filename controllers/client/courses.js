exports.default = async (req, res) => {
    const cache = req.cache

    res.status(200).render("courses", {
        title: "Обучающие программы и курсы / Кот-Полиглот",
        cache: {
            // Necessarily data transfer
            Contacts: cache.Contacts,
            GlobalLinks: cache.GlobalLinks,
            Miscs: cache.Miscs,
            // Additionally data transfer
            Benifits: cache.Benifits,
            Courses: cache.Courses,
        },
    })
}