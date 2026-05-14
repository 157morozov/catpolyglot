exports.default = async (req, res) => {
    const [data] = await req.database.promise().selectTablesSnapshot(["Contacts", "GlobalLinks", "Miscs", "Addresses"])
    res.status(200).render("addresses", {
        title: "Адреса филиалов / Кот-Полиглот",
        Contacts: data.Contacts,
        GlobalLinks: data.GlobalLinks,
        Miscs: data.Miscs,
        Addresses: data.Addresses.sort((a, b) => a.address_title.charAt(0).localeCompare(b.address_title.charAt(0))),
    })
}
