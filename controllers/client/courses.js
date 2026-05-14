exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "Benifits", "Courses"])
    res.status(200).render("courses", {
        title: "Обучающие программы и курсы / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        Benifits: data.Benifits,
        Courses: data.Courses,
    })
}
