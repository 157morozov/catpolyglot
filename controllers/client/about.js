exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "About", "Addresses"])
    res.status(200).render("about", {
        title: "О нас / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        About: data.About,
        Addresses: data.Addresses.sort((a, b) => a.address_title.charAt(0).localeCompare(b.address_title.charAt(0))),
    })
}
